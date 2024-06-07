/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Ajv, { ErrorObject } from "ajv"
import addFormats from "ajv-formats"
import { JSONParser } from "@streamparser/json"
import { Writable } from "stream"

import {
  JsonValidatorOptions,
  STATE_CODES,
  ValidationError,
  ValidationResult,
} from "../../types.js"
import {
  BILLING_CODE_TYPES,
  CHARGE_BILLING_CLASSES,
  CHARGE_SETTINGS,
  DRUG_UNITS,
  STANDARD_CHARGE_METHODOLOGY,
} from "./types.js"
import { errorObjectToValidationError, parseJson } from "../common/json.js"
import { addErrorsToList, filterAndAggregateErrors } from "../../utils.js"
import fs from "fs"
import set from "lodash/set.js"

const correctJsonKeys = [
  "hospital_name",
  "update_date",
  "version",
  "hospital_location",
  "hospital_address",
  "license_information",
  "license_number",
  "state",
  "license_information.license_number",
  "license_information.state",
  "affirmation",
  "affirmation.affirmation",
  "affirmation.confirm_affirmation",
  "standard_charge_information",
  "description",
  "code_information",
  "drug_information",
  "standard_charges",
  "code",
  "type",
  "minimum",
  "maximum",
  "setting",
  "payers_information",
  "payer_name",
  "plan_name",
  "standard_charge_dollar",
  "standard_charge_algorithm",
  "standard_charge_percentage",
  "estimated_amount",
  "methodology",
  "gross_charge",
  "discounted_cash",
  "additional_generic_notes",
  "last_updated_on",
  "billing_class",
  "unit",
  "confirm_affirmation",
]

const STANDARD_CHARGE_DEFINITIONS = {
  code_information: {
    type: "object",
    properties: {
      code: { type: "string", minLength: 0 },
      type: {
        type: "string",
      },
    },
    required: ["code", "type"],
  },
  drug_information: {
    type: "object",
    properties: {
      unit: { type: "string", minLength: 1 },
      type: { enum: DRUG_UNITS, type: "string" },
    },
    required: ["unit", "type"],
  },

  standard_charges: {
    type: "object",
    properties: {
      setting: {
        type: "string",
        nullable: true,
      },
      payers_information: {
        type: "array",
        items: { $ref: "#/definitions/payers_information" },
        minItems: 1,
      },
      billing_class: {
        enum: CHARGE_BILLING_CLASSES,
        type: "string",
      },
      additional_generic_notes: { type: "string" },
    },
    required: ["setting"],
    anyOf: [
      { type: "object", required: ["gross_charge"] },
      { type: "object", required: ["discounted_cash"] },
      {
        type: "object",
        properties: {
          payers_information: {
            type: "array",
            items: {
              anyOf: [
                { type: "object", required: ["standard_charge_dollar"] },
                { type: "object", required: ["standard_charge_algorithm"] },
                { type: "object", required: ["standard_charge_percentage"] },
              ],
            },
          },
        },
        required: ["payers_information"],
      },
    ],
    if: {
      type: "object",
      properties: {
        payers_information: {
          type: "array",
          contains: {
            type: "object",
            required: ["standard_charge_dollar"],
          },
        },
      },
      required: ["payers_information"],
    },
    then: {
      required: ["minimum", "maximum"],
    },
  },
  standard_charge_information: {
    type: "object",
    properties: {
      description: { type: "string", minLength: 1 },
      drug_information: { $ref: "#/definitions/drug_information" },
      code_information: {
        type: "array",
        items: { $ref: "#/definitions/code_information" },
        minItems: 1,
      },
      standard_charges: {
        type: "array",
        items: { $ref: "#/definitions/standard_charges" },
        minItems: 1,
      },
    },
    required: ["description", "code_information", "standard_charges"],
    if: {
      type: "object",
      properties: {
        code_information: {
          type: "array",
          contains: {
            type: "object",
            properties: {
              type: {
                const: "NDC",
              },
            },
          },
        },
      },
    },
    then: {
      required: ["drug_information"],
    },
  },
  payers_information: {
    type: "object",
    properties: {
      payer_name: { type: "string", minLength: 1 },
      plan_name: { type: "string", nullable: true },
      additional_payer_notes: { type: "string" },
      standard_charge_algorithm: { type: "string" },
      methodology: {
        type: "string",
        nullable: true,
      },
    },
    required: ["payer_name", "plan_name", "methodology"],
    allOf: [
      {
        if: {
          properties: {
            methodology: {
              const: "other",
            },
          },
          required: ["methodology"],
        },
        then: {
          properties: {
            additional_payer_notes: { type: "string", minLength: 1 },
          },
          required: ["additional_payer_notes"],
        },
      },
      {
        if: {
          anyOf: [
            { required: ["standard_charge_percentage"] },
            { required: ["standard_charge_algorithm"] },
          ],
          not: {
            required: ["standard_charge_dollar"],
          },
        },
        then: {
          required: ["estimated_amount"], // Required beginning 1/1/2025
        },
      },
    ],
  },
}

const STANDARD_CHARGE_PROPERTIES = {
  type: "object",
  properties: {
    description: { type: "string", minLength: 1 },
    drug_information: { $ref: "#/definitions/drug_information" },
    code_information: {
      type: "array",
      items: { $ref: "#/definitions/code_information" },
      minItems: 1,
      default: "null",
    },
    standard_charges: {
      type: "array",
      items: { $ref: "#/definitions/standard_charges" },
      minItems: 1,
    },
  },
  required: ["description", "code_information", "standard_charges"],

  if: {
    type: "object",
    properties: {
      code_information: {
        type: "array",
        contains: {
          type: "object",
          properties: {
            type: {
              const: "NDC",
            },
          },
        },
      },
    },
  },
  then: {
    required: ["drug_information"],
  },
}

export const STANDARD_CHARGE_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: STANDARD_CHARGE_DEFINITIONS,
  ...STANDARD_CHARGE_PROPERTIES,
}

export const METADATA_DEFINITIONS = {
  license_information: {
    type: "object",
    properties: {
      license_number: { type: "string" },
      state: {
        type: "string",
        nullable: true,
      },
    },
  },
  affirmation: {
    type: "object",
    properties: {
      affirmation: {
        const:
          "To the best of its knowledge and belief, the hospital has included all applicable standard charge information in accordance with the requirements of 45 CFR 180.50, and the information encoded is true, accurate, and complete as of the date indicated.",
      },
      confirm_affirmation: {
        type: ["string", "boolean"],
        nullable: true,
      },
    },
    required: ["affirmation"],
  },
  modifier_information: {
    type: "object",
    properties: {
      description: {
        type: "string",
        minLength: 1,
      },
      code: {
        type: "string",
        minLength: 1,
      },
      modifier_payer_information: {
        type: "array",
        items: {
          $ref: "#/definitions/modifier_payer_information",
        },
        minItems: 1,
      },
    },
    required: ["description", "modifier_payer_information", "code"],
  },
  modifier_payer_information: {
    type: "object",
    properties: {
      payer_name: {
        type: "string",
        minLength: 1,
      },
      plan_name: {
        type: "string",
        minLength: 1,
      },
      description: {
        type: "string",
        minLength: 1,
      },
      setting: {
        enum: CHARGE_SETTINGS,
        type: "string",
      },
    },
    required: ["payer_name", "plan_name", "description"],
  },
}

export const METADATA_PROPERTIES = {
  hospital_name: { type: "string", nullable: true },
  last_updated_on: { type: "string", format: "date" },
  license_information: {
    $ref: "#/definitions/license_information",
  },
  version: { type: "string", nullable: true },
  hospital_address: {
    type: "array",
    items: { type: "string", nullable: true },
    nullable: true,
  },
  hospital_location: {
    type: "array",
    items: {
      type: "string",
      nullable: true,
    },
    minItems: 0,
    nullable: true,
  },
  affirmation: {
    $ref: "#/definitions/affirmation",
  },
  modifier_information: {
    type: "array",
    items: {
      $ref: "#/definitions/modifier_information",
    },
  },
}

export const METADATA_REQUIRED = [
  "hospital_name",
  "last_updated_on",
  "hospital_location",
  "hospital_address",
  "license_information",
  "version",
  "affirmation",
]

export const METADATA_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: METADATA_DEFINITIONS,
  type: "object",
  properties: METADATA_PROPERTIES,
  required: METADATA_REQUIRED,
}

export const JSON_SCHEMA = {
  $schema: "http://json-schema.org/draft-07/schema#",
  definitions: {
    ...METADATA_DEFINITIONS,
    ...STANDARD_CHARGE_DEFINITIONS,
    standard_charge_information: STANDARD_CHARGE_PROPERTIES,
  },
  type: "object",
  properties: {
    ...METADATA_PROPERTIES,
    standard_charge_information: {
      type: "array",
      items: { $ref: "#/definitions/standard_charge_information" },
      minItems: 1,
    },
  },
  required: [...METADATA_REQUIRED, "standard_charge_information"],
}

export type ModeTypes =
  | "FinalizeJson"
  | "AggregateErrors"
  | "Default"
  | "FindIncorrectKeys"

const transformPath = (path: string): string => {
  const segments = path.split("/").filter(Boolean)
  return segments
    .map((segment) => (isNaN(Number(segment)) ? segment : `[${segment}]`))
    .join(".")
}

export async function validateJson(
  jsonInput: File | NodeJS.ReadableStream,
  options: JsonValidatorOptions = {},
  mode?: ModeTypes,
  outputFilePath?: string,
  clarifyInfo?: any
): Promise<ValidationResult> {
  const validator = new Ajv({
    allErrors: true,
    allowUnionTypes: true,
  })
  addFormats(validator)
  const parser = new JSONParser({
    paths: ["$.*", "$.standard_charge_information.*"],
    keepStack: false,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const metadata: { [key: string]: any } = {}
  let valid = true
  let hasCharges = false
  const errors: ValidationError[] = []
  const enforce2025 = new Date().getFullYear() >= 2025
  const counts = {
    errors: 0,
    warnings: 0,
  }

  let writeStream: any
  const extraKeys: any[] = []

  if (mode === "FinalizeJson" && outputFilePath) {
    writeStream = fs.createWriteStream(`${outputFilePath}`, {
      encoding: "utf8",
    })
  }

  return new Promise(async (resolve) => {
    if (mode === "FinalizeJson" && outputFilePath) {
      writeStream.write("{" + "\n")
      writeStream.write(`"clarify_info":${JSON.stringify(clarifyInfo)}, \n`)
    }

    parser.onValue = ({ value, key, stack }) => {
      if (typeof key === "string" && stack.length < 2 && isNaN(Number(key))) {
        metadata[key] = value
        if (
          mode === "FindIncorrectKeys" &&
          typeof key === "string" &&
          !correctJsonKeys.includes(key) &&
          !extraKeys.some((e) => e.incorrect_attribute_name === key)
        ) {
          extraKeys.push({ incorrect_attribute_name: key, sample_path: key })
        }
        if (mode === "FinalizeJson" && outputFilePath) {
          writeStream.write(`${JSON.stringify(key)}:`)
          if (typeof value === "object" && !Array.isArray(value) && value) {
            writeStream.write("{" + "\n") // Start object
            const keys = Object.keys(value as any)
            for (let i = 0; i < keys.length; i++) {
              const nestedKey = keys[i]
              const nestedValue = (value as any)[nestedKey]
              writeStream.write(
                `${JSON.stringify(nestedKey)}:${JSON.stringify(nestedValue)}`
              )
              if (i < keys.length - 1) {
                writeStream.write(",")
              }
              writeStream.write("\n")
            }
            writeStream.write("}" + "," + "\n") // End object
          } else if (Array.isArray(value)) {
            writeStream.write("[" + "\n") // Start array
            for (let i = 0; i < value.length; i++) {
              writeStream.write(JSON.stringify(value[i]))
              if (i < value.length - 1) {
                writeStream.write(",")
              }
              writeStream.write("\n")
            }
            writeStream.write("]" + "," + "\n") // End array
          } else {
            // For other types (string, number, boolean), just stringify
            writeStream.write(`${JSON.stringify(value)} , \n`)
          }
        }
      } else if (
        (key as any) === "standard_charge_information" ||
        stack.length > 2
      ) {
        if (mode === "FinalizeJson" && outputFilePath) {
          return writeStream.write(`"standard_charge_information: [ `)
        } else {
          return
        }
      } else {
        hasCharges = true
        if (
          mode === "FindIncorrectKeys" &&
          value &&
          value !== undefined &&
          typeof value === "object"
        ) {
          const findIncorrectKeys = (
            obj: any,
            path: string = "/standard_charge_information"
          ) => {
            Object.entries(obj)?.forEach(([key, value]) => {
              const currentPath = `${path}/${key}`

              if (
                !correctJsonKeys.includes(key) &&
                !extraKeys.some((e) => e.incorrect_attribute_name === key)
              ) {
                extraKeys.push({
                  incorrect_attribute_name: key,
                  sample_path: currentPath,
                })
              }

              if (value && typeof value === "object") {
                if (Array.isArray(value)) {
                  value.forEach((item, index) => {
                    if (item && typeof item === "object") {
                      findIncorrectKeys(item, `${currentPath}/${index}`)
                    }
                  })
                } else {
                  findIncorrectKeys(value, currentPath)
                }
              }
            })
          }

          findIncorrectKeys(value)
        }

        if (!validator.validate(STANDARD_CHARGE_SCHEMA, value)) {
          const validationErrors = (validator.errors as ErrorObject[])
            .map(
              enforce2025
                ? errorObjectToValidationError
                : errorObjectToValidationErrorWithWarnings
            )
            .map((error) => {
              const pathPrefix = stack
                .filter((se: { key: any }) => se.key)
                .map((se: { key: any }) => se.key)
                .join("/")

              if (
                error.message.match(/must have required property '(.*?)'/) &&
                (error as any).message.match(
                  /must have required property '(.*?)'/
                ).length > 0
              ) {
                const property = (error as any).message.match(
                  /must have required property '(.*?)'/
                )[1]
                const path = `${error.path}/${property}`
                const transformedPath = transformPath(path)
                set(value as any, `${transformedPath}`, null)
              }
              const path = `/${pathPrefix}/${key}${error.path}`

              return {
                ...error,
                path,
              }
            })
          addErrorsToList(validationErrors, errors, options.maxErrors, counts)
          valid = counts.errors === 0
        }
        if (options.onValueCallback) {
          options.onValueCallback(value)
        }
        if (
          options.maxErrors &&
          options.maxErrors > 0 &&
          counts.errors >= options.maxErrors
        ) {
          if (mode === "FinalizeJson" && outputFilePath) {
            writeStream.end()
          }
          resolve({
            valid: false,
            errors: errors,
          })
          parser.end()
        }

        // Write the modified value to the output JSON
      }
    }

    parser.onEnd = () => {
      if (
        !validator.validate(
          hasCharges ? METADATA_SCHEMA : JSON_SCHEMA,
          metadata
        )
      ) {
        const validationErrors = (validator.errors as ErrorObject[]).map(
          enforce2025
            ? errorObjectToValidationError
            : errorObjectToValidationErrorWithWarnings
        )
        const validErrors = validationErrors.filter(
          (err) =>
            err.message.match(/must have required property '(.*?)'/) &&
            !err.path &&
            (err as any)?.message.match(/must have required property '(.*?)'/)
              .length > 0
        )

        validErrors.forEach((error, index) => {
          const propertyMatch = error.message.match(
            /must have required property '(.*?)'/
          )
          if (propertyMatch && propertyMatch.length > 0 && !error.path) {
            const property = propertyMatch[1]

            if (mode === "FinalizeJson" && outputFilePath) {
              writeStream.write(`${JSON.stringify(property)}:${null}`)
              if (index < validErrors.length - 1) {
                writeStream.write(", " + "\n")
              }
            }
          }
        })

        addErrorsToList(validationErrors, errors, options.maxErrors, counts)
        valid = counts.errors === 0
      }
      if (mode === "FinalizeJson" && outputFilePath) {
        writeStream.write("\n" + "}" + "\n")
      }

      if (mode === "FinalizeJson" && outputFilePath) {
        writeStream.end()
      }
      if (mode === "AggregateErrors") {
        const aggregatedErrors = filterAndAggregateErrors(errors)
        resolve({
          valid,
          errors: aggregatedErrors || ([] as any),
        })
      } else if (mode === "FindIncorrectKeys") {
        resolve({
          valid,
          errors: extraKeys,
        })
      } else {
        resolve({
          valid,
          errors,
        })
      }
    }

    parser.onError = (e: { message: any }) => {
      parser.onEnd = () => null
      parser.onError = () => null
      if (mode === "FinalizeJson" && outputFilePath) {
        writeStream.end()
      }
      parser.end()
      resolve({
        valid: false,
        errors: [
          {
            path: "",
            message: `JSON parsing error: ${e.message}.${JSON.stringify(
              e
            )}. The validator is unable to review a syntactically invalid JSON file. Please ensure that your file is well-formatted JSON.`,
          },
        ],
      })
    }

    parseJson(jsonInput, parser)
  })
}

export const JsonValidatorTwoZero = {
  validateJson,
}

function errorObjectToValidationErrorWithWarnings(
  error: ErrorObject,
  index: number,
  errors: ErrorObject[]
): ValidationError {
  const validationError = errorObjectToValidationError(error)
  // If a "payer specific negotiated charge" can only be expressed as a percentage or algorithm,
  // then a corresponding "Estimated Allowed Amount" must also be encoded. Required beginning 1/1/2025.
  // two validation errors occur for this conditional: one for the "required" keyword, one for the "if" keyword
  if (
    error.schemaPath ===
    "#/definitions/payers_information/allOf/1/then/required"
  ) {
    validationError.warning = true
  } else if (
    error.schemaPath === "#/definitions/payers_information/allOf/1/if" &&
    index > 0 &&
    errors[index - 1].schemaPath ===
      "#/definitions/payers_information/allOf/1/then/required"
  ) {
    validationError.warning = true
  }
  // If code type is NDC, then the corresponding drug unit of measure and drug type ofLength measure data elements
  // must be encoded. Required beginning 1/1/2025.
  // two validation errors occur for this conditional: one for the "required" keyword, one for the "if" keyword
  else if (
    error.schemaPath === "#/then/required" &&
    error.params.missingProperty === "drug_information"
  ) {
    validationError.warning = true
  } else if (
    error.schemaPath === "#/if" &&
    index > 0 &&
    errors[index - 1].schemaPath === "#/then/required" &&
    errors[index - 1].params.missingProperty === "drug_information"
  ) {
    validationError.warning = true
  }
  // Any error involving the properties that are new for 2025 are warnings.
  // These properties are: drug_information, modifier_information, estimated_amount
  else if (
    error.instancePath.includes("/drug_information") ||
    error.instancePath.includes("/modifier_information") ||
    error.instancePath.includes("/estimated_amount")
  ) {
    validationError.warning = true
  }
  return validationError
}
