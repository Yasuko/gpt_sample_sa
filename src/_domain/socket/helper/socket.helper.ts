import { SocketClient2Service } from '../../../_lib/websocket/socket_client2.service';
import { uuidService } from '../../../_lib/indentification/uuid'
export class SocketHelper
{
    private static instance: SocketHelper;

    private Socket  : SocketClient2Service | undefined = undefined;
    private Port    : number = 8888;
    private Server  : string = 'ws://localhost';

    public static call(): SocketHelper
    {
        if (!SocketHelper.instance) {
            SocketHelper.instance = new SocketHelper();
        }
        return SocketHelper.instance;
    }

    /**
     * 
     * @param port number 
     * @returns SocketHelper
     */
    public setPort(port: number): SocketHelper
    {
        this.Port = port;
        return this;
    }

    /**
     * 
     * @param server string フルパスのURL(例：ws://localhost)
     * @returns SocketHelper
     */
    public setServer(server: string): SocketHelper
    {
        this.Server = server;
        return this;
    }

    /**
     * サーバーに接続
     */
    public conn()
    {
        if (this.Socket === undefined) {
            this.Socket = SocketClient2Service.call(this.Port, this.Server) as SocketClient2Service;
        }
    }

    /**
     * WebSocket待受開始
     * 
     * @param next Function 受信時のコールバック関数
     */
    public listen(next: (e: Event | MessageEvent) => void): void
    {
        this.Socket?.setNext(next, 'message').listen();
    }

    /**
     * メッセージ送信
     * 変則指示の為jobは「other」固定
     */
    public async send(message: object)
    {
        console.log(message)
        this.Socket?.send({
            job : 'other',
            data: JSON.stringify(message)
        });
    }

    public async fileToBase64(file: File): Promise<string> {
        // console.log(file)
        return new Promise((resolve, reject) => {
            const r = new FileReader();
            r.onload = ((val) => {
                const buf = val.target?.result as ArrayBuffer;
                const u = new Uint8Array(buf)
                resolve(btoa(String.fromCharCode(...u)))
            })
            r.readAsArrayBuffer(file)
        })
    } 

    public getUUID(): string
    {
        return uuidService.call().getUUIDv4();
    }

    /**
     * 指示を初期化
     * 初期値の[0,6,6,6,6,6,6,0,0,0,0]に戻す
     */
    private reset(): void
    {

    }
}