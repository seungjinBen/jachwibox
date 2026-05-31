import { IconShieldCheck } from '@tabler/icons-react';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#0A1A0D',
        borderTop: '1px solid #142018',
      }}
      className="mt-auto"
    >
      <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-3">
        <div className="flex items-start gap-2">
          <IconShieldCheck size={14} style={{ color: '#4A7C59', flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: '12px', color: '#4A7C59', lineHeight: '1.5' }}>
            이 서비스는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span style={{ fontSize: '11px', color: '#3A5C40' }}>자취박스</span>
          <span style={{ fontSize: '11px', color: '#3A5C40' }}>
            © 2026 자취박스. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
