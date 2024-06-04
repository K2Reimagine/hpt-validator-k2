export async function parseJson(jsonInput, parser) {
    if (typeof window !== "undefined" && jsonInput instanceof File) {
        const stream = jsonInput.stream();
        const reader = stream.getReader();
        const textDecoder = new TextDecoder("utf-8");
        function readChunk() {
            return reader.read().then(({ done, value }) => {
                if (done) {
                    parser.end();
                    return;
                }
                parser.write(textDecoder.decode(value));
                readChunk();
            });
        }
        readChunk();
    }
    else {
        const jsonStream = jsonInput;
        jsonStream.on("end", () => parser.end());
        jsonStream.on("error", (e) => {
            throw e;
        });
        jsonStream.on("data", (data) => parser.write(data));
    }
}
export function errorObjectToValidationError(error) {
    return {
        path: error.instancePath,
        field: error.instancePath.split("/").pop(),
        message: error.message,
    };
}
