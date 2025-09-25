import { useAppDispatch } from "@/_store/configureStore";

export const ChatFormOptions = (e: React.ChangeEvent<HTMLInputElement>) =>
{
    const dispatch = useAppDispatch()
    dispatch({
        type    : 'ChatForm/setOptions',
        key     : 'store',
        option  : e.target.value
    })
}



export const copyToClipboard = (text: string): void => {
    navigator.clipboard.writeText(text).then(() => {
        console.log("クリップボードにコピーされました。");
    }).catch(err => {
        console.error("クリップボードへのコピーに失敗しました: ", err);
    });
}