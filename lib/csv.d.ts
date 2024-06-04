/// <reference types="node" />
import { ValidationResult, CsvValidatorVersion, CsvValidationOptions, SchemaVersion } from "./types.js";
export declare function getValidator(version: SchemaVersion): CsvValidatorVersion | null;
/**
 *
 * @param input Browser File or ReadableStream for streaming file content
 * @param onValueCallback Callback function to process streamed CSV row object
 * @returns Promise that resolves with the result of validation
 */
export declare function validateCsv(input: File | NodeJS.ReadableStream, version: SchemaVersion, options?: CsvValidationOptions): Promise<ValidationResult>;
