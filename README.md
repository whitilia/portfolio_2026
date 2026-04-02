# portfolio_2026

웹 퍼블리셔 포트폴리오용 정적 사이트입니다. **Gulp**로 SCSS를 빌드하고, **BrowserSync**로 로컬에서 미리보며 수정할 수 있습니다.

## 기술 스택

- **Gulp 4** — 태스크 실행
- **Dart Sass** — SCSS 컴파일
- **PostCSS + Autoprefixer** — 벤더 프리픽스
- **BrowserSync** — 로컬 서버 및 파일 변경 시 새로고침(스타일은 스트림으로 즉시 반영)
- **sourcemaps** — 개발 시 SCSS 위치 추적

## 요구 사항

- [Node.js](https://nodejs.org/) (LTS 권장)

## 시작하기

```bash
npm install
```

### 개발 서버

```bash
npm run dev
```

`docs/`를 루트로 하는 로컬 서버가 뜨고, 터미널에 표시된 URL(기본적으로 `http://localhost:3000` 등)로 브라우저에서 확인하면 됩니다. `src`의 HTML·JS·이미지·SCSS를 저장하면 반영됩니다.

### 배포용 빌드

```bash
npm run build
```

`docs/`에 HTML, CSS, JS, 이미지가 출력됩니다. GitHub Pages는 저장소의 `main` 브랜치 `docs/` 폴더를 배포 소스로 지정하면 됩니다.

## 폴더 구조

```
src/
  index.html
  scss/
    main.scss       # 엔트리 — partial import
    _variables.scss # 색·폰트·중단점 변수
    _mixins.scss    # 반응형 믹스인
    _base.scss      # 리셋·타이포
    _layout.scss    # 레이아웃
  js/
  images/
docs/               # 빌드 결과 (GitHub Pages 배포용)
```

작업은 **`src/`**에서 하고, **`docs/`**는 생성물이므로 직접 수정하지 않는 것이 좋습니다.

## 디자인 테마

| 항목 | 값 |
|------|-----|
| 배경 | `#FFFFFF` |
| 포인트 | `#0047FF` |
| 본문 폰트 | Pretendard (CDN, `index.html`에서 로드) |
| 제목 굵기 | Extra Bold (`font-weight: 800`) |

토큰은 `src/scss/_variables.scss`에서 조정하면 됩니다.

## 스크립트

| 명령 | 설명 |
|------|------|
| `npm run dev` | `gulp` — 빌드 후 BrowserSync + watch |
| `npm run build` | `gulp build` — HTML·JS·이미지 복사 + SCSS 컴파일만 |
