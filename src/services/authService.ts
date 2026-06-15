import { apiClient } from './apiClient';
import type { User } from '../types/user';

export const authService = {
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    return apiClient.post('/auth/login', { email, password });
  },

  async signup(email: string, password: string, name: string): Promise<{ user: User; token: string }> {
    return apiClient.post('/auth/signup', { email, password, name });
  },

  async logout(): Promise<void> {
    return apiClient.post('/auth/logout', {});
  },

  async getProfile(): Promise<User> {
    return apiClient.get('/user/profile');
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    return apiClient.put('/user/profile', updates);
  },

  async resetPassword(email: string): Promise<void> {
    return apiClient.post('/auth/reset-password', { email });
  },
};
