export interface MapMeta {
  id: string;
  name: string;
  thumbnail?: string;
  lastModified: Date;
  createdAt: Date;
  nodeCount: number;
  tags?: string[];
}
