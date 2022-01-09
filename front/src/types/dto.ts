export interface AuthDTO {
    refresh: string;
    statusCode?: string | number | undefined;
    message?: string | undefined;
}

export interface SignOutDTO {
    code: number;
    message: string;
}

export interface SendRequestsToBuyDto {
  status: number;
  message: string;
}