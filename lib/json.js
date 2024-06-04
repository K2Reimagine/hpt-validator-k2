import { JsonValidatorOneOne } from "./versions/1.1/json.js";
import { JsonValidatorTwoZero } from "./versions/2.0/json.js";
export async function validateJson(jsonInput, version, options = {}, mode, outputFilePath, clarityInfo) {
    if (version === "v1.1") {
        return JsonValidatorOneOne.validateJson(jsonInput, options);
    }
    else if (version === "v2.0" || version === "v2.0.0") {
        return JsonValidatorTwoZero.validateJson(jsonInput, options, mode, outputFilePath, clarityInfo);
    }
    return new Promise((resolve) => {
        resolve({
            valid: false,
            errors: [{ path: "/", message: `Invalid version "${version}" supplied` }],
        });
    });
}
