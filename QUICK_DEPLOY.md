# ⚡ 5分钟快速部署到 Cloudflare

## 🎯 最简部署流程

### 第一步：创建数据库（2分钟）

```bash
# 1. 安装并登录
npm install -g wrangler
wrangler login

# 2. 创建数据库
wrangler d1 create fiverr-articles
```

**⚠️ 重要：** 复制输出的 `database_id`

### 第二步：更新配置（1分钟）

打开 `wrangler.toml`，替换 `database_id`：

```toml
[[d1_databases]]
binding = "DB"
database_name = "fiverr-articles"
database_id = "粘贴你的-database-id"  # ⬅️ 替换这里
```

### 第三步：初始化数据库（30秒）

```bash
wrangler d1 execute fiverr-articles --file=./db/schema.sql
```

### 第四步：推送到 GitHub（1分钟）

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

### 第五步：Cloudflare 部署（1.5分钟）

1. 访问：https://dash.cloudflare.com
2. **Workers & Pages** → **Create application** → **Pages**
3. **Connect to Git** → 选择你的仓库
4. **Begin setup**
5. 填写配置：

```
Build command: npm run pages:build
Build output directory: .vercel/output/static
```

6. **Save and Deploy**

### 第六步：绑定数据库（30秒）

部署完成后：

1. **Settings** → **Functions** → **D1 database bindings**
2. **Add binding:**
   - Variable name: `DB`
   - D1 database: `fiverr-articles`
3. **Save**
4. **Deployments** → 点击最新部署 → **Retry deployment**

---

## ✅ 完成！

您的网站现在已上线：`https://你的项目名.pages.dev`

---

## 🔧 如果遇到问题

### 问题：构建失败
```bash
# 环境变量中添加
NODE_VERSION = 18
```

### 问题：数据库不工作
确保：
- D1 绑定的 Variable name 是 `DB`（大写）
- 已执行 schema.sql
- 绑定后重新部署

### 问题：API 404
确保：
- Build command: `npm run pages:build`
- Build output: `.vercel/output/static`

---

## 📚 详细指南

需要更详细的说明？查看：
- **CLOUDFLARE_DEPLOYMENT.md** - 完整部署指南
- **deploy-check.md** - 部署检查清单

---

**🚀 祝部署顺利！**


