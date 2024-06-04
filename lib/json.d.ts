/// <reference types="node" />
import { ValidationResult, SchemaVersion, JsonValidatorOptions } from "./types.js";
/**
 *
 * @param jsonInput Browser File or ReadableStream to stream content from
 * @param onValueCallback Callback function to process streamed standard charge items
 * @returns Promise with validation result
 */
export type ModeTypes = "write" | "aggregate" | "default" | "incorrectKeys";
export declare function validateJson(jsonInput: File | NodeJS.ReadableStream, version: SchemaVersion, options?: JsonValidatorOptions, mode?: ModeTypes, outputFilePath?: string, clarityInfo?: any): Promise<ValidationResult>;
