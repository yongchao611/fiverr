# Fiverr 推广网站

一个现代化、美观的 Fiverr 推广网站，包含文章管理系统。

## 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI框架**: Tailwind CSS + shadcn/ui
- **数据库**: Cloudflare D1 (SQLite)
- **部署**: Cloudflare Pages
- **语言**: TypeScript

## 功能特性

- ✅ 响应式现代化首页
- ✅ 文章列表和详情页
- ✅ 完整的管理后台
- ✅ 文章 CRUD 操作
- ✅ SEO 优化
- ✅ Fiverr 推广组件

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
pnpm install
# 或
yarn install
```

### 2. 设置 Cloudflare D1 数据库

```bash
# 创建 D1 数据库
npx wrangler d1 create fiverr-articles

# 复制返回的 database_id 到 wrangler.toml

# 执行数据库迁移
npx wrangler d1 execute fiverr-articles --file=./db/schema.sql
```

### 3. 本地开发

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 4. 部署到 Cloudflare Pages

```bash
# 构建并部署
npm run pages:build
npm run pages:deploy

# 或使用 Cloudflare 控制台连接 Git 仓库自动部署
```

## 项目结构

```
fiverr/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── articles/          # 文章页面
│   ├── admin/             # 管理后台
│   └── api/               # API 路由
├── components/            # React 组件
├── lib/                   # 工具函数
└── db/                    # 数据库配置
```

## 环境变量

创建 `.env.local` 文件：

```env
# 可选：如果需要认证
ADMIN_PASSWORD=your-password-here
```

## 🚀 部署到 Cloudflare

### 📚 部署文档导航

**👉 查看 [DEPLOYMENT_INDEX.md](./DEPLOYMENT_INDEX.md) 选择适合你的部署指南**

### 快速部署（5分钟）

查看 **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** 获取最快的部署方式。

### 详细部署指南

查看 **[CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)** 获取完整的分步指南，包括：

- ✅ D1 数据库创建和配置
- ✅ Cloudflare Pages 部署
- ✅ 自定义域名配置
- ✅ 常见问题排查
- ✅ 性能优化建议

### 部署前检查

使用 **[deploy-check.md](./deploy-check.md)** 检查是否准备好部署。

### 基本步骤

```bash
# 1. 创建并配置 D1 数据库
wrangler d1 create fiverr-articles
wrangler d1 execute fiverr-articles --file=./db/schema.sql

# 2. 推送到 GitHub
git push

# 3. 在 Cloudflare Dashboard 连接仓库并部署
# 或使用 CLI:
npm run pages:deploy
```

**构建配置：**
- Build command: `npm run pages:build`
- Build output directory: `.vercel/output/static`
- Environment variables: `NODE_VERSION=18`

## 许可证

MIT

