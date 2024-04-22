import { dataService } from '../../../_lib/converter/data.service'

export const fileToBase64 = async (file: any): Promise<string> => {
    return await dataService.fileToBase64(file)
}