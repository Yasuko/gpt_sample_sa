/*
import { PdfToTextService } from '../../../_lib/converter/pdf_to_text.service'
import { DocxToTextService } from '../../../_lib/converter/docx_to_text.service'

// 外部サービスを使用してファイルをテキストに変換する関数
export const convertToText = async (
    file: string,
    fileType: string
): Promise<string> => {
    //console.log(file)
    if (fileType === 'pdf') {
        PdfToTextService.call()
                .setFile(file)
                .toUint8Array()

        return await PdfToTextService.call().conv()
    }
    if (fileType === 'docx') {
        DocxToTextService.call()
                .setFile(file)
                //.toBuffer()

        return await DocxToTextService.call().conv()
    }
    return ''
}

*/