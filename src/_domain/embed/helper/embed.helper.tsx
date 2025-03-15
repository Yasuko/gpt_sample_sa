import { cosineSimilarity } from '../../../_lib/Math/calc.service'

/**
 * 2つの数値配列のコサイン類似度を計算する
 * 配列 val1 と val2 の間の類似度を数値で返す
 *
 * @param val1 number[] 類似度を計算するための最初の数値配列
 * @param val2 number[] 類似度を計算するための2番目の数値配列
 * @returns number 計算されたコサイン類似度
 */
export const getSimilarity = (
    val1: number[],
    val2: number[]
): number => {
    return cosineSimilarity(val1, val2)
}
