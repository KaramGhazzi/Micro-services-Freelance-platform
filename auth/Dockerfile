FROM node:20-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update && apk add --no-cache libc6-compat

# Set working directory
WORKDIR /app
RUN npm i turbo@1.12.0 -g
COPY . .
RUN turbo prune --scope=@app/auth --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:20-alpine AS installer
RUN apk update && apk add --no-cache libc6-compat
WORKDIR /app

COPY .gitignore .gitignore
COPY turbo.json turbo.json

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
RUN npm install

RUN npm run build --filter=auth...

FROM node:20-alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 freelance
RUN adduser --system --uid 1001 auth
USER auth

COPY --from=installer --chown=auth:freelance /app .
ENV NODE_ENV production

EXPOSE 3000

CMD npm run start:prod --prefix apps/auth
