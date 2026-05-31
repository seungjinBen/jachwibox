import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = '자취박스 — 첫 자취 필수템 체크리스트';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0D1F12',
          fontFamily: '-apple-system, sans-serif',
          padding: '60px',
        }}
      >
        {/* 심볼 아이콘 */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 24,
            backgroundColor: '#142018',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 36,
            border: '2px solid #1A3020',
          }}
        >
          <svg width="60" height="60" viewBox="0 0 44 44">
            <g transform="translate(22, 22)">
              <polyline
                points="-16,6 0,-14 16,6"
                fill="none"
                stroke="#4A7C59"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="-13"
                y="6"
                width="26"
                height="18"
                rx="2"
                fill="none"
                stroke="#4A7C59"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <rect x="-5" y="11" width="10" height="13" rx="1.5" fill="#4A7C59" />
              <polyline
                points="-11,8 -7,13 -1,5"
                fill="none"
                stroke="#E8F2EA"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="4"
                y="8"
                width="6"
                height="6"
                rx="1"
                fill="none"
                stroke="#4A7C59"
                strokeWidth="1.5"
              />
            </g>
          </svg>
        </div>

        {/* 서비스명 */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: '#E8F2EA',
            letterSpacing: '-2px',
            marginBottom: 24,
            lineHeight: 1,
          }}
        >
          자취박스
        </div>

        {/* 서브텍스트 */}
        <div
          style={{
            fontSize: 30,
            color: '#6B8F72',
            textAlign: 'center',
            lineHeight: 1.6,
            maxWidth: 800,
          }}
        >
          첫 자취, 뭐부터 사야 할지 막막하죠?
          <br />
          방 유형별 · 계절별 필수템을 한눈에
        </div>

        {/* 하단 URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            fontSize: 22,
            color: '#3A5C40',
            letterSpacing: '0.5px',
          }}
        >
          jachwibox.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
