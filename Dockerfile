# 使用 Node.js 作为基础镜像
FROM node:14-alpine

# 设置工作目录
WORKDIR /app

# 复制项目文件到工作目录
COPY . .

# 安装项目依赖
RUN npm install

# 构建生产环境代码
RUN npm run build

# 设置运行时环境变量
ENV NODE_ENV=production

# 暴露运行端口
EXPOSE 7070

# 运行应用程序
CMD [ "npm", "start" ]
