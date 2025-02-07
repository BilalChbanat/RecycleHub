export interface WasteEntry {
  selected: boolean;
  weight: number | null;
}

export interface CollectionRequest {
  id?: string;
  wastes: Record<string, WasteEntry>;
  address: string;
  date: string;
  time: string;
  notes: string;
  status?: 'en attente' | 'occupée' | 'en cours' | 'validée' | 'rejetée';
  totalWeight: number;
  createdAt?: string;
  userId?: string;
}

export interface CollectionFormData {
  wastes: Record<string, WasteEntry>;
  address: string;
  date: string;
  time: string;
  notes: string;
}
