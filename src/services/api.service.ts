import axios, { type AxiosInstance } from 'axios';
import { API_BASE_URL } from '../config/env';
import type {
  DashboardGamesResponse,
  LoginAndLaunchGamePayload,
  LoginAndLaunchGameResponse,
} from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 second timeout
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        if (error.response) {
          // Server responded with error status
          console.error('Response error:', error.response.status, error.response.data);
        } else if (error.request) {
          // Request made but no response
          console.error('Request error:', error.request);
        } else {
          // Something else happened
          console.error('Error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Get all games for dashboard
   */
  async getDashboardGames(): Promise<DashboardGamesResponse> {
    const response = await this.api.get<DashboardGamesResponse>('/api/games/dashboard');
    return response.data;
  }

  /**
   * Login and launch game
   */
  async loginAndLaunchGame(
    payload: LoginAndLaunchGamePayload
  ): Promise<LoginAndLaunchGameResponse> {
    const response = await this.api.post<LoginAndLaunchGameResponse>(
      '/wallet/doLoginAndLaunchGame',
      payload
    );
    return response.data;
  }
}

export const apiService = new ApiService();
