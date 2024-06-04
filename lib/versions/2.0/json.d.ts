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
                    enum: readonly ["CPT", "HCPCS", "ICD", "DRG", "MS-DRG", "R-DRG", "S-DRG", "APS-DRG", "AP-DRG", "APR-DRG", "APC", "NDC", "HIPPS", "LOCAL", "EAPG", "CDT", "RC", "CDM", "TRIS-DRG"];
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
                minimum: {
                    type: string;
                    exclusiveMinimum: number;
                };
                maximum: {
                    type: string;
                    exclusiveMinimum: number;
                };
                gross_charge: {
                    type: string;
                    exclusiveMinimum: number;
                };
                discounted_cash: {
                    type: string;
                    exclusiveMinimum: number;
                };
                setting: {
                    enum: readonly ["inpatient", "outpatient", "both"];
                    type: string;
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
                    minLength: number;
                };
                additional_payer_notes: {
                    type: string;
                };
                standard_charge_dollar: {
                    type: string;
                    exclusiveMinimum: number;
                };
                standard_charge_algorithm: {
                    type: string;
                };
                standard_charge_percentage: {
                    type: string;
                    exclusiveMinimum: number;
                };
                estimated_amount: {
                    type: string;
                    exclusiveMinimum: number;
                };
                methodology: {
                    enum: readonly ["case rate", "fee schedule", "percent of total billed charges", "per diem", "other"];
                    type: string;
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
                enum: readonly ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"];
                type: string;
            };
        };
        required: string[];
    };
    affirmation: {
        type: string;
        properties: {
            affirmation: {
                const: string;
            };
            confirm_affirmation: {
                type: string;
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
        minLength: number;
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
        minLength: number;
    };
    hospital_address: {
        type: string;
        items: {
            type: string;
        };
        minItems: number;
    };
    hospital_location: {
        type: string;
        items: {
            type: string;
        };
        minItems: number;
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
                    enum: readonly ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"];
                    type: string;
                };
            };
            required: string[];
        };
        affirmation: {
            type: string;
            properties: {
                affirmation: {
                    const: string;
                };
                confirm_affirmation: {
                    type: string;
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
            minLength: number;
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
            minLength: number;
        };
        hospital_address: {
            type: string;
            items: {
                type: string;
            };
            minItems: number;
        };
        hospital_location: {
            type: string;
            items: {
                type: string;
            };
            minItems: number;
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
                    enum: readonly ["CPT", "HCPCS", "ICD", "DRG", "MS-DRG", "R-DRG", "S-DRG", "APS-DRG", "AP-DRG", "APR-DRG", "APC", "NDC", "HIPPS", "LOCAL", "EAPG", "CDT", "RC", "CDM", "TRIS-DRG"];
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
                minimum: {
                    type: string;
                    exclusiveMinimum: number;
                };
                maximum: {
                    type: string;
                    exclusiveMinimum: number;
                };
                gross_charge: {
                    type: string;
                    exclusiveMinimum: number;
                };
                discounted_cash: {
                    type: string;
                    exclusiveMinimum: number;
                };
                setting: {
                    enum: readonly ["inpatient", "outpatient", "both"];
                    type: string;
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
                    minLength: number;
                };
                additional_payer_notes: {
                    type: string;
                };
                standard_charge_dollar: {
                    type: string;
                    exclusiveMinimum: number;
                };
                standard_charge_algorithm: {
                    type: string;
                };
                standard_charge_percentage: {
                    type: string;
                    exclusiveMinimum: number;
                };
                estimated_amount: {
                    type: string;
                    exclusiveMinimum: number;
                };
                methodology: {
                    enum: readonly ["case rate", "fee schedule", "percent of total billed charges", "per diem", "other"];
                    type: string;
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
                    enum: readonly ["AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"];
                    type: string;
                };
            };
            required: string[];
        };
        affirmation: {
            type: string;
            properties: {
                affirmation: {
                    const: string;
                };
                confirm_affirmation: {
                    type: string;
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
            minLength: number;
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
            minLength: number;
        };
        hospital_address: {
            type: string;
            items: {
                type: string;
            };
            minItems: number;
        };
        hospital_location: {
            type: string;
            items: {
                type: string;
            };
            minItems: number;
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
export declare function validateJson(jsonInput: File | NodeJS.ReadableStream, options?: JsonValidatorOptions, outputFilePath?: string): Promise<ValidationResult>;
export declare const JsonValidatorTwoZero: {
    validateJson: typeof validateJson;
};
