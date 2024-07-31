# 빌드 스테이지
FROM node:20-alpine AS builder
WORKDIR /app

# 의존성 설치 (캐시 활용)
COPY package*.json ./
RUN npm install -g pnpm@latest
RUN pnpm install

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# 실행 스테이지
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# 필요한 파일만 복사
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]