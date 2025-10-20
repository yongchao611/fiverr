# 🚀 Git 部署完整指南（Windows 最佳方案）

## ⚠️ 为什么推荐 Git 方式？

您在 Windows 上遇到的问题：
1. ❌ `@cloudflare/next-on-pages` 在 Windows 不工作
2. ❌ 动态路由需要复杂配置
3. ❌ 本地构建容易出错

**✅ Git 方式的优点：**
- 自动构建，Cloudflare 处理一切
- 自动部署，推送代码即可
- 稳定可靠，不受操作系统限制
- 版本控制，方便回滚

---

## 📋 完整步骤（10分钟）

### 步骤 1：安装 Git（如果还没安装）

1. 访问 https://git-scm.com/download/win
2. 下载并安装 Git for Windows
3. 安装时保持默认选项即可

### 步骤 2：初始化 Git 仓库（1分钟）

在 PowerShell 中执行：

```powershell
cd d:\cursorproject\fiverr

# 初始化 Git
git init

# 配置用户信息（首次使用需要）
git config --global user.name "您的名字"
git config --global user.email "您的邮箱"

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Fiverr promo website"
```

---

### 步骤 3：创建 GitHub 仓库（2分钟）

#### 3.1 访问 GitHub

1. 打开 https://github.com
2. 登录您的账号（如果没有账号，先注册一个）

#### 3.2 创建新仓库

1. 点击右上角 **+** → **New repository**
2. 填写信息：
   ```
   Repository name: fiverr-promo
   Description: Fiverr promotion website
   Privacy: Private（推荐）或 Public
   ```
3. **不要**勾选 "Initialize this repository with a README"
4. 点击 **Create repository**

#### 3.3 复制仓库地址

创建成功后，会看到一个 HTTPS 地址，类似：
```
https://github.com/你的用户名/fiverr-promo.git
```

**复制这个地址！**

---

### 步骤 4：推送代码到 GitHub（2分钟）

在 PowerShell 中执行（替换为您的仓库地址）：

```powershell
# 关联远程仓库
git remote add origin https://github.com/你的用户名/fiverr-promo.git

# 推送代码
git branch -M main
git push -u origin main
```

**第一次推送会要求登录 GitHub**，输入用户名和密码（或使用 Personal Access Token）

---

### 步骤 5：连接 Cloudflare 到 GitHub（3分钟）

#### 5.1 访问 Cloudflare Dashboard

1. 打开 https://dash.cloudflare.com
2. 点击 **Workers & Pages**

#### 5.2 删除旧项目（如果有）

如果之前创建了 fiverr 或 fiverr-da8 项目：
1. 点击项目
2. Settings → 底部 **Delete project**
3. 确认删除

#### 5.3 创建新的 Pages 项目

1. 点击 **Create application**
2. 选择 **Pages** 标签
3. 点击 **Connect to Git**
4. 选择 **GitHub**
5. 点击 **Authorize Cloudflare Pages**（授权）
6. 在弹出窗口选择：
   - **All repositories** 或
   - **Only select repositories** → 选择 `fiverr-promo`
7. 点击 **Install & Authorize**

#### 5.4 配置构建设置

1. 选择 `fiverr-promo` 仓库
2. 点击 **Begin setup**
3. 填写配置：

```
Project name: fiverr-promo

Production branch: main

Framework preset: Next.js

Build command: npm run pages:build

Build output directory: .vercel/output/static

Root directory: (留空)
```

4. 点击 **Environment variables (advanced)** → **Add variable**
   ```
   Variable name: NODE_VERSION
   Value: 18
   ```

5. 点击 **Save and Deploy**

---

### 步骤 6：等待构建完成（3-5分钟）

Cloudflare 会自动：
1. 拉取代码
2. 安装依赖
3. 构建项目
4. 部署网站

**查看进度：**
- 在部署页面可以看到实时日志
- 等待状态变为 **✅ Success**

---

### 步骤 7：配置数据库绑定（2分钟）

#### 7.1 创建 D1 数据库

1. 在 Cloudflare Dashboard
2. Workers & Pages → **D1**
3. **Create database**
4. 数据库名：`fiverr-articles`
5. 点击创建

#### 7.2 初始化数据库

1. 点击 `fiverr-articles` 数据库
2. 点击 **Console** 标签
3. 粘贴以下 SQL 并执行：

```sql
CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  coverImage TEXT,
  published INTEGER DEFAULT 0,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_created ON articles(createdAt DESC);
```

#### 7.3 绑定到项目

1. 回到 Pages 项目：Workers & Pages → fiverr-promo
2. Settings → Functions
3. D1 database bindings → Add binding
   ```
   Variable name: DB
   D1 database: fiverr-articles
   ```
4. Save

#### 7.4 重新部署

1. Deployments 标签
2. 点击最新部署的 **Retry deployment**

---

### 步骤 8：访问您的网站 🎉

```
https://fiverr-promo.pages.dev
https://fiverr-promo.pages.dev/articles
https://fiverr-promo.pages.dev/admin
```

**恭喜！部署成功！** 🎊

---

## 🔄 以后如何更新网站

每次修改代码后：

```powershell
cd d:\cursorproject\fiverr

# 查看修改
git status

# 添加修改的文件
git add .

# 提交
git commit -m "描述您的修改"

# 推送
git push
```

**Cloudflare 会自动重新部署！**

---

## ❓ 常见问题

### Q: git push 要求输入密码？

A: GitHub 不再支持密码，需要使用 Personal Access Token：

1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token
4. 勾选 `repo` 权限
5. 复制 token
6. 使用 token 代替密码

或使用 SSH 密钥（推荐）。

### Q: 找不到 "Connect to Git" 选项？

A: 确保：
1. 在 **Pages** 标签（不是 Workers）
2. 点击 **Create application**
3. 应该看到 "Connect to Git" 选项

### Q: GitHub 授权失败？

A: 
1. 检查网络连接
2. 清除浏览器缓存重试
3. 使用 GitHub 账号登录

### Q: 构建失败怎么办？

A: 
1. 查看构建日志找到错误
2. 常见原因：
   - 依赖版本冲突
   - 环境变量未设置
   - 构建命令错误

---

## 📊 完整命令总结

```powershell
# Git 设置
cd d:\cursorproject\fiverr
git init
git config --global user.name "您的名字"
git config --global user.email "您的邮箱"
git add .
git commit -m "Initial commit"

# 推送到 GitHub
git remote add origin https://github.com/你的用户名/fiverr-promo.git
git branch -M main
git push -u origin main

# 以后更新
git add .
git commit -m "更新说明"
git push
```

---

## ✨ 成功标志

### 看到这些就说明成功了：

1. ✅ GitHub 仓库有您的代码
2. ✅ Cloudflare 部署状态为 Success
3. ✅ 网站可以正常访问
4. ✅ 数据库绑定成功

---

**🎉 Git 方式是最稳定的，推荐使用！**

