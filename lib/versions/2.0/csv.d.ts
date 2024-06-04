import { CsvValidationError } from "../../types.js";
export declare const HEADER_COLUMNS: readonly ["hospital_name", "last_updated_on", "version", "hospital_location", "hospital_address", "license_number | [state]", "To the best of its knowledge and belief, the hospital has included all applicable standard charge information in accordance with the requirements of 45 CFR 180.50, and the information encoded is true, accurate, and complete as of the date indicated."];
export declare const BASE_COLUMNS: string[];
export declare const OPTIONAL_COLUMNS: string[];
export declare const TALL_COLUMNS: string[];
export declare const NEW_2025_COLUMNS: string[];
/** @private */
export declare function validateHeader(columns: string[], row: string[]): CsvValidationError[];
/** @private */
export declare function validateHeaderColumns(columns: string[]): {
    errors: CsvValidationError[];
    columns: string[];
};
/** @private */
export declare function validateHeaderRow(headers: string[], row: string[]): CsvValidationError[];
/** @private */
export declare function validateColumns(columns: string[]): CsvValidationError[];
/** @private */
export declare function validateRow(row: {
    [key: string]: string;
}, index: number, columns: string[], wide?: boolean): CsvValidationError[];
/** @private */
export declare function validateWideFields(row: {
    [key: string]: string;
}, index: number, columns: string[], foundCode: boolean): CsvValidationError[];
/** @private */
export declare function validateWideModifierFields(row: {
    [key: string]: string;
}, index: number, columns: string[]): CsvValidationError[];
/** @private */
export declare function validateTallFields(row: {
    [key: string]: string;
}, index: number, columns: string[], foundCode: boolean): CsvValidationError[];
/** @private */
export declare function validateTallModifierFields(row: {
    [key: string]: string;
}, index: number, columns: string[]): CsvValidationError[];
/** @private */
export declare function getBaseColumns(columns: string[]): string[];
/** @private */
export declare function getWideColumns(columns: string[]): string[];
/** @private */
export declare function getTallColumns(): string[];
/** @private */
export declare function isTall(columns: string[]): boolean;
export declare const CsvValidatorTwoZero: {
    validateHeader: typeof validateHeader;
    validateColumns: typeof validateColumns;
    validateRow: typeof validateRow;
    isTall: typeof isTall;
};
