import {
    VisionFormInterface
} from '../reducers/VisionForm'

export const buildOptions = (
    options: VisionFormInterface
): {
    temperature: number,
    max_tokens: number,
} => {
    
    return {
        temperature: options.temperature,
        max_tokens: options.max_tokens,
    }
}

