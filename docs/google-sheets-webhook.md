# 문의 → 구글 스프레드시트 자동 정리 설정

Contact 폼에 들어온 문의를 구글 스프레드시트에 한 줄씩 자동으로 쌓는 방법입니다.
별도 서버 없이 **Google Apps Script 웹앱**을 웹훅으로 사용합니다.

## 1. 스프레드시트 만들기

1. [sheets.new](https://sheets.new) 로 새 구글 스프레드시트 생성
2. 첫 행(헤더)에 다음을 입력 (선택 — Apps Script가 없으면 자동 추가):
   `제출시각 | 도메인 | 이메일 | 회사명 | 관심 서비스 | 예산 | 메시지`

## 2. Apps Script 붙여넣기

상단 메뉴 **확장 프로그램 → Apps Script** 에서 기존 코드를 지우고 아래를 붙여넣습니다.

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000); // 동시 제출 시 행 꼬임 방지
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('문의') || ss.insertSheet('문의');

    // 헤더가 없으면 한 번만 생성
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['제출시각', '도메인', '이메일', '회사명', '관심 서비스', '예산', '메시지']);
    }

    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.submittedAt || new Date(),
      data.domain || '',
      data.email || '',
      data.company || '',
      data.services || '',
      data.budget || '',
      data.message || ''
    ]);

    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('error: ' + err);
  } finally {
    lock.releaseLock();
  }
}
```

## 3. 웹앱으로 배포

1. 우측 상단 **배포 → 새 배포**
2. 유형 선택(톱니바퀴) → **웹 앱**
3. 설정:
   - 실행 주체: **나(본인 계정)**
   - 액세스 권한: **모든 사용자**  ← 폼이 외부에서 호출하므로 반드시 이 옵션
4. **배포** 클릭 → 권한 승인 → **웹 앱 URL** 복사
   (형식: `https://script.google.com/macros/s/AKfyc.../exec`)

## 4. 사이트에 URL 연결

- 로컬: 프로젝트 루트 `.env` 에 추가
  ```
  VITE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec
  ```
- 배포(Vercel): 프로젝트 → Settings → Environment Variables 에 같은 키/값 추가 후 재배포

## 5. 동작 확인

- `npm run dev` 후 `/contact` 폼을 제출 → 스프레드시트 '문의' 시트에 새 행이 추가되면 정상.
- 값이 비어 있다면: 배포 액세스 권한이 '모든 사용자'인지, URL 끝이 `/exec` 인지 확인.

## 참고

- 폼은 `mode: "no-cors"` 로 전송하므로 브라우저에서 응답 본문은 읽지 않습니다(기록은 정상 처리됨).
- 시트 기록 실패가 사용자 제출 흐름(성공 화면)을 막지 않도록 설계되어 있습니다.
- Apps Script를 수정하면 **새 배포(또는 기존 배포 관리 → 버전 업데이트)** 를 해야 반영됩니다.
- 이 채널은 텔레그램/Supabase 채널과 독립적으로 동작합니다. 시트만 쓰려면 다른 채널 환경변수는 비워 두면 됩니다.
