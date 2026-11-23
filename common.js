// ─────────────────────────────────────────────────────────────
// ① 여기에 Apps Script 웹앱 주소를 넣으세요 (배포 관리에서 복사, 끝이 /exec)
const API_URL = 'PUT_WEB_APP_URL';
// ─────────────────────────────────────────────────────────────

// Apps Script와 데이터만 주고받습니다. 계정 정보(쿠키)를 보내지 않으므로
// 브라우저에 Google 계정이 여러 개 로그인돼 있어도 영향이 없습니다.
async function api(action, payload) {
  if (window.MOCK_API) return window.MOCK_API(action, payload || {});
  if (API_URL.indexOf('PUT_') === 0) throw new Error('common.js에 웹앱 주소(API_URL)를 넣어 주세요.');
  const res = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(Object.assign({ action }, payload || {})),   // text/plain → 사전 요청 없이 전송
    credentials: 'omit',
    redirect: 'follow',
  });
  const j = await res.json();
  if (!j.ok) throw new Error(j.error || '처리 중 오류가 발생했습니다.');
  return j.data;
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function qs(name) { return new URLSearchParams(location.search).get(name); }
