import { ValidationError } from "./types";
export declare function addErrorsToList<T extends {
    warning?: boolean | undefined;
}>(newErrors: T[], errorList: T[], maxErrors: number | undefined, counts: {
    errors: number;
    warnings: number;
}): {
    errors: number;
    warnings: number;
};
export declare const filterAndAggregateErrors: (errorArray: ValidationError[]) => {
    message: string;
    counting: any;
    examplePath: any;
}[] | undefined;
