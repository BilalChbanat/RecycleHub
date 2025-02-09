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
  totalWeight: number;
  createdAt?: string;
  userId?: string;
  status?: 'en attente' | 'occupee' | 'en cours' | 'validee' | 'rejetee';
  collecteurId?: string;
  particulierId?: string;
  pointsAwarded?: number;
}

export interface CollectionFormData {
  wastes: Record<string, WasteEntry>;
  address: string;
  date: string;
  time: string;
  notes: string;
}

export const POINTS_PER_KG = {
  plastique: 2,
  verre: 1,
  papier: 1,
  metal: 5
} as const;
