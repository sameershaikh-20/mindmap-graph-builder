import { create } from 'zustand';
import { createGraphStore } from './actions';
import type { Store } from './actions';

export const useGraphStore = create<Store>((set, get) => createGraphStore(set, get));
