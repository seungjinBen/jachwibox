export type RoomType = 'open' | 'separated' | 'two_room';
export type Season = 'spring' | 'summer' | 'fall' | 'winter';
export type Priority = 'must' | 'recommend' | 'optional';
export type ProductType = 'budget' | 'performance' | 'design';

export interface Category {
  id: string;
  name: string;
  icon: string | null;
  room_types: RoomType[];
  sort_order: number;
}

export interface Item {
  id: string;
  category_id: string;
  name: string;
  priority: Priority;
  room_types: RoomType[];
  price_min: number;
  price_max: number;
  price_display: string;
  description: string | null;
}

export interface Product {
  id: string;
  item_id: string;
  type: ProductType;
  name: string;
  reason: string;
  price: number;
  coupang_url: string;
}

export interface ItemWithProducts extends Item {
  products: Product[];
  category_name?: string;
}

export interface SeasonalTip {
  id: string;
  season: Season;
  title: string;
  content: string;
  item_id: string | null;
  sort_order: number;
}

export type CookingFreq = 'never' | 'sometimes' | 'often';
export type WorkFromHome = 'no' | 'sometimes' | 'yes';
export type Budget = 'low' | 'mid' | 'high';

export interface AiRecommendRequest {
  room_type: RoomType;
  season: Season;
  cooking_freq: CookingFreq;
  work_from_home: WorkFromHome;
  budget: Budget;
  has_pet: boolean;
}

export interface AiRecommendation {
  rank: number;
  item_name: string;
  category: string;
  reason: string;
  priority: Priority;
  estimated_price: string;
  tip: string;
  coupang_url?: string;
}

export interface AiRecommendResult {
  recommendations: AiRecommendation[];
  total_budget_estimate: string;
  summary: string;
}

export type ChecklistState = Record<string, boolean>;
