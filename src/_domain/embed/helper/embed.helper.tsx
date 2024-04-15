import { cosineSimilarity } from '../../../_lib/Math/calc.service'

export const getSimilarity = (
    val1: number[],
    val2: number[]
): number => {
    return cosineSimilarity(val1, val2)
}
