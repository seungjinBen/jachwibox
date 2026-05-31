export interface SeedSeasonalTip {
  season: 'spring' | 'summer' | 'fall' | 'winter';
  title: string;
  content: string;
  item_name: string | null;
  sort_order: number;
}

export const SEASONAL_TIPS: SeedSeasonalTip[] = [
  // ─── 봄 ─────────────────────────────────────────────────────────────────
  {
    season: 'spring',
    title: '겨울 침구 세탁 & 보관',
    content: '봄이 시작되면 두꺼운 이불과 담요를 세탁하고 압축 팩에 보관하세요. 햇볕에 충분히 건조 후 보관해야 진드기를 예방할 수 있습니다.',
    item_name: '이불 + 베개 세트',
    sort_order: 1,
  },
  {
    season: 'spring',
    title: '창문 방충망 점검',
    content: '따뜻해지면 창문을 열기 시작하는데, 방충망에 구멍이 없는지 미리 확인하세요. 구멍이 있다면 방충망 테이프로 임시 수리하거나 교체를 요청하세요.',
    item_name: null,
    sort_order: 2,
  },
  {
    season: 'spring',
    title: '황사·미세먼지 대비',
    content: '봄철 황사가 심한 날은 창문을 닫고 공기청정기를 사용하세요. 미세먼지 낮은 날 아침저녁 15분씩 환기해 실내 공기를 순환시켜 주세요.',
    item_name: '공기청정기',
    sort_order: 3,
  },
  {
    season: 'spring',
    title: '봄맞이 대청소 체크리스트',
    content: '에어컨 필터 청소, 냉장고 정리, 욕실 곰팡이 제거를 한 번에 진행하세요. 겨울 동안 누적된 오염을 제거하면 여름을 훨씬 쾌적하게 시작할 수 있습니다.',
    item_name: '다용도 청소 스프레이',
    sort_order: 4,
  },

  // ─── 여름 ────────────────────────────────────────────────────────────────
  {
    season: 'summer',
    title: '에어컨 필터 청소 필수',
    content: '에어컨을 처음 켜기 전 필터를 반드시 청소하세요. 1~2주에 한 번 청소하면 전기요금을 15% 절약하고 냉방 효율을 높일 수 있습니다.',
    item_name: null,
    sort_order: 1,
  },
  {
    season: 'summer',
    title: '제습으로 곰팡이 예방',
    content: '장마철에는 습도가 80% 이상으로 올라 곰팡이가 생기기 쉽습니다. 습기 제거제를 옷장과 신발장에 넣어두고, 자주 환기해 주세요.',
    item_name: null,
    sort_order: 2,
  },
  {
    season: 'summer',
    title: '선풍기 + 에어컨 함께 활용',
    content: '선풍기와 에어컨을 함께 사용하면 냉방비를 30% 절약할 수 있습니다. 에어컨 온도를 26도로 설정하고 선풍기로 공기를 순환시켜 보세요.',
    item_name: '선풍기',
    sort_order: 3,
  },
  {
    season: 'summer',
    title: '여름 침구 교체',
    content: '냉감 이불이나 면 100% 소재로 교체하면 열대야에도 훨씬 시원하게 잘 수 있습니다. 땀을 흡수하는 면 소재 베개커버도 함께 준비하세요.',
    item_name: '이불 + 베개 세트',
    sort_order: 4,
  },

  // ─── 가을 ────────────────────────────────────────────────────────────────
  {
    season: 'fall',
    title: '보일러 시험 가동 필수',
    content: '날이 추워지기 전에 보일러 시험 가동을 해보세요. 장기간 사용하지 않으면 이상이 생길 수 있고, 집주인에게 수리 요청할 시간을 미리 확보해야 합니다.',
    item_name: null,
    sort_order: 1,
  },
  {
    season: 'fall',
    title: '문풍지·뽁뽁이로 단열',
    content: '창문 틈새에 문풍지를 붙이면 외풍을 차단해 난방비를 20~30% 절약할 수 있습니다. 창문에 에어캡(뽁뽁이)을 붙이는 것도 효과적인 단열 방법입니다.',
    item_name: null,
    sort_order: 2,
  },
  {
    season: 'fall',
    title: '겨울 이불 미리 꺼내기',
    content: '보관했던 겨울 이불을 꺼내 세탁 후 햇볕에 충분히 건조하세요. 압축 보관으로 납작해진 이불은 2~3일 환기하면 원래 볼륨을 회복합니다.',
    item_name: '이불 + 베개 세트',
    sort_order: 3,
  },
  {
    season: 'fall',
    title: '가습기 점검 & 청소',
    content: '겨울 내내 사용할 가습기를 미리 꺼내 내부를 식초물로 청소하세요. 가습기 세균은 호흡기 질환의 원인이 되므로 청결 관리가 중요합니다.',
    item_name: '가습기',
    sort_order: 4,
  },

  // ─── 겨울 ────────────────────────────────────────────────────────────────
  {
    season: 'winter',
    title: '동파 예방 필수',
    content: '영하 10도 이하 예보 시 수도꼭지를 조금 열어두거나 보일러를 외출 모드로 설정하세요. 수도관이 동파되면 수리비가 수십만 원 발생할 수 있습니다.',
    item_name: null,
    sort_order: 1,
  },
  {
    season: 'winter',
    title: '결로 방지 관리',
    content: '실내외 온도 차이가 크면 창문에 물방울이 맺히는 결로가 생깁니다. 결로 방지 필름을 붙이거나 통기성을 높이면 곰팡이 발생을 예방할 수 있습니다.',
    item_name: null,
    sort_order: 2,
  },
  {
    season: 'winter',
    title: '가습기로 실내 습도 관리',
    content: '겨울 적정 실내 습도는 40~60%입니다. 습도가 너무 낮으면 감기에 걸리기 쉽고 피부가 건조해집니다. 가습기가 없다면 젖은 수건을 널어두는 것도 효과가 있습니다.',
    item_name: '가습기',
    sort_order: 3,
  },
  {
    season: 'winter',
    title: '난방비 절약 팁',
    content: '전기장판 + 내복 조합이 에어컨보다 훨씬 저렴합니다. 보일러 온도는 20~22도로 유지하고, 외출 시 외출 모드(15도)를 활용하면 난방비를 크게 절약할 수 있습니다.',
    item_name: null,
    sort_order: 4,
  },
];
