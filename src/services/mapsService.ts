import { apiClient } from './apiClient';
import type { MapMeta } from '../types/maps';

export const mapsService = {
  async getMaps(): Promise<MapMeta[]> {
    return apiClient.get('/maps');
  },

  async getMap(id: string): Promise<MapMeta> {
    return apiClient.get(`/maps/${id}`);
  },

  async createMap(name: string): Promise<MapMeta> {
    return apiClient.post('/maps', { name });
  },

  async updateMap(id: string, updates: Partial<MapMeta>): Promise<MapMeta> {
    return apiClient.put(`/maps/${id}`, updates);
  },

  async deleteMap(id: string): Promise<void> {
    return apiClient.delete(`/maps/${id}`);
  },

  async duplicateMap(id: string): Promise<MapMeta> {
    return apiClient.post(`/maps/${id}/duplicate`, {});
  },
};
