import { AuthDTO, SignOutDTO } from "../types/dto";
import { LoginData } from "../types/redux";
import appConfig from "../appConfig";

interface AuthorizationService {
  backendProtocol: string;
  backendAddress: string;
  controller: AbortController;
  signal: AbortSignal;
}

class AuthorizationService implements AuthorizationService {
  constructor() {
    this.backendProtocol = appConfig.backendProtocol;
    this.backendAddress = appConfig.backendAddress;
  }

  private ensuredRequest = async (req: Function, needRefresh: boolean = true, requestsCounter: number = 0): Promise<any> => {
    const result = await req();

    if (needRefresh && result.status === 401 && requestsCounter === 0) {
      requestsCounter++;

      const sessionRefresh = sessionStorage.getItem('refresh');
      const localRefresh = localStorage.getItem('refresh');
      const validRefresh = sessionRefresh && sessionRefresh !== 'undefined' ? sessionRefresh :
        localRefresh && localRefresh !== 'undefined' ? localRefresh : '';

      try {
        const newRefresh = await this.refreshToken();
        sessionRefresh && sessionRefresh !== 'undefined' && sessionStorage.setItem('refresh', newRefresh.refresh);
        localRefresh && localRefresh !== 'undefined' && localStorage.setItem('refresh', newRefresh.refresh);

        return await this.ensuredRequest(req, true, requestsCounter);
      } catch(e: any) {
        console.error('An error thrown while refreshing access token: ', e.message);
      }
    }

    return await result.json();
  }

  signIn = async (loginData: LoginData): Promise<AuthDTO> => {
    const request = () => fetch(`${this.backendProtocol}://${this.backendAddress}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'withCredentials': 'true',
      },
      credentials: 'include',
      body: JSON.stringify({
        login: loginData.login,
        password: loginData.password
      }),
    });

    return await this.ensuredRequest(request, false);
  }

  refreshToken = async (): Promise<AuthDTO> => {
    const login = localStorage.getItem('login');
    const request = () => fetch(`${this.backendProtocol}://${this.backendAddress}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ login })
    });

    return await this.ensuredRequest(request, false);
  }

  signOut = async (refresh: string | null): Promise<SignOutDTO> => {
    const request = () => fetch(`${this.backendProtocol}://${this.backendAddress}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh })
    });

    return await this.ensuredRequest(request, false);
  }
}

export default AuthorizationService;
