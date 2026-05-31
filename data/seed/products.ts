import type { ProductType } from '@/types';

interface SeedProduct {
  item_name: string;
  type: ProductType;
  name: string;
  reason: string;
  price: number;
  coupang_url: string;
}

export const SEED_PRODUCTS: SeedProduct[] = [
  // 냄비 세트
  {
    item_name: '냄비 세트',
    type: 'budget',
    name: '락앤락 냄비 3종 세트',
    reason: '합리적인 가격에 기본 3가지 사이즈 구성, 유도가열 호환',
    price: 19900,
    coupang_url: 'https://coupang.com/placeholder',
  },
  {
    item_name: '냄비 세트',
    type: 'performance',
    name: '해피콜 IH 스텐 냄비 세트',
    reason: '스테인리스 전층 가열로 음식이 고르게 익고 내구성이 탁월',
    price: 32000,
    coupang_url: 'https://coupang.com/placeholder',
  },
  {
    item_name: '냄비 세트',
    type: 'design',
    name: '테팔 인제니오 냄비 세트',
    reason: '손잡이 탈부착으로 수납이 획기적으로 줄어드는 깔끔한 디자인',
    price: 34900,
    coupang_url: 'https://coupang.com/placeholder',
  },

  // 프라이팬
  {
    item_name: '프라이팬',
    type: 'budget',
    name: '키친아트 황토 코팅 프라이팬 24cm',
    reason: '1만원대에 코팅 품질이 좋아 자취생 최초 팬으로 적합',
    price: 13900,
    coupang_url: 'https://coupang.com/placeholder',
  },
  {
    item_name: '프라이팬',
    type: 'performance',
    name: '해피콜 다이아몬드 IH 프라이팬 28cm',
    reason: '다이아몬드 코팅 10겹으로 스크래치에 강하고 열 전달이 균일',
    price: 39000,
    coupang_url: 'https://coupang.com/placeholder',
  },
  {
    item_name: '프라이팬',
    type: 'design',
    name: '르크루제 트윈 논스틱 프라이팬 24cm',
    reason: '주방을 꾸미는 감각적인 컬러와 고급스러운 마감',
    price: 42000,
    coupang_url: 'https://coupang.com/placeholder',
  },

  // 샤워 호스 + 헤드
  {
    item_name: '샤워 호스 + 헤드',
    type: 'budget',
    name: '대림바스 샤워 호스 + 헤드 세트',
    reason: '7천원대에 기본 성능 충실, 표준 규격으로 어디서나 호환',
    price: 7900,
    coupang_url: 'https://coupang.com/placeholder',
  },
  {
    item_name: '샤워 호스 + 헤드',
    type: 'performance',
    name: '한샘 절수형 샤워헤드 세트',
    reason: '절수 기능으로 수도세 절약, 수압이 약한 집에서도 강한 샤워감',
    price: 18000,
    coupang_url: 'https://coupang.com/placeholder',
  },
  {
    item_name: '샤워 호스 + 헤드',
    type: 'design',
    name: '아메리칸스탠다드 레인샤워 세트',
    reason: '호텔 느낌의 레인샤워 헤드, 욕실 분위기를 한 번에 업그레이드',
    price: 21900,
    coupang_url: 'https://coupang.com/placeholder',
  },

  // 이불 + 베개 세트
  {
    item_name: '이불 + 베개 세트',
    type: 'budget',
    name: '이케아 FJÄLLBRÄCKA 이불 + 베개 세트',
    reason: '3만원대에 이불과 베개 모두 포함, 혼자 시작하기 딱 좋은 구성',
    price: 32000,
    coupang_url: 'https://coupang.com/placeholder',
  },
  {
    item_name: '이불 + 베개 세트',
    type: 'performance',
    name: '몽트래 구스다운 이불 + 호텔베개 세트',
    reason: '구스다운 충전재로 가볍고 보온성이 탁월, 10년 이상 사용 가능',
    price: 85000,
    coupang_url: 'https://coupang.com/placeholder',
  },
  {
    item_name: '이불 + 베개 세트',
    type: 'design',
    name: '자라홈 워싱코튼 이불 세트',
    reason: '내추럴 워싱 텍스처로 방 분위기를 카페처럼 만들어주는 감성 세트',
    price: 78000,
    coupang_url: 'https://coupang.com/placeholder',
  },
];
