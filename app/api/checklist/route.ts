// Phase 2 소셜 로그인 도입 시 서버 저장 구현 예정
// 현재 MVP는 localStorage 기반으로 클라이언트에서 관리됩니다
// key: 'jachwibox_checklist_{roomType}', value: Record<itemId, boolean>

export async function GET() {
  return Response.json(
    {
      message: '현재 체크 상태는 브라우저 localStorage에 저장됩니다. 소셜 로그인 도입 후 서버 저장으로 전환될 예정입니다.',
    },
    { status: 200 }
  );
}

export async function POST() {
  return Response.json(
    {
      message: '현재 체크 상태는 브라우저 localStorage에 저장됩니다. 소셜 로그인 도입 후 서버 저장으로 전환될 예정입니다.',
    },
    { status: 200 }
  );
}
