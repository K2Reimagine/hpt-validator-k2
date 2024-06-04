import { CsvValidationError, ValidationError } from "../../types.js";
export declare function csvErrorToValidationError(err: CsvValidationError): ValidationError;
export declare function csvErr(row: number, column: number, field: string | undefined, message: string, warning?: boolean): CsvValidationError;
export declare function cleanColumnNames(columns: string[]): string[];
export declare function sepColumnsEqual(colA: string, colB: string): boolean;
export declare const ASCII_UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export declare function csvCellName(row: number, column: number): string;
export declare function csvColumnName(column: number): string;
export declare function objectFromKeysValues(keys: string[], values: string[]): {
    [key: string]: string;
};
export declare function rowIsEmpty(row: string[]): boolean;
export declare function parseSepField(field: string): string[];
export declare function getCodeCount(columns: string[]): number;
export declare function isEmptyString(value: string): boolean;
export declare function isNonEmptyString(value: string): boolean;
export declare function isValidDate(value: string): boolean;
export declare function matchesString(value: string, target: string): boolean;
