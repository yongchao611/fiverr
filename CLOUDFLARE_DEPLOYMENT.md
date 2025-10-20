# 🚀 Cloudflare Pages 部署完整指南

## 📋 部署前准备

### 1. 确保代码已推送到 GitHub

```bash
# 初始化 Git（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Fiverr promo website"

# 创建 GitHub 仓库后，连接远程仓库
git remote add origin https://github.com/your-username/your-repo-name.git

# 推送代码
git push -u origin main
```

---

## 🗄️ 第一步：创建 Cloudflare D1 数据库

### 1. 安装 Wrangler CLI

```bash
npm install -g wrangler
```

### 2. 登录 Cloudflare

```bash
wrangler login
```

浏览器会打开，按照提示登录您的 Cloudflare 账号。

### 3. 创建 D1 数据库

```bash
wrangler d1 create fiverr-articles
```

**记录输出的信息！** 类似：

```
✅ Successfully created DB 'fiverr-articles'!

[[d1_databases]]
binding = "DB"
database_name = "fiverr-articles"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # ⬅️ 记住这个ID！
```

### 4. 更新 wrangler.toml

将 `wrangler.toml` 中的 `database_id` 替换为上面的实际ID：

```toml
[[d1_databases]]
binding = "DB"
database_name = "fiverr-articles"
database_id = "你的-实际-database-id"  # ⬅️ 替换这里
```

### 5. 初始化数据库表

```bash
wrangler d1 execute fiverr-articles --file=./db/schema.sql
```

### 6. （可选）添加示例数据

```bash
wrangler d1 execute fiverr-articles --file=./db/seed.sql
```

---

## 🌐 第二步：部署到 Cloudflare Pages

### 方法 A：通过 Cloudflare Dashboard（推荐）

#### 1. 登录 Cloudflare Dashboard

访问：https://dash.cloudflare.com

#### 2. 创建 Pages 项目

1. 点击左侧菜单 **"Workers & Pages"**
2. 点击 **"Create application"**
3. 选择 **"Pages"** 标签
4. 点击 **"Connect to Git"**

#### 3. 连接 GitHub 仓库

1. 授权 Cloudflare 访问您的 GitHub
2. 选择您的仓库（fiverr-promo-website）
3. 点击 **"Begin setup"**

#### 4. 配置构建设置

填写以下信息：

```
Project name: fiverr-promo-website
Production branch: main
Framework preset: Next.js
Build command: npm run pages:build
Build output directory: .vercel/output/static
Root directory: /
```

**Environment variables（环境变量）：**
```
NODE_VERSION = 18
NODE_ENV = production
```

#### 5. 保存并部署

点击 **"Save and Deploy"**

⏳ 等待 3-5 分钟，首次构建...

#### 6. 绑定 D1 数据库

构建完成后：

1. 进入您的 Pages 项目
2. 点击 **"Settings"**
3. 点击 **"Functions"**
4. 滚动到 **"D1 database bindings"**
5. 点击 **"Add binding"**
   - Variable name: `DB`
   - D1 database: 选择 `fiverr-articles`
6. 点击 **"Save"**

#### 7. 重新部署

绑定数据库后需要重新部署：

1. 进入 **"Deployments"** 标签
2. 点击最新部署右侧的 **"..."**
3. 选择 **"Retry deployment"**

---

### 方法 B：通过 Wrangler CLI

```bash
# 构建项目
npm run pages:build

# 部署
npm run pages:deploy
```

---

## ✅ 第三步：验证部署

### 1. 访问网站

Cloudflare 会给您一个 URL，类似：
```
https://fiverr-promo-website.pages.dev
```

### 2. 测试功能

- ✅ 访问首页
- ✅ 查看文章列表
- ✅ 访问管理后台
- ✅ 创建测试文章
- ✅ 检查数据库是否工作

---

## 🎯 第四步：配置自定义域名（可选）

### 1. 添加自定义域名

在 Cloudflare Pages 项目中：

1. 点击 **"Custom domains"**
2. 点击 **"Set up a custom domain"**
3. 输入您的域名（例如：`fiverr.yourdomain.com`）
4. 按照提示配置 DNS

### 2. DNS 配置

在您的域名 DNS 设置中添加：

```
Type: CNAME
Name: fiverr (或 @ for root domain)
Target: fiverr-promo-website.pages.dev
Proxy status: Proxied (橙色云朵)
```

### 3. 等待 DNS 生效

通常需要 5-30 分钟。

---

## 🔧 常见问题排查

### 问题 1：构建失败

**错误：** `Module not found` 或 `Cannot find module`

**解决：**
```bash
# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install

# 提交更改
git add .
git commit -m "Fix dependencies"
git push
```

### 问题 2：数据库连接错误

**错误：** `DB is not defined`

**解决：**
1. 确保 D1 数据库已创建
2. 确保在 Pages Settings → Functions 中绑定了数据库
3. Variable name 必须是 `DB`（大写）
4. 重新部署项目

### 问题 3：API 路由 404

**错误：** `/api/articles` 返回 404

**解决：**
1. 确保构建命令是 `npm run pages:build`
2. 确保输出目录是 `.vercel/output/static`
3. 检查 `next.config.js` 配置

### 问题 4：图片无法显示

**错误：** 图片显示失败或 base64 图片不工作

**解决：**
```javascript
// next.config.js 中确保有：
images: {
  unoptimized: true,
}
```

### 问题 5：样式错误或缺失

**解决：**
```bash
# 重新构建 Tailwind CSS
npm run build

# 推送更改
git push
```

---

## 📊 监控和管理

### 查看部署日志

在 Cloudflare Dashboard：
1. **Deployments** → 选择部署
2. 查看 **Build log**

### 查看函数日志

```bash
wrangler pages deployment tail
```

### 管理数据库

#### 查看数据

```bash
wrangler d1 execute fiverr-articles --command "SELECT * FROM articles"
```

#### 备份数据库

```bash
wrangler d1 export fiverr-articles --output backup.sql
```

#### 恢复数据库

```bash
wrangler d1 execute fiverr-articles --file=backup.sql
```

---

## 🔄 更新网站

每次更新代码后：

```bash
# 1. 提交更改
git add .
git commit -m "Update: description"
git push

# 2. Cloudflare 会自动检测并重新部署
```

查看部署状态：
- 访问 Cloudflare Dashboard
- 进入您的 Pages 项目
- 查看 **Deployments** 标签

---

## 💰 费用说明

### Cloudflare Pages（免费额度）

- ✅ **无限请求**
- ✅ **无限带宽**
- ✅ **500 次构建/月**
- ✅ **并发构建：1个**

### Cloudflare D1（免费额度）

- ✅ **5 GB 存储**
- ✅ **100,000 次读取/天**
- ✅ **50,000 次写入/天**

**对于中小型网站，完全免费！** 🎉

---

## 🎓 最佳实践

### 1. 环境变量管理

在 Cloudflare Pages Settings → Environment variables 添加：

```
Production:
  NODE_ENV = production
  
Preview:
  NODE_ENV = preview
```

### 2. 预览部署

每个 Pull Request 自动创建预览部署：
- 测试新功能
- 查看变更效果
- 合并前验证

### 3. 回滚

如果新部署有问题：

1. **Deployments** → 找到稳定版本
2. 点击 **"..."** → **"Rollback to this deployment"**

### 4. 性能优化

```bash
# 优化图片
- 压缩后再上传
- 使用 WebP 格式
- 保持文件小于 2MB

# 优化代码
- 使用 Auto Format 减少 HTML 大小
- 定期清理未使用的文章
```

### 5. 安全建议

```bash
# 1. 添加管理员密码保护（可选）
# 2. 定期备份数据库
# 3. 使用 HTTPS（Cloudflare 自动提供）
# 4. 启用 Cloudflare 安全功能
```

---

## 📞 获取帮助

### Cloudflare 资源

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Cloudflare D1 文档](https://developers.cloudflare.com/d1/)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)

### 社区支持

- [Cloudflare Community](https://community.cloudflare.com/)
- [Discord](https://discord.gg/cloudflaredev)

---

## 🎉 完成！

您的网站现在已部署到 Cloudflare！

**访问地址：** `https://your-project.pages.dev`

**后续步骤：**
1. ✅ 添加更多文章
2. ✅ 配置自定义域名
3. ✅ 优化 SEO
4. ✅ 监控网站性能
5. ✅ 分享您的网站！

---

**🚀 祝部署顺利！如有问题随时查看此指南。**



