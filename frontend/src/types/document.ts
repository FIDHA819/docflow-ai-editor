export interface TiptapContent {
  type: string;
  content?: TiptapContent[];
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: Array<Record<string, unknown>>;
}

export interface DocumentItem {
  _id: string;
  title: string;
  content: TiptapContent | null;
  owner?: {
    _id: string;
    email: string;
    name?: string;
  };
  sharedWith?: Array<{
    _id: string;
    email: string;
    name?: string;
  }>;
  updatedAt: string;
  createdAt?: string;
}