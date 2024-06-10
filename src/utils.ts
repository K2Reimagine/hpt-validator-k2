/* eslint-disable @typescript-eslint/no-explicit-any */
import { ValidationError } from "./types"

export function addErrorsToList<T extends { warning?: boolean | undefined }>(
  newErrors: T[],
  errorList: T[],
  maxErrors = 0,
  counts: { errors: number; warnings: number }
) {
  console.log(counts, "counts")
  // if warning list is already full, don't add the new warnings
  if (maxErrors > 0 && counts.warnings >= maxErrors) {
    newErrors = newErrors.filter((error) => error.warning !== true)
    // only add enough to reach the limit
    if (counts.errors + newErrors.length > maxErrors) {
      newErrors = newErrors.slice(0, maxErrors - counts.errors)
    }
    errorList.push(...newErrors)
    counts.errors += newErrors.length
  } else {
    newErrors.forEach((error) => {
      if (error.warning) {
        if (maxErrors <= 0 || counts.warnings < maxErrors) {
          errorList.push(error)
          counts.warnings++
        }
      } else {
        if (maxErrors <= 0 || counts.errors < maxErrors) {
          errorList.push(error)
          counts.errors++
        }
      }
    })
  }

  return counts
}

export const filterAndAggregateErrors = (errorArray: ValidationError[]) => {
  if (errorArray && errorArray.length > 0) {
    const filteredErrors = errorArray?.filter((error: any) => {
      return !(
        error.message.includes("must be boolean") ||
        error.message.includes("must be string") ||
        error.message.includes("must be number") ||
        error.message.includes("must be array") ||
        error.field === "last_updated_on" ||
        error.message.includes("last_updated_on") ||
        error.message.includes("must be equal to one of the allowed values")
      )
    })

    const errorCounts = filteredErrors.reduce((acc: any, error: any) => {
      if (error.message.includes("must have required property")) {
        if (acc[error.message]) {
          acc[error.message].counting++
        } else {
          acc[error.message] = { counting: 1, examplePath: error.path }
        }
      }
      return acc
    }, {})

    const aggregatedErrors = Object.keys(errorCounts).map((key) => ({
      message: key,
      counting: errorCounts[key].counting,
      examplePath: errorCounts[key].examplePath,
    }))

    return aggregatedErrors
  }
}
