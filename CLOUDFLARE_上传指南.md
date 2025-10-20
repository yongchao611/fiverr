# 📦 Cloudflare Pages 上传指南

## ⚠️ 重要：不要上传 node_modules！

Cloudflare Pages 会**自动安装依赖**，你**不需要上传** `node_modules` 文件夹。

---

## 🎯 方法一：使用 Git（推荐）⭐

这是最简单、最标准的方式：

### 步骤：

```bash
# 1. 初始化 Git（如果还没有）
git init

# 2. 添加所有文件（.gitignore 会自动排除不需要的文件）
git add .

# 3. 提交
git commit -m "Initial commit"

# 4. 推送到 GitHub/GitLab
# 先在 GitHub/GitLab 创建仓库，然后：
git remote add origin https://github.com/你的用户名/你的仓库.git
git push -u origin main
```

### 然后在 Cloudflare：

1. 登录 Cloudflare Dashboard
2. 进入 Pages
3. 点击 "Connect to Git"
4. 选择你的仓库
5. 配置构建设置（见下方）
6. 点击 "Save and Deploy"

**✅ 完成！Cloudflare 会自动构建和部署。**

---

## 🎯 方法二：直接上传（手动压缩）

如果不想使用 Git，可以手动上传：

### 需要上传的文件/文件夹：

```
✅ 必须上传：
├── app/              # Next.js 页面
├── components/       # React 组件
├── db/              # 数据库脚本
├── lib/             # 工具函数
├── public/          # 静态文件（如果有）
├── .gitignore
├── .cfignore
├── next.config.js
├── package.json     # 依赖列表
├── package-lock.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── wrangler.toml
└── components.json

📚 可选（文档）：
├── *.md            # 所有文档文件

❌ 不要上传：
├── node_modules/   # 依赖包（自动安装）
├── .next/         # 构建缓存（自动生成）
├── *.db           # 数据库文件（在 Cloudflare 创建）
```

### 压缩步骤：

#### Windows:
```powershell
# 方法 1：使用 PowerShell 脚本
Compress-Archive -Path app,components,db,lib,*.json,*.js,*.ts,*.md,wrangler.toml,.gitignore -DestinationPath fiverr-deploy.zip

# 方法 2：手动选择
# 1. 新建一个临时文件夹
# 2. 复制上述"必须上传"的文件和文件夹
# 3. 右键 -> 发送到 -> 压缩文件
```

**压缩后大小应该 < 1 MB！**

---

## ⚙️ Cloudflare Pages 构建配置

### 在 Cloudflare Dashboard 配置：

```
Framework preset: Next.js

Build command: 
npm run pages:build

Build output directory: 
.vercel/output/static

Root directory: 
(留空)

Environment variables:
NODE_VERSION = 18
```

### 环境变量（如果需要）：
```
NODE_VERSION = 18
NEXT_TELEMETRY_DISABLED = 1
```

---

## 📊 文件大小检查

### 检查当前项目大小（不含 node_modules）：

```powershell
# PowerShell
Get-ChildItem -Recurse -File | Where-Object { 
    $_.FullName -notlike '*node_modules*' -and 
    $_.FullName -notlike '*.next*' -and
    $_.FullName -notlike '*.db*'
} | Measure-Object -Property Length -Sum
```

**正常大小应该在 0.5-1 MB 左右。**

---

## 🎯 完整部署流程（推荐）

### 使用 Wrangler CLI（最简单）：

```bash
# 1. 登录 Cloudflare
npx wrangler login

# 2. 创建 D1 数据库
npx wrangler d1 create fiverr-articles

# 3. 更新 wrangler.toml 中的 database_id

# 4. 初始化数据库
npx wrangler d1 execute fiverr-articles --file=./db/schema.sql --remote

# 5. 构建并部署
npm run pages:build
npx wrangler pages deploy .vercel/output/static --project-name=your-project-name
```

**✅ 完成！项目已部署。**

---

## ❓ 常见问题

### Q: 为什么我的压缩文件有几百MB？
A: 你包含了 `node_modules` 文件夹。删除它重新压缩。

### Q: 数据库文件需要上传吗？
A: 不需要。数据库在 Cloudflare D1 上创建，不是文件。

### Q: .next 文件夹需要吗？
A: 不需要。Cloudflare 会重新构建。

### Q: 哪些文件是必须的？
A: 只需要源代码（app/、components/、lib/等）和配置文件（package.json、wrangler.toml等）。

---

## ✅ 快速检查清单

上传前确认：

- [ ] **没有** node_modules 文件夹
- [ ] **没有** .next 文件夹  
- [ ] **没有** .db 文件
- [ ] **有** package.json（依赖列表）
- [ ] **有** wrangler.toml（配置文件）
- [ ] **有** app/ components/ lib/ 等源代码文件夹
- [ ] 压缩文件 < 2 MB

---

**🎉 按照这个指南，你的项目肯定能在 25MB 以内（实际只有约 1MB）！**

