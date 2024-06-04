/// <reference types="node" />
import { JsonValidatorOptions, ValidationResult } from "../../types.js";
export declare const STANDARD_CHARGE_SCHEMA: {
    type: string;
    properties: {
        description: {
            type: string;
        };
        drug_information: {
            $ref: string;
        };
        billing_code_information: {
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
    $schema: string;
    definitions: {
        billing_code_information: {
            type: string;
            properties: {
                code: {
                    type: string;
                };
                type: {
                    enum: readonly ["CPT", "HCPCS", "ICD", "MS-DRG", "R-DRG", "S-DRG", "APS-DRG", "AP-DRG", "APR-DRG", "APC", "NDC", "HIPPS", "LOCAL", "EAPG", "CDT", "RC", "CDM"];
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
                modifiers: {
                    type: string;
                    items: {
                        type: string;
                    };
                    uniqueItems: boolean;
                };
                payers_information: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                    minItems: number;
                };
                billing_class: {
                    enum: readonly ["professional", "facility"];
                    type: string;
                };
                additional_generic_notes: {
                    type: string;
                };
            };
            required: string[];
        };
        standard_charge_information: {
            type: string;
            properties: {
                description: {
                    type: string;
                };
                drug_information: {
                    $ref: string;
                };
                billing_code_information: {
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
        };
        payers_information: {
            type: string;
            properties: {
                payer_name: {
                    type: string;
                };
                plan_name: {
                    type: string;
                };
                additional_payer_notes: {
                    type: string;
                };
                standard_charge: {
                    type: string;
                    exclusiveMinimum: number;
                };
                standard_charge_percent: {
                    type: string;
                    exclusiveMinimum: number;
                };
                contracting_method: {
                    enum: readonly ["case rate", "fee schedule", "percent of total billed charges", "per diem", "other"];
                    type: string;
                };
            };
            required: string[];
            if: {
                properties: {
                    contracting_method: {
                        const: string;
                    };
                };
            };
            then: {
                required: string[];
            };
            else: {
                required: string[];
            };
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
};
export declare const METADATA_PROPERTIES: {
    hospital_name: {
        type: string;
    };
    last_updated_on: {
        type: string;
        format: string;
    };
    license_information: {
        type: string;
        items: {
            $ref: string;
        };
        minItems: number;
    };
    version: {
        type: string;
    };
    hospital_location: {
        type: string;
    };
    financial_aid_policy: {
        type: string;
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
    };
    type: string;
    properties: {
        hospital_name: {
            type: string;
        };
        last_updated_on: {
            type: string;
            format: string;
        };
        license_information: {
            type: string;
            items: {
                $ref: string;
            };
            minItems: number;
        };
        version: {
            type: string;
        };
        hospital_location: {
            type: string;
        };
        financial_aid_policy: {
            type: string;
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
                };
                drug_information: {
                    $ref: string;
                };
                billing_code_information: {
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
        };
        billing_code_information: {
            type: string;
            properties: {
                code: {
                    type: string;
                };
                type: {
                    enum: readonly ["CPT", "HCPCS", "ICD", "MS-DRG", "R-DRG", "S-DRG", "APS-DRG", "AP-DRG", "APR-DRG", "APC", "NDC", "HIPPS", "LOCAL", "EAPG", "CDT", "RC", "CDM"];
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
                modifiers: {
                    type: string;
                    items: {
                        type: string;
                    };
                    uniqueItems: boolean;
                };
                payers_information: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                    minItems: number;
                };
                billing_class: {
                    enum: readonly ["professional", "facility"];
                    type: string;
                };
                additional_generic_notes: {
                    type: string;
                };
            };
            required: string[];
        };
        payers_information: {
            type: string;
            properties: {
                payer_name: {
                    type: string;
                };
                plan_name: {
                    type: string;
                };
                additional_payer_notes: {
                    type: string;
                };
                standard_charge: {
                    type: string;
                    exclusiveMinimum: number;
                };
                standard_charge_percent: {
                    type: string;
                    exclusiveMinimum: number;
                };
                contracting_method: {
                    enum: readonly ["case rate", "fee schedule", "percent of total billed charges", "per diem", "other"];
                    type: string;
                };
            };
            required: string[];
            if: {
                properties: {
                    contracting_method: {
                        const: string;
                    };
                };
            };
            then: {
                required: string[];
            };
            else: {
                required: string[];
            };
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
        };
        last_updated_on: {
            type: string;
            format: string;
        };
        license_information: {
            type: string;
            items: {
                $ref: string;
            };
            minItems: number;
        };
        version: {
            type: string;
        };
        hospital_location: {
            type: string;
        };
        financial_aid_policy: {
            type: string;
        };
    };
    required: string[];
};
export declare function validateJson(jsonInput: File | NodeJS.ReadableStream, options?: JsonValidatorOptions): Promise<ValidationResult>;
export declare const JsonValidatorOneOne: {
    validateJson: typeof validateJson;
};
