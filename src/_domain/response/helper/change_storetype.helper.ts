import { ResponseFormType, ResponseHistoryType } from '../reducers/__type.response';

/**
 * ResponseFormのデータをResponseHistoryに挿入可能な形式に変換する関数
 * @param form ResponseFormTypeのデータ
 * @returns ResponseHistoryType[]の配列
 */
export function convertResponseFormToHistory(form: ResponseFormType): ResponseHistoryType[] {
    const historyItems: ResponseHistoryType[] = [];

    // textがある場合、テキストアイテムを追加
    if (form.text.trim()) {
        historyItems.push({
            role: 'user',
            text: form.text,
        });
    }

    // 各imageごとにアイテムを追加
    form.image.forEach((imageItem) => {
        historyItems.push({
            role: 'user',
            image: imageItem,
        });
    });

    // 各fileごとにアイテムを追加
    form.file.forEach((fileItem) => {
        historyItems.push({
            role: 'user',
            file: fileItem,
        });
    });

    // 各audioごとにアイテムを追加
    form.audio.forEach((audioItem) => {
        historyItems.push({
            role: 'user',
            audio: audioItem,
        });
    });

    return historyItems;
}