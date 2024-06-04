/// <reference types="node" />
import { ErrorObject } from "ajv";
import { ValidationError } from "../../types.js";
import { JSONParser } from "@streamparser/json";
export declare function parseJson(jsonInput: File | NodeJS.ReadableStream, parser: JSONParser): Promise<void>;
export declare function errorObjectToValidationError(error: ErrorObject): ValidationError;
