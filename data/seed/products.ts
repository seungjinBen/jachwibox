export interface SeedProduct {
  item_name: string;
  type: 'budget' | 'performance' | 'design';
  name: string;
  reason: string;
  price: number;
  coupang_url: string;
}

function searchUrl(query: string): string {
  return `https://www.coupang.com/np/search?q=${encodeURIComponent(query)}`;
}

export const PRODUCTS: SeedProduct[] = [
  // ─── 냄비 세트 ──────────────────────────────────
  { item_name: '냄비 세트', type: 'budget',      name: '로이체 3구 냄비 세트',         reason: '1~2만원대에 3가지 사이즈 구성, 가스·IH 모두 호환',       price: 19800, coupang_url: searchUrl('냄비 세트 가성비') },
  { item_name: '냄비 세트', type: 'performance', name: '해피콜 IH 스텐 냄비 세트',      reason: '전층 스테인리스로 열 분산 균일, 10년 이상 쓸 수 있는 내구성', price: 32000, coupang_url: searchUrl('냄비 세트 IH 스텐') },
  { item_name: '냄비 세트', type: 'design',       name: '테팔 인제니오 손잡이 분리 냄비', reason: '손잡이 탈착으로 오븐·식기세척기 사용 가능, 수납 절반으로 줄어듦', price: 34900, coupang_url: searchUrl('테팔 인제니오 냄비') },

  // ─── 프라이팬 ────────────────────────────────────
  { item_name: '프라이팬', type: 'budget',      name: '키친아트 황토 코팅 프라이팬 24cm', reason: '1만원대에 황토 코팅으로 밀착력 좋고 코팅 벗겨짐 없음',       price: 13900, coupang_url: searchUrl('프라이팬 가성비 코팅') },
  { item_name: '프라이팬', type: 'performance', name: '해피콜 다이아몬드 IH 프라이팬 28cm', reason: '다이아몬드 코팅 10겹, 스크래치에 강하고 열 전달이 고르게 됨', price: 39000, coupang_url: searchUrl('해피콜 다이아몬드 프라이팬') },
  { item_name: '프라이팬', type: 'design',       name: '르크루제 논스틱 프라이팬',          reason: '감각적인 색상과 고급 마감, 주방 인테리어를 살려주는 팬',     price: 42000, coupang_url: searchUrl('르크루제 프라이팬') },

  // ─── 도마 + 칼 세트 ──────────────────────────────
  { item_name: '도마 + 칼 세트', type: 'budget',      name: '실리쿡 항균 도마 + 삼덕 칼 세트', reason: '항균 도마와 다목적 칼 조합, 자취 시작 세트로 딱 맞음',  price: 12000, coupang_url: searchUrl('도마 칼 세트 자취') },
  { item_name: '도마 + 칼 세트', type: 'performance', name: '조셉조셉 인덱스 도마 세트',        reason: '용도별 도마 4종 구성, 교차 오염 방지로 위생 걱정 없음', price: 28000, coupang_url: searchUrl('조셉조셉 도마 세트') },

  // ─── 수세미 + 주방세제 ───────────────────────────
  { item_name: '수세미 + 주방세제', type: 'budget',      name: '3M 스카치브라이트 수세미 10개입 + 트리오 세제 세트', reason: '국민 수세미에 세제 포함, 가성비 최강 조합으로 오래 쓸 수 있음', price: 5900, coupang_url: searchUrl('스카치브라이트 수세미 주방세제 세트') },
  { item_name: '수세미 + 주방세제', type: 'performance', name: '오리지널 퐁퐁 + 씽크대 수세미 세트',               reason: '기름기 제거력이 탁월한 퐁퐁, 거품 한 방울로 설거지 끝',       price: 7800, coupang_url: searchUrl('퐁퐁 주방세제 수세미 세트') },

  // ─── 전자레인지 ──────────────────────────────────
  { item_name: '전자레인지', type: 'budget',      name: 'LG 전자레인지 MW23BG 23L', reason: 'LG 신뢰도에 23L 용량, 혼자 쓰기 충분하고 가격도 착함', price: 65000, coupang_url: searchUrl('전자레인지 소형 가성비') },
  { item_name: '전자레인지', type: 'performance', name: '삼성 솔로 전자레인지 23L',  reason: '자동 조리 10종 내장, 처음 자취하는 사람도 버튼 하나로 요리', price: 99000, coupang_url: searchUrl('삼성 전자레인지 솔로') },

  // ─── 밥솥 ────────────────────────────────────────
  { item_name: '밥솥', type: 'budget',      name: '쿠쿠 CR-0351F 3인용 전기밥솥', reason: '3인용 소형으로 1인 가구에 딱, 보온 기능으로 언제든 따뜻한 밥', price: 35000, coupang_url: searchUrl('쿠쿠 소형 밥솥 1인 가구') },
  { item_name: '밥솥', type: 'performance', name: '쿠쿠 IH 전기압력밥솥 6인용',    reason: 'IH 방식으로 솥밥 느낌, 압력 기능으로 잡곡도 부드럽게',   price: 68000, coupang_url: searchUrl('쿠쿠 IH 압력밥솥') },

  // ─── 샤워 호스 + 헤드 ────────────────────────────
  { item_name: '샤워 호스 + 헤드', type: 'budget',      name: '대림바스 샤워 호스 + 헤드 세트',   reason: '7천원대 국내 브랜드, 표준 규격으로 어디서나 바로 교체 가능',       price: 7900,  coupang_url: searchUrl('샤워 호스 헤드 세트') },
  { item_name: '샤워 호스 + 헤드', type: 'performance', name: '한샘 절수형 샤워헤드 + 호스 세트',  reason: '절수 기능으로 수도세 절약, 수압 약한 집에서도 시원한 샤워감',       price: 18000, coupang_url: searchUrl('절수 샤워헤드 세트') },
  { item_name: '샤워 호스 + 헤드', type: 'design',       name: '아메리칸스탠다드 레인샤워 세트',    reason: '호텔 느낌의 레인샤워 헤드, 욕실 분위기를 한 번에 업그레이드',       price: 21900, coupang_url: searchUrl('레인샤워 헤드 세트') },

  // ─── 욕실 매트 ───────────────────────────────────
  { item_name: '욕실 매트', type: 'budget',      name: '규조토 욕실 매트',            reason: '빠른 건조로 미끄럼 방지 효과 탁월, 곰팡이 걱정 없는 규조토 소재', price: 9900,  coupang_url: searchUrl('규조토 욕실 매트') },
  { item_name: '욕실 매트', type: 'performance', name: '이케아 TOFTBO 매트',           reason: '두꺼운 소재로 발이 편안하고 세탁기 세탁 가능',                     price: 15000, coupang_url: searchUrl('이케아 욕실 매트') },
  { item_name: '욕실 매트', type: 'design',       name: '패브릭 욕실 매트 그레이',      reason: '심플 컬러로 화장실 인테리어와 잘 어울리는 감성 매트',              price: 18000, coupang_url: searchUrl('패브릭 욕실 매트 감성') },

  // ─── 청소 솔 + 변기 클리너 ───────────────────────
  { item_name: '청소 솔 + 변기 클리너', type: 'budget',      name: '욕실 청소 솔 + 변기 클리너 세트', reason: '한 세트로 욕실 전체 청소 해결, 공간 절약형 디자인', price: 6500,  coupang_url: searchUrl('변기솔 욕실 청소 세트') },
  { item_name: '청소 솔 + 변기 클리너', type: 'performance', name: '스크러빙버블 변기 세제 + 교체형 솔', reason: '세제 효과 강력, 솔 교체형으로 위생적으로 계속 사용 가능',  price: 11000, coupang_url: searchUrl('스크러빙버블 변기 클리너') },

  // ─── 샤워 커튼 ───────────────────────────────────
  { item_name: '샤워 커튼', type: 'budget',      name: '방수 샤워 커튼 + 링 고리 세트', reason: '방수 PEVA 소재에 고리 포함, 설치 5분이면 완료',        price: 12000, coupang_url: searchUrl('샤워커튼 방수 고리 세트') },
  { item_name: '샤워 커튼', type: 'performance', name: '듀얼 레이어 EVA 샤워 커튼',     reason: '이중 구조로 물 튀김 차단 완벽, 두꺼운 소재라 오래 사용', price: 25000, coupang_url: searchUrl('샤워커튼 EVA 방수') },

  // ─── 수건 세트 ───────────────────────────────────
  { item_name: '수건 세트', type: 'budget',      name: '면 무지 수건 5매 세트',     reason: '넉넉한 5매 구성, 흡수력 우수하고 가성비 최강',           price: 12000, coupang_url: searchUrl('수건 세트 가성비 5매') },
  { item_name: '수건 세트', type: 'performance', name: '극세사 속건 타월 세트 3매', reason: '극세사 소재로 빠른 건조와 뛰어난 흡수력, 세탁 후 빠르게 마름', price: 18000, coupang_url: searchUrl('극세사 수건 세트') },
  { item_name: '수건 세트', type: 'design',       name: '호텔 컬렉션 수건 세트',     reason: '두꺼운 호텔급 소재에 감성 색상, 욕실을 고급스럽게 연출',   price: 28000, coupang_url: searchUrl('호텔 수건 세트') },

  // ─── 이불 + 베개 세트 ────────────────────────────
  { item_name: '이불 + 베개 세트', type: 'budget',      name: '한일 극세사 이불 + 베개 세트', reason: '3만원대에 이불과 베개 모두 포함, 세탁기 세탁 가능',           price: 35000, coupang_url: searchUrl('이불 베개 세트 가성비') },
  { item_name: '이불 + 베개 세트', type: 'performance', name: '덕다운 구스 이불 + 호텔 베개',  reason: '구스다운 충전재로 가볍고 보온성 탁월, 10년 이상 사용 가능', price: 78000, coupang_url: searchUrl('구스다운 이불 세트 싱글') },
  { item_name: '이불 + 베개 세트', type: 'design',       name: '워싱코튼 이불 세트 감성',       reason: '워싱 텍스처로 부드럽고 컬러 선택 가능, 방 분위기 완성',     price: 55000, coupang_url: searchUrl('워싱코튼 이불 세트') },

  // ─── 매트리스 커버 ───────────────────────────────
  { item_name: '매트리스 커버', type: 'budget',      name: '방수 매트리스 프로텍터 싱글', reason: '방수 처리로 매트리스 오염 완벽 차단, 세탁기 세탁 가능',    price: 17000, coupang_url: searchUrl('방수 매트리스 커버 싱글') },
  { item_name: '매트리스 커버', type: 'performance', name: '100% 면 매트리스 패드 싱글',  reason: '면 소재로 통기성 우수하고 피부 자극 없음, 쿠션감도 추가됨', price: 35000, coupang_url: searchUrl('면 매트리스 패드 싱글') },

  // ─── 암막 커튼 ───────────────────────────────────
  { item_name: '암막 커튼', type: 'budget',      name: '블랙아웃 암막 커튼 2폭 세트', reason: '99% 차광으로 낮잠도 꿀잠, 커튼 고리 포함으로 바로 설치 가능',  price: 23000, coupang_url: searchUrl('암막 커튼 가성비') },
  { item_name: '암막 커튼', type: 'performance', name: '3중 레이어 완전 암막 커튼',    reason: '완전 차광 + 소음 차단 + 단열 기능 3가지를 한 번에 해결',         price: 45000, coupang_url: searchUrl('암막 커튼 소음차단 단열') },
  { item_name: '암막 커튼', type: 'design',       name: '린넨 블렌드 암막 커튼',        reason: '자연스러운 린넨 패턴으로 감성 인테리어, 암막 기능도 충실',        price: 38000, coupang_url: searchUrl('린넨 암막 커튼 감성') },

  // ─── 수납 선반 ───────────────────────────────────
  { item_name: '수납 선반', type: 'budget',      name: '철제 3단 수납 선반',      reason: '3만원 이하에 수납 공간 즉시 확보, 조립 10분이면 완료', price: 18000, coupang_url: searchUrl('수납 선반 3단 철제') },
  { item_name: '수납 선반', type: 'performance', name: '이동형 바퀴 수납 선반',    reason: '바퀴 달린 이동형으로 청소할 때 쉽게 이동 가능',         price: 36000, coupang_url: searchUrl('수납 선반 바퀴 이동식') },

  // ─── 옷걸이 + 행거 ───────────────────────────────
  { item_name: '옷걸이 + 행거', type: 'budget',      name: '벨벳 옷걸이 30개 + 소형 파이프 행거', reason: '벨벳 옷걸이로 옷 미끄럼 방지, 행거 조합으로 옷장 없이도 충분', price: 15000, coupang_url: searchUrl('벨벳 옷걸이 행거 자취') },
  { item_name: '옷걸이 + 행거', type: 'performance', name: '스테인리스 H형 옷 행거',              reason: '녹 안 슬고 무게 감당 좋은 스텐 소재, 수납 카트 추가 가능',      price: 25000, coupang_url: searchUrl('스테인리스 옷 행거 H형') },
  { item_name: '옷걸이 + 행거', type: 'design',       name: '원목 스탠드 행거',                    reason: '인테리어 소품으로도 활용되는 감성 원목 행거',                    price: 32000, coupang_url: searchUrl('원목 행거 스탠드 감성') },

  // ─── 무선 청소기 ─────────────────────────────────
  { item_name: '무선 청소기', type: 'budget',      name: '드리미 V8 무선 청소기',     reason: '5만원대 가성비 코드리스, 원룸 청소는 충분한 흡입력',           price: 55000, coupang_url: searchUrl('무선 청소기 가성비 코드리스') },
  { item_name: '무선 청소기', type: 'performance', name: '다이슨 V8 Animal 무선청소기', reason: '압도적인 흡입력과 60분 배터리, 한 번 쓰면 못 돌아가는 퀄리티', price: 189000, coupang_url: searchUrl('다이슨 무선청소기') },

  // ─── 공기청정기 ──────────────────────────────────
  { item_name: '공기청정기', type: 'budget',      name: '샤오미 미에어 공기청정기 3C', reason: 'HEPA 필터 탑재에 가성비 1위, 스마트폰 연동으로 편리하게 제어', price: 89000,  coupang_url: searchUrl('샤오미 공기청정기 3C') },
  { item_name: '공기청정기', type: 'performance', name: '블루에어 Blue Pure 공기청정기', reason: '60㎡ 커버, 초저소음으로 수면 중에도 가동 가능',               price: 250000, coupang_url: searchUrl('블루에어 공기청정기') },

  // ─── 가습기 ──────────────────────────────────────
  { item_name: '가습기', type: 'budget',      name: '필립스 초음파 가습기 HU4806', reason: '조용하고 관리 쉬운 초음파 방식, 2만원대 가성비',           price: 25000, coupang_url: searchUrl('필립스 초음파 가습기') },
  { item_name: '가습기', type: 'performance', name: '코웨이 자연기화 가습기 CH-050N', reason: '자연기화 방식으로 백필름 없고 세균 번식 최소화',             price: 68000, coupang_url: searchUrl('코웨이 자연기화 가습기') },

  // ─── 선풍기 ──────────────────────────────────────
  { item_name: '선풍기', type: 'budget',      name: '신일 전기선풍기 14인치 SIF-F14',  reason: '검증된 국민 선풍기, 조용하고 원룸 용량에 충분한 바람',   price: 32000, coupang_url: searchUrl('신일 선풍기 14인치') },
  { item_name: '선풍기', type: 'performance', name: '보국 DC모터 타워팬 35W',           reason: 'DC모터로 전기세 절약, 수면풍 포함 12단 풍속 조절 가능', price: 78000, coupang_url: searchUrl('DC모터 타워팬 선풍기') },

  // ─── 세탁 세제 ───────────────────────────────────
  { item_name: '세탁 세제', type: 'budget',      name: '피죤 센서티브 액체세제 2.5L', reason: '대용량 2.5L로 2~3달 사용 가능, 저자극 성분으로 손빨래도 OK', price: 7500,  coupang_url: searchUrl('피죤 액체세제 대용량') },
  { item_name: '세탁 세제', type: 'performance', name: '테크 드럼세탁기용 세제 3L',   reason: '드럼세탁기 최적화, 헹굼 잔여물 적어 피부 자극 없음',        price: 13000, coupang_url: searchUrl('테크 세탁세제 드럼세탁기') },

  // ─── 휴지 ────────────────────────────────────────
  { item_name: '휴지', type: 'budget',      name: '깨끗한나라 두루마리 30롤', reason: '30롤 대용량 초기 구비용, 한 달 반 이상 쓸 수 있는 분량', price: 6500, coupang_url: searchUrl('두루마리 휴지 30롤 대용량') },
  { item_name: '휴지', type: 'performance', name: '유한킴벌리 스카트 3겹 30롤', reason: '3겹 두꺼운 고급 두루마리, 부드러운 사용감과 풍부한 흡수력', price: 9800, coupang_url: searchUrl('유한킴벌리 스카트 3겹 휴지') },

  // ─── 쓰레기통 ────────────────────────────────────
  { item_name: '쓰레기통', type: 'budget',      name: '분리수거 쓰레기통 3종 세트',      reason: '분리수거 필수 3종 세트로 한 번에 해결, 공간 절약형 슬림 디자인', price: 8900,  coupang_url: searchUrl('분리수거 쓰레기통 세트 3개') },
  { item_name: '쓰레기통', type: 'performance', name: '심플휴먼 스텝 쓰레기통 45L',       reason: '발 터치 뚜껑으로 냄새 완벽 차단, 안쪽 봉투 교체도 편리',       price: 18000, coupang_url: searchUrl('심플휴먼 쓰레기통') },
  { item_name: '쓰레기통', type: 'design',       name: '무인양품 스타일 슬림 쓰레기통 2종', reason: '깔끔한 화이트 디자인으로 원룸 인테리어와 잘 어울림',             price: 15000, coupang_url: searchUrl('슬림 쓰레기통 화이트 인테리어') },

  // ─── 다용도 청소 스프레이 ────────────────────────
  { item_name: '다용도 청소 스프레이', type: 'budget',      name: '가그린 다목적 스프레이 클리너 2종', reason: '주방, 욕실, 가구 모두 사용 가능한 만능 세제, 2개 구성',   price: 5500,  coupang_url: searchUrl('다용도 청소 스프레이 가성비') },
  { item_name: '다용도 청소 스프레이', type: 'performance', name: '3M 다용도 스프레이 클리너',          reason: '기름때·물때 제거력 탁월, 향기 좋고 헹굼 없이 닦아내기 가능', price: 12000, coupang_url: searchUrl('3M 다용도 클리너 스프레이') },
];
