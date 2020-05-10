export interface CustomResponse {
    status: boolean;
    payload: any;
    message: string;
}

export default class Utils {
    static sendResponse(status: boolean, payload?: any, message?: string): CustomResponse {
        return {
            status,
            payload,
            message,
        };
    }
}
