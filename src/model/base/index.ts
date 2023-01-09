
export interface CustomResponse<T> {
    code: number; // 状态码
    captchaEnabled:boolean;
    img:string[];
    msg: string[]; // 消息
    uuid: string;
    data:T
}
export type loginParams = {
    username: string,
    password: string,
    rememberMe: boolean,
    code: string,
    uuid: string
};
