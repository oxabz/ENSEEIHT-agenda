FROM node:16-alpine AS front-build
WORKDIR /app
COPY frontend/ ./
RUN ls
RUN ["yarn", "install"]
RUN ["yarn", "run", "build"]
RUN ls

FROM node:16-alpine
WORKDIR /app
COPY backend/ ./
COPY --from=front-build /app/dist/ ./public
RUN ["yarn", "install"]
EXPOSE 3030
CMD ["yarn", "run", "start"]