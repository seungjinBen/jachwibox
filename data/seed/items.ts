export interface SeedCategory {
  key: string;
  name: string;
  icon: string | null;
  room_types: string[];
  sort_order: number;
}

export interface SeedItem {
  name: string;
  category_key: string;
  priority: 'must' | 'recommend' | 'optional';
  room_types: string[];
  price_min: number;
  price_max: number;
  price_display: string;
  description: string | null;
}

const ALL_ROOMS = ['open', 'separated', 'two_room'];

export const CATEGORIES: SeedCategory[] = [
  { key: 'kitchen',  name: '주방',    icon: 'IconToolsKitchen2', room_types: ALL_ROOMS, sort_order: 1 },
  { key: 'bathroom', name: '욕실',    icon: 'IconBath',          room_types: ALL_ROOMS, sort_order: 2 },
  { key: 'living',   name: '침실·거실', icon: 'IconBed',         room_types: ALL_ROOMS, sort_order: 3 },
  { key: 'appliance',name: '가전',    icon: 'IconDevices',       room_types: ALL_ROOMS, sort_order: 4 },
  { key: 'life',     name: '생활',    icon: 'IconHome',          room_types: ALL_ROOMS, sort_order: 5 },
];

export const ITEMS: SeedItem[] = [
  // ─── 주방 ───────────────────────────────────────────────────────────────
  { name: '냄비 세트',        category_key: 'kitchen',  priority: 'must',      room_types: ALL_ROOMS, price_min: 18000, price_max: 35000,  price_display: '2~4만원',      description: '밥·국·찌개 기본 요리에 필수' },
  { name: '프라이팬',         category_key: 'kitchen',  priority: 'must',      room_types: ALL_ROOMS, price_min: 13000, price_max: 42000,  price_display: '1~4만원',      description: '볶음·계란·육류 조리에 필수' },
  { name: '도마 + 칼 세트',   category_key: 'kitchen',  priority: 'must',      room_types: ALL_ROOMS, price_min: 10000, price_max: 30000,  price_display: '1~3만원',      description: '채소·육류 손질에 필수' },
  { name: '수세미 + 주방세제', category_key: 'kitchen',  priority: 'must',      room_types: ALL_ROOMS, price_min: 3000,  price_max: 8000,   price_display: '3천~8천원',    description: '설거지 필수 소모품' },
  { name: '전자레인지',        category_key: 'kitchen',  priority: 'recommend', room_types: ALL_ROOMS, price_min: 55000, price_max: 120000, price_display: '6~12만원',     description: '배달음식 데우기, 간편 조리' },
  { name: '밥솥',             category_key: 'kitchen',  priority: 'recommend', room_types: ALL_ROOMS, price_min: 30000, price_max: 80000,  price_display: '3~8만원',      description: '혼자 밥 먹는다면 미니 밥솥 추천' },

  // ─── 욕실 ───────────────────────────────────────────────────────────────
  { name: '샤워 호스 + 헤드',    category_key: 'bathroom', priority: 'must',      room_types: ALL_ROOMS,                         price_min: 7000,  price_max: 22000,  price_display: '7천~2만원',    description: '노후된 샤워기 교체 필수품' },
  { name: '욕실 매트',           category_key: 'bathroom', priority: 'must',      room_types: ALL_ROOMS,                         price_min: 8000,  price_max: 20000,  price_display: '8천~2만원',    description: '미끄럼 방지 + 발 물기 제거' },
  { name: '청소 솔 + 변기 클리너', category_key: 'bathroom', priority: 'must',    room_types: ALL_ROOMS,                         price_min: 5000,  price_max: 12000,  price_display: '5천~1만원',    description: '욕실 위생 관리 필수' },
  { name: '샤워 커튼',           category_key: 'bathroom', priority: 'recommend', room_types: ['open', 'separated', 'two_room'], price_min: 10000, price_max: 30000,  price_display: '1~3만원',      description: '물 튀김 방지, 욕조·분리 세면대에 필요' },
  { name: '수건 세트',           category_key: 'bathroom', priority: 'must',      room_types: ALL_ROOMS,                         price_min: 10000, price_max: 30000,  price_display: '1~3만원',      description: '목욕 수건 2~3장 + 손수건' },

  // ─── 침실·거실 ──────────────────────────────────────────────────────────
  { name: '이불 + 베개 세트', category_key: 'living', priority: 'must',      room_types: ALL_ROOMS, price_min: 30000, price_max: 90000,  price_display: '3~9만원',  description: '계절에 맞는 이불 필수' },
  { name: '매트리스 커버',    category_key: 'living', priority: 'must',      room_types: ALL_ROOMS, price_min: 15000, price_max: 40000,  price_display: '2~4만원',  description: '매트리스 위생 보호' },
  { name: '암막 커튼',        category_key: 'living', priority: 'recommend', room_types: ALL_ROOMS, price_min: 20000, price_max: 50000,  price_display: '2~5만원',  description: '수면의 질 향상, 도시 빛 차단' },
  { name: '수납 선반',        category_key: 'living', priority: 'recommend', room_types: ALL_ROOMS, price_min: 15000, price_max: 40000,  price_display: '2~4만원',  description: '원룸 공간 활용에 필수' },
  { name: '옷걸이 + 행거',    category_key: 'living', priority: 'must',      room_types: ALL_ROOMS, price_min: 10000, price_max: 30000,  price_display: '1~3만원',  description: '옷장 없는 원룸에서 필수' },

  // ─── 가전 ───────────────────────────────────────────────────────────────
  { name: '무선 청소기',  category_key: 'appliance', priority: 'recommend', room_types: ALL_ROOMS, price_min: 50000,  price_max: 200000, price_display: '5~20만원',  description: '가볍고 편리한 청소 필수품' },
  { name: '공기청정기',   category_key: 'appliance', priority: 'optional',  room_types: ALL_ROOMS, price_min: 80000,  price_max: 300000, price_display: '8~30만원',  description: '미세먼지 심한 계절 추천' },
  { name: '가습기',       category_key: 'appliance', priority: 'optional',  room_types: ALL_ROOMS, price_min: 20000,  price_max: 80000,  price_display: '2~8만원',   description: '건조한 계절 수면 환경 개선' },
  { name: '선풍기',       category_key: 'appliance', priority: 'recommend', room_types: ALL_ROOMS, price_min: 30000,  price_max: 100000, price_display: '3~10만원',  description: '여름 냉방비 절약 필수품' },

  // ─── 생활 ───────────────────────────────────────────────────────────────
  { name: '세탁 세제',          category_key: 'life', priority: 'must',      room_types: ALL_ROOMS, price_min: 5000, price_max: 15000, price_display: '5천~1만5천원', description: '세탁기 또는 손빨래용 세제' },
  { name: '휴지',               category_key: 'life', priority: 'must',      room_types: ALL_ROOMS, price_min: 5000, price_max: 10000, price_display: '5천~1만원',    description: '두루마리 휴지 30~40롤 초기 구비' },
  { name: '쓰레기통',           category_key: 'life', priority: 'must',      room_types: ALL_ROOMS, price_min: 5000, price_max: 20000, price_display: '5천~2만원',    description: '분리수거용 2개 이상 준비' },
  { name: '다용도 청소 스프레이', category_key: 'life', priority: 'recommend', room_types: ALL_ROOMS, price_min: 5000, price_max: 15000, price_display: '5천~1만5천원', description: '주방·욕실·가구 표면 세척용' },
];
