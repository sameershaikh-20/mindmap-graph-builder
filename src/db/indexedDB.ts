import Dexie from 'dexie';
import type { Table } from 'dexie';

export interface SavedGraph {
  id?: number;
  name: string;
  data: string;
  createdAt: Date;
  updatedAt: Date;
}

export class MindMapDB extends Dexie {
  graphs!: Table<SavedGraph, number>;

  constructor() {
    super('MindMapDB');
    this.version(1).stores({
      graphs: '++id, name, createdAt, updatedAt',
    });
  }
}

export const db = new MindMapDB();

export async function saveGraph(name: string, data: string): Promise<number> {
  const existing = await db.graphs.where('name').equals(name).first();
  if (existing) {
    await db.graphs.update(existing.id!, { data, updatedAt: new Date() });
    return existing.id!;
  }
  return db.graphs.add({ name, data, createdAt: new Date(), updatedAt: new Date() });
}

export async function loadGraph(id: number): Promise<SavedGraph | undefined> {
  return db.graphs.get(id);
}

export async function listGraphs(): Promise<SavedGraph[]> {
  return db.graphs.orderBy('updatedAt').reverse().toArray();
}

export async function deleteGraph(id: number): Promise<void> {
  return db.graphs.delete(id);
}
