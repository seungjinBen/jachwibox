import type { RoomType, Priority } from '@/types';

interface SeedItem {
  name: string;
  priority: Priority;
  room_types: RoomType[];
  price_min: number;
  price_max: number;
  price_display: string;
  description?: string;
}

interface SeedCategory {
  name: string;
  icon: string;
  room_types: RoomType[];
  sort_order: number;
  items: SeedItem[];
}

const ALL_ROOMS: RoomType[] = ['open', 'separated', 'two_room'];

export const SEED_CATEGORIES: SeedCategory[] = [
  {
    name: '주방',
    icon: 'tool-kitchen-2',
    room_types: ALL_ROOMS,
    sort_order: 1,
    items: [
      {
        name: '냄비 세트',
        priority: 'must',
        room_types: ALL_ROOMS,
        price_min: 18000,
        price_max: 35000,
        price_display: '1.8~3.5만원',
        description: '라면, 국물 요리에 필수. 2~3구짜리 세트 추천',
      },
      {
        name: '프라이팬',
        priority: 'must',
        room_types: ALL_ROOMS,
        price_min: 13000,
        price_max: 42000,
        price_display: '1.3~4.2만원',
        description: '볶음, 계란 요리에 필수. 20~24cm 사이즈 추천',
      },
      {
        name: '도마 + 칼 세트',
        priority: 'must',
        room_types: ALL_ROOMS,
        price_min: 10000,
        price_max: 30000,
        price_display: '1~3만원',
        description: '항균 도마와 다용도 칼 조합 추천',
      },
      {
        name: '수세미 + 주방세제',
        priority: 'must',
        room_types: ALL_ROOMS,
        price_min: 3000,
        price_max: 8000,
        price_display: '3천~8천원',
      },
      {
        name: '전자레인지',
        priority: 'recommend',
        room_types: ALL_ROOMS,
        price_min: 55000,
        price_max: 120000,
        price_display: '5.5~12만원',
        description: '20L 단순 가열 모델이면 충분',
      },
      {
        name: '밥솥',
        priority: 'recommend',
        room_types: ALL_ROOMS,
        price_min: 30000,
        price_max: 80000,
        price_display: '3~8만원',
        description: '혼자 살면 3~4인용으로도 충분',
      },
      {
        name: '식탁 매트',
        priority: 'optional',
        room_types: ALL_ROOMS,
        price_min: 5000,
        price_max: 15000,
        price_display: '5천~1.5만원',
      },
    ],
  },
  {
    name: '욕실',
    icon: 'bath',
    room_types: ALL_ROOMS,
    sort_order: 2,
    items: [
      {
        name: '샤워 호스 + 헤드',
        priority: 'must',
        room_types: ALL_ROOMS,
        price_min: 7000,
        price_max: 22000,
        price_display: '7천~2.2만원',
        description: '기존 샤워기가 노후화된 경우 교체 필수',
      },
      {
        name: '욕실 매트',
        priority: 'must',
        room_types: ALL_ROOMS,
        price_min: 8000,
        price_max: 20000,
        price_display: '8천~2만원',
        description: '미끄럼 방지 필수. 속건성 소재 추천',
      },
      {
        name: '청소 솔 + 변기 클리너',
        priority: 'must',
        room_types: ALL_ROOMS,
        price_min: 5000,
        price_max: 12000,
        price_display: '5천~1.2만원',
      },
      {
        name: '샤워 커튼',
        priority: 'recommend',
        room_types: ['open', 'separated'],
        price_min: 10000,
        price_max: 30000,
        price_display: '1~3만원',
        description: '오픈형/분리형 원룸은 욕실 분리가 부족한 경우 유용',
      },
      {
        name: '수건 걸이',
        priority: 'recommend',
        room_types: ALL_ROOMS,
        price_min: 8000,
        price_max: 25000,
        price_display: '8천~2.5만원',
        description: '붙이는 타입 추천 (못 구멍 없음)',
      },
    ],
  },
  {
    name: '침실·거실',
    icon: 'bed',
    room_types: ALL_ROOMS,
    sort_order: 3,
    items: [
      {
        name: '이불 + 베개 세트',
        priority: 'must',
        room_types: ALL_ROOMS,
        price_min: 30000,
        price_max: 90000,
        price_display: '3~9만원',
        description: '계절에 맞는 충전재 선택 중요',
      },
      {
        name: '매트리스 커버',
        priority: 'must',
        room_types: ALL_ROOMS,
        price_min: 15000,
        price_max: 40000,
        price_display: '1.5~4만원',
        description: '매트리스 위생 유지에 필수',
      },
      {
        name: '암막 커튼',
        priority: 'recommend',
        room_types: ALL_ROOMS,
        price_min: 20000,
        price_max: 50000,
        price_display: '2~5만원',
        description: '수면 질 향상에 큰 도움',
      },
      {
        name: '수납 선반',
        priority: 'recommend',
        room_types: ALL_ROOMS,
        price_min: 15000,
        price_max: 40000,
        price_display: '1.5~4만원',
        description: '좁은 공간 수납 효율 극대화',
      },
    ],
  },
  {
    name: '가전',
    icon: 'device-laptop',
    room_types: ALL_ROOMS,
    sort_order: 4,
    items: [
      {
        name: '무선 청소기',
        priority: 'recommend',
        room_types: ALL_ROOMS,
        price_min: 50000,
        price_max: 200000,
        price_display: '5~20만원',
        description: '좁은 공간에서 코드리스가 훨씬 편함',
      },
      {
        name: '공기청정기',
        priority: 'optional',
        room_types: ALL_ROOMS,
        price_min: 80000,
        price_max: 300000,
        price_display: '8~30만원',
        description: '미세먼지 많은 계절에 특히 유용',
      },
      {
        name: '가습기',
        priority: 'optional',
        room_types: ALL_ROOMS,
        price_min: 20000,
        price_max: 80000,
        price_display: '2~8만원',
        description: '겨울철 건조 예방. 초음파식 추천',
      },
    ],
  },
];
