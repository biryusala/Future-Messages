import { AuthDTO, SignOutDTO } from "./dto";
import { LoginData } from "./redux";

export interface IAuthorizationService {
    signIn(loginData: LoginData): Promise<AuthDTO>;
    refreshToken(refresh: string): Promise<AuthDTO>;
    signOut(refresh: string | null): Promise<SignOutDTO>;
}
