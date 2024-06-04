import { CsvValidationError } from "../../types.js";
export declare const HEADER_COLUMNS: string[];
export declare const BASE_COLUMNS: string[];
export declare const MIN_MAX_COLUMNS: string[];
export declare const TALL_COLUMNS: string[];
/** @private */
export declare function validateHeader(columns: string[], row: string[]): CsvValidationError[];
/** @private */
export declare function validateHeaderColumns(columns: string[]): {
    errors: CsvValidationError[];
    columns: (string | undefined)[];
};
/** @private */
export declare function validateHeaderRow(headers: (string | undefined)[], row: string[]): CsvValidationError[];
/** @private */
export declare function validateColumns(columns: string[]): CsvValidationError[];
/** @private */
export declare function validateRow(row: {
    [key: string]: string;
}, index: number, columns: string[], wide?: boolean): CsvValidationError[];
/** @private */
export declare function validateWideFields(row: {
    [key: string]: string;
}, index: number): CsvValidationError[];
/** @private */
export declare function validateTallFields(row: {
    [key: string]: string;
}, index: number): CsvValidationError[];
/** @private */
export declare function getBaseColumns(columns: string[]): string[];
/** @private */
export declare function getWideColumns(columns: string[]): string[];
/** @private */
export declare function getTallColumns(columns: string[]): string[];
/** @private */
export declare function isTall(columns: string[]): boolean;
export declare const CsvValidatorOneOne: {
    validateHeader: typeof validateHeader;
    validateColumns: typeof validateColumns;
    validateRow: typeof validateRow;
    isTall: typeof isTall;
};
