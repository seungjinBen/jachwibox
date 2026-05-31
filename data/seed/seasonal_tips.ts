import type { Season } from '@/types';

interface SeedSeasonalTip {
  season: Season;
  title: string;
  content: string;
  sort_order: number;
}

export const SEED_SEASONAL_TIPS: SeedSeasonalTip[] = [
  // 봄
  {
    season: 'spring',
    title: '겨울 침구 세탁 & 보관',
    content:
      '봄이 시작되면 두꺼운 이불과 담요를 세탁하고 압축 팩에 넣어 보관하세요. 진드기 방지를 위해 햇볕에 충분히 건조 후 보관하는 것이 포인트입니다.',
    sort_order: 1,
  },
  {
    season: 'spring',
    title: '창문 방충망 점검',
    content:
      '따뜻해지면 창문을 열기 시작하는데, 방충망에 구멍이 없는지 미리 확인하세요. 구멍이 있다면 방충망 테이프로 임시 수리하거나 교체를 요청하세요.',
    sort_order: 2,
  },
  {
    season: 'spring',
    title: '환기 루틴 만들기',
    content:
      '봄철 미세먼지가 심한 날은 창문을 닫고 공기청정기를 사용하세요. 미세먼지가 낮은 날은 아침저녁으로 15분씩 환기해 실내 공기를 순환시켜 주세요.',
    sort_order: 3,
  },
  {
    season: 'spring',
    title: '봄맞이 대청소 체크리스트',
    content:
      '에어컨 필터 청소, 냉장고 정리, 욕실 곰팡이 제거를 한 번에 진행하세요. 겨울 동안 누적된 오염을 제거하면 여름을 훨씬 쾌적하게 시작할 수 있습니다.',
    sort_order: 4,
  },
  {
    season: 'spring',
    title: '얇은 이불로 교체',
    content:
      '낮 기온이 15도 이상으로 올라오면 두꺼운 이불 대신 춘추용 이불이나 극세사 담요로 교체할 타이밍입니다. 온도 변화에 맞게 이불 두께를 조절하면 숙면에 도움이 됩니다.',
    sort_order: 5,
  },

  // 여름
  {
    season: 'summer',
    title: '에어컨 필터 청소 필수',
    content:
      '에어컨을 처음 켜기 전 필터를 반드시 청소하세요. 1~2주에 한 번 청소하면 전기요금을 15% 절약하고 냉방 효율을 높일 수 있습니다.',
    sort_order: 1,
  },
  {
    season: 'summer',
    title: '제습기 or 제습제 구비',
    content:
      '장마철에는 습도가 80% 이상으로 올라 곰팡이가 생기기 쉽습니다. 소형 제습기나 습기 제거제를 옷장과 신발장에 넣어두세요.',
    sort_order: 2,
  },
  {
    season: 'summer',
    title: '여름 식중독 예방',
    content:
      '조리 후 2시간 이상 상온 보관을 피하세요. 여름에는 냉장 보관이 기본입니다. 생선, 육류는 구매 당일 조리하거나 냉동 보관하는 습관을 만드세요.',
    sort_order: 3,
  },
  {
    season: 'summer',
    title: '선풍기 필터 청소',
    content:
      '선풍기 날개와 커버에 먼지가 쌓이면 바람의 질이 나빠집니다. 중성 세제로 씻어 완전히 건조 후 조립하면 위생적으로 사용할 수 있습니다.',
    sort_order: 4,
  },
  {
    season: 'summer',
    title: '여름 침구 교체',
    content:
      '냉감 이불이나 면 100% 소재로 교체하면 열대야에도 훨씬 시원하게 잘 수 있습니다. 땀을 흡수하는 면 소재 베개커버도 함께 준비하세요.',
    sort_order: 5,
  },

  // 가을
  {
    season: 'fall',
    title: '겨울 대비 보일러 점검',
    content:
      '날이 추워지기 전에 보일러 시험 가동을 해보세요. 장기간 사용하지 않으면 이상이 생길 수 있고, 집주인에게 수리 요청할 시간을 확보해야 합니다.',
    sort_order: 1,
  },
  {
    season: 'fall',
    title: '문풍지 & 뽁뽁이 준비',
    content:
      '창문 틈새에 문풍지를 붙이면 외풍을 차단해 난방비를 20~30% 절약할 수 있습니다. 창문에 뽁뽁이(에어캡)를 붙이는 것도 효과적인 단열 방법입니다.',
    sort_order: 2,
  },
  {
    season: 'fall',
    title: '겨울 이불 꺼내기',
    content:
      '보관했던 겨울 이불을 꺼내 세탁한 후 햇볕에 충분히 건조하세요. 압축 보관으로 납작해진 이불은 2~3일 환기하면 원래 볼륨을 회복합니다.',
    sort_order: 3,
  },
  {
    season: 'fall',
    title: '가습기 점검 & 청소',
    content:
      '겨울 내내 사용할 가습기를 미리 꺼내 내부를 식초물로 청소하세요. 가습기 세균은 호흡기 질환의 원인이 되므로 청결 관리가 중요합니다.',
    sort_order: 4,
  },
  {
    season: 'fall',
    title: '방한용품 미리 구매',
    content:
      '수면 양말, 핫팩, 전기장판은 겨울이 되면 품귀 현상이 생기거나 가격이 오릅니다. 10~11월에 미리 구매해두면 저렴하게 살 수 있습니다.',
    sort_order: 5,
  },

  // 겨울
  {
    season: 'winter',
    title: '동파 예방 필수',
    content:
      '영하 10도 이하가 예상되는 날에는 수도꼭지를 조금 열어두거나 보일러를 외출 모드로 설정하세요. 수도관이 동파되면 수리비가 수십만원 발생할 수 있습니다.',
    sort_order: 1,
  },
  {
    season: 'winter',
    title: '결로 방지 관리',
    content:
      '실내외 온도 차이가 크면 창문에 물방울이 맺히는 결로가 생깁니다. 결로 방지 필름을 붙이거나 통기성을 높이면 곰팡이 발생을 예방할 수 있습니다.',
    sort_order: 2,
  },
  {
    season: 'winter',
    title: '전기세 절약 팁',
    content:
      '전기장판 + 내복의 조합이 에어컨보다 훨씬 저렴합니다. 보일러 온도는 20~22도로 유지하고, 외출 시 외출 모드(15도)를 활용하면 난방비를 크게 절약할 수 있습니다.',
    sort_order: 3,
  },
  {
    season: 'winter',
    title: '가습기로 실내 습도 관리',
    content:
      '겨울 적정 실내 습도는 40~60%입니다. 습도가 너무 낮으면 감기에 걸리기 쉽고 피부가 건조해집니다. 가습기가 없다면 젖은 수건을 널어두는 것도 효과가 있습니다.',
    sort_order: 4,
  },
  {
    season: 'winter',
    title: '욕실 환기 & 곰팡이 예방',
    content:
      '겨울에는 환기를 꺼려 욕실에 곰팡이가 생기기 쉽습니다. 샤워 후 반드시 환풍기를 30분 이상 돌리고, 타일 이음새에 방곰팡이 스프레이를 뿌려두세요.',
    sort_order: 5,
  },
  {
    season: 'winter',
    title: '비상 카드 챙기기',
    content:
      '폭설로 편의점도 못 가는 날을 대비해 즉석밥, 컵라면, 물을 1~2일분 비축해두세요. 단전·단수 대비 손전등과 보조배터리도 챙겨두면 좋습니다.',
    sort_order: 6,
  },
];
