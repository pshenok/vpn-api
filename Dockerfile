FROM node:16 as build
WORKDIR /app
COPY package.json pnpm-lock.yaml tsconfig.json ./
RUN pnpm install
COPY ./src ./src
COPY ./prisma ./prisma
RUN pnpm build
RUN NOYARNPOSTINSTALL=1 pnpm install --prod


FROM node:16 AS release
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
RUN ls -la /app
RUN ls -la /app/dist

USER node

CMD [ "node", "dist/index.js" ]
