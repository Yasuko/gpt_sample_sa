import { ParseService } from '../../../_lib/gpt/parse.service'

export class ParseHelper
{
    private static instance: ParseHelper;

    private constructor() {}

    public static call(): ParseHelper
    {
        if (!ParseHelper.instance) {
            ParseHelper.instance = new ParseHelper();
        }
        return ParseHelper.instance;
    }

    public parse(
        data: any,
        job: 'chat' | 'whisper' | 'embed' | 'chroma' | 'vision' | 'speech'
            | 'ocr' | 'ocr2' | 'image' | 'embed2' | 'comp' = 'chat'
    ): any {
        if (job === 'chat') return ParseService.call().chat(data)
        if (job === 'whisper') return ParseService.call().whisper(data.result)
        if (job === 'image') return ParseService.call().image(data)
        if (job === 'speech') return ParseService.call().speech(data)
        if (job === 'vision') return ParseService.call().vision(data)
        if (job === 'embed') return ParseService.call().embed(data)
        return
    }
}