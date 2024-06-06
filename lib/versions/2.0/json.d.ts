/// <reference types="node" />
import { JsonValidatorOptions, ValidationResult } from "../../types.js";
export declare const STANDARD_CHARGE_SCHEMA: {
    type: string;
    properties: {
        description: {
            type: string;
            minLength: number;
        };
        drug_information: {
            $ref: string;
        };
        code_information: {
            type: string;
            items: {
                $ref: string;
            };
            minItems: number;
            default: string;
        };
        standard_charges: {
            type: string;
            items: {
                $ref: string;
            };
            minItems: number;
        };
    };
    required: string[];
    if: {
        type: string;
        properties: {
            code_information: {
                type: string;
                contains: {
                    type: string;
                    properties: {
                        type: {
                            const: string;
                        };
                    };
                };
            };
        };
    };
    then: {
        required: string[];
    };
    $schema: string;
    definitions: {
        code_information: {
            type: string;
            properties: {
                code: {
                    type: string;
                    minLength: number;
                };
                type: {
                    type: string;
                };
            };
            required: string[];
        };
        drug_information: {
            type: string;
            properties: {
                unit: {
                    type: string;
                    minLength: number;
                };
                type: {
                    enum: string[];
                    type: string;
                };
            };
            required: string[];
        };
        standard_charges: {
            type: string;
            properties: {
                setting: {
                    type: string;
                    nullable: boolean;
                };
                payers_information: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                    minItems: number;
                };
                billing_class: {
                    enum: readonly ["professional", "facility", "both"];
                    type: string;
                };
                additional_generic_notes: {
                    type: string;
                };
            };
            required: string[];
            anyOf: ({
                type: string;
                required: string[];
                properties?: undefined;
            } | {
                type: string;
                properties: {
                    payers_information: {
                        type: string;
                        items: {
                            anyOf: {
                                type: string;
                                required: string[];
                            }[];
                        };
                    };
                };
                required: string[];
            })[];
            if: {
                type: string;
                properties: {
                    payers_information: {
                        type: string;
                        contains: {
                            type: string;
                            required: string[];
                        };
                    };
                };
                required: string[];
            };
            then: {
                required: string[];
            };
        };
        standard_charge_information: {
            type: string;
            properties: {
                description: {
                    type: string;
                    minLength: number;
                };
                drug_information: {
                    $ref: string;
                };
                code_information: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                    minItems: number;
                };
                standard_charges: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                    minItems: number;
                };
            };
            required: string[];
            if: {
                type: string;
                properties: {
                    code_information: {
                        type: string;
                        contains: {
                            type: string;
                            properties: {
                                type: {
                                    const: string;
                                };
                            };
                        };
                    };
                };
            };
            then: {
                required: string[];
            };
        };
        payers_information: {
            type: string;
            properties: {
                payer_name: {
                    type: string;
                    minLength: number;
                };
                plan_name: {
                    type: string;
                    nullable: boolean;
                };
                additional_payer_notes: {
                    type: string;
                };
                standard_charge_algorithm: {
                    type: string;
                };
                methodology: {
                    type: string;
                    nullable: boolean;
                };
            };
            required: string[];
            allOf: ({
                if: {
                    properties: {
                        methodology: {
                            const: string;
                        };
                    };
                    required: string[];
                    anyOf?: undefined;
                    not?: undefined;
                };
                then: {
                    properties: {
                        additional_payer_notes: {
                            type: string;
                            minLength: number;
                        };
                    };
                    required: string[];
                };
            } | {
                if: {
                    anyOf: {
                        required: string[];
                    }[];
                    not: {
                        required: string[];
                    };
                    properties?: undefined;
                    required?: undefined;
                };
                then: {
                    required: string[];
                    properties?: undefined;
                };
            })[];
        };
    };
};
export declare const METADATA_DEFINITIONS: {
    license_information: {
        type: string;
        properties: {
            license_number: {
                type: string;
            };
            state: {
                type: string;
                nullable: boolean;
            };
        };
    };
    affirmation: {
        type: string;
        properties: {
            affirmation: {
                const: string;
            };
            confirm_affirmation: {
                type: string[];
                nullable: boolean;
            };
        };
        required: string[];
    };
    modifier_information: {
        type: string;
        properties: {
            description: {
                type: string;
                minLength: number;
            };
            code: {
                type: string;
                minLength: number;
            };
            modifier_payer_information: {
                type: string;
                items: {
                    $ref: string;
                };
                minItems: number;
            };
        };
        required: string[];
    };
    modifier_payer_information: {
        type: string;
        properties: {
            payer_name: {
                type: string;
                minLength: number;
            };
            plan_name: {
                type: string;
                minLength: number;
            };
            description: {
                type: string;
                minLength: number;
            };
            setting: {
                enum: readonly ["inpatient", "outpatient", "both"];
                type: string;
            };
        };
        required: string[];
    };
};
export declare const METADATA_PROPERTIES: {
    hospital_name: {
        type: string;
        nullable: boolean;
    };
    last_updated_on: {
        type: string;
        format: string;
    };
    license_information: {
        $ref: string;
    };
    version: {
        type: string;
        nullable: boolean;
    };
    hospital_address: {
        type: string;
        items: {
            type: string;
            nullable: boolean;
        };
        nullable: boolean;
    };
    hospital_location: {
        type: string;
        items: {
            type: string;
            nullable: boolean;
        };
        minItems: number;
        nullable: boolean;
    };
    affirmation: {
        $ref: string;
    };
    modifier_information: {
        type: string;
        items: {
            $ref: string;
        };
    };
};
export declare const METADATA_REQUIRED: string[];
export declare const METADATA_SCHEMA: {
    $schema: string;
    definitions: {
        license_information: {
            type: string;
            properties: {
                license_number: {
                    type: string;
                };
                state: {
                    type: string;
                    nullable: boolean;
                };
            };
        };
        affirmation: {
            type: string;
            properties: {
                affirmation: {
                    const: string;
                };
                confirm_affirmation: {
                    type: string[];
                    nullable: boolean;
                };
            };
            required: string[];
        };
        modifier_information: {
            type: string;
            properties: {
                description: {
                    type: string;
                    minLength: number;
                };
                code: {
                    type: string;
                    minLength: number;
                };
                modifier_payer_information: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                    minItems: number;
                };
            };
            required: string[];
        };
        modifier_payer_information: {
            type: string;
            properties: {
                payer_name: {
                    type: string;
                    minLength: number;
                };
                plan_name: {
                    type: string;
                    minLength: number;
                };
                description: {
                    type: string;
                    minLength: number;
                };
                setting: {
                    enum: readonly ["inpatient", "outpatient", "both"];
                    type: string;
                };
            };
            required: string[];
        };
    };
    type: string;
    properties: {
        hospital_name: {
            type: string;
            nullable: boolean;
        };
        last_updated_on: {
            type: string;
            format: string;
        };
        license_information: {
            $ref: string;
        };
        version: {
            type: string;
            nullable: boolean;
        };
        hospital_address: {
            type: string;
            items: {
                type: string;
                nullable: boolean;
            };
            nullable: boolean;
        };
        hospital_location: {
            type: string;
            items: {
                type: string;
                nullable: boolean;
            };
            minItems: number;
            nullable: boolean;
        };
        affirmation: {
            $ref: string;
        };
        modifier_information: {
            type: string;
            items: {
                $ref: string;
            };
        };
    };
    required: string[];
};
export declare const JSON_SCHEMA: {
    $schema: string;
    definitions: {
        standard_charge_information: {
            type: string;
            properties: {
                description: {
                    type: string;
                    minLength: number;
                };
                drug_information: {
                    $ref: string;
                };
                code_information: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                    minItems: number;
                    default: string;
                };
                standard_charges: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                    minItems: number;
                };
            };
            required: string[];
            if: {
                type: string;
                properties: {
                    code_information: {
                        type: string;
                        contains: {
                            type: string;
                            properties: {
                                type: {
                                    const: string;
                                };
                            };
                        };
                    };
                };
            };
            then: {
                required: string[];
            };
        };
        code_information: {
            type: string;
            properties: {
                code: {
                    type: string;
                    minLength: number;
                };
                type: {
                    type: string;
                };
            };
            required: string[];
        };
        drug_information: {
            type: string;
            properties: {
                unit: {
                    type: string;
                    minLength: number;
                };
                type: {
                    enum: string[];
                    type: string;
                };
            };
            required: string[];
        };
        standard_charges: {
            type: string;
            properties: {
                setting: {
                    type: string;
                    nullable: boolean;
                };
                payers_information: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                    minItems: number;
                };
                billing_class: {
                    enum: readonly ["professional", "facility", "both"];
                    type: string;
                };
                additional_generic_notes: {
                    type: string;
                };
            };
            required: string[];
            anyOf: ({
                type: string;
                required: string[];
                properties?: undefined;
            } | {
                type: string;
                properties: {
                    payers_information: {
                        type: string;
                        items: {
                            anyOf: {
                                type: string;
                                required: string[];
                            }[];
                        };
                    };
                };
                required: string[];
            })[];
            if: {
                type: string;
                properties: {
                    payers_information: {
                        type: string;
                        contains: {
                            type: string;
                            required: string[];
                        };
                    };
                };
                required: string[];
            };
            then: {
                required: string[];
            };
        };
        payers_information: {
            type: string;
            properties: {
                payer_name: {
                    type: string;
                    minLength: number;
                };
                plan_name: {
                    type: string;
                    nullable: boolean;
                };
                additional_payer_notes: {
                    type: string;
                };
                standard_charge_algorithm: {
                    type: string;
                };
                methodology: {
                    type: string;
                    nullable: boolean;
                };
            };
            required: string[];
            allOf: ({
                if: {
                    properties: {
                        methodology: {
                            const: string;
                        };
                    };
                    required: string[];
                    anyOf?: undefined;
                    not?: undefined;
                };
                then: {
                    properties: {
                        additional_payer_notes: {
                            type: string;
                            minLength: number;
                        };
                    };
                    required: string[];
                };
            } | {
                if: {
                    anyOf: {
                        required: string[];
                    }[];
                    not: {
                        required: string[];
                    };
                    properties?: undefined;
                    required?: undefined;
                };
                then: {
                    required: string[];
                    properties?: undefined;
                };
            })[];
        };
        license_information: {
            type: string;
            properties: {
                license_number: {
                    type: string;
                };
                state: {
                    type: string;
                    nullable: boolean;
                };
            };
        };
        affirmation: {
            type: string;
            properties: {
                affirmation: {
                    const: string;
                };
                confirm_affirmation: {
                    type: string[];
                    nullable: boolean;
                };
            };
            required: string[];
        };
        modifier_information: {
            type: string;
            properties: {
                description: {
                    type: string;
                    minLength: number;
                };
                code: {
                    type: string;
                    minLength: number;
                };
                modifier_payer_information: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                    minItems: number;
                };
            };
            required: string[];
        };
        modifier_payer_information: {
            type: string;
            properties: {
                payer_name: {
                    type: string;
                    minLength: number;
                };
                plan_name: {
                    type: string;
                    minLength: number;
                };
                description: {
                    type: string;
                    minLength: number;
                };
                setting: {
                    enum: readonly ["inpatient", "outpatient", "both"];
                    type: string;
                };
            };
            required: string[];
        };
    };
    type: string;
    properties: {
        standard_charge_information: {
            type: string;
            items: {
                $ref: string;
            };
            minItems: number;
        };
        hospital_name: {
            type: string;
            nullable: boolean;
        };
        last_updated_on: {
            type: string;
            format: string;
        };
        license_information: {
            $ref: string;
        };
        version: {
            type: string;
            nullable: boolean;
        };
        hospital_address: {
            type: string;
            items: {
                type: string;
                nullable: boolean;
            };
            nullable: boolean;
        };
        hospital_location: {
            type: string;
            items: {
                type: string;
                nullable: boolean;
            };
            minItems: number;
            nullable: boolean;
        };
        affirmation: {
            $ref: string;
        };
        modifier_information: {
            type: string;
            items: {
                $ref: string;
            };
        };
    };
    required: string[];
};
export type ModeTypes = "FinalizeJson" | "AggregateErrors" | "Default" | "FindIncorrectKeys";
export declare function validateJson(jsonInput: File | NodeJS.ReadableStream, options?: JsonValidatorOptions, mode?: ModeTypes, outputFilePath?: string, clarifyInfo?: any): Promise<ValidationResult>;
export declare const JsonValidatorTwoZero: {
    validateJson: typeof validateJson;
};
