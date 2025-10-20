# ❓ Cloudflare 部署常见问题

## 🤔 我应该选择哪种部署方式？

### 👉 推荐：Cloudflare Dashboard（网页界面）

**适合人群：**
- ✅ 第一次部署
- ✅ 喜欢可视化界面
- ✅ 不熟悉命令行

**优点：**
- 界面友好，步骤清晰
- 可以直观看到配置
- 自动 Git 集成
- 不需要记忆命令

**缺点：**
- 需要在网页上操作
- 配置不能脚本化

---

### 👨‍💻 进阶：Wrangler CLI（命令行）

**适合人群：**
- ✅ 熟悉命令行
- ✅ 需要自动化部署
- ✅ 多项目管理

**优点：**
- 快速高效
- 可以脚本化
- 本地预览测试
- 直接管理数据库

**缺点：**
- 需要学习命令
- 配置在终端完成

---

## 🗄️ 关于 D1 数据库

### Q: D1 是什么？
**A:** Cloudflare 的 SQLite 数据库服务，全球分布式，免费额度很大。

### Q: 为什么要用 D1？
**A:** 
- ✅ 免费（每天 100,000 次读取）
- ✅ 快速（全球边缘网络）
- ✅ 简单（SQLite 语法）
- ✅ 可靠（自动备份）

### Q: 我的数据安全吗？
**A:** 是的！Cloudflare 会自动备份，数据存储在全球多个位置。

### Q: 如何备份数据？
```bash
wrangler d1 export fiverr-articles --output backup.sql
```

---

## 💰 费用问题

### Q: Cloudflare Pages 收费吗？

**A:** 免费额度非常慷慨：

**Cloudflare Pages（免费）：**
- ✅ 无限请求
- ✅ 无限带宽
- ✅ 500 次构建/月
- ✅ 100 GB-hours/月

**Cloudflare D1（免费）：**
- ✅ 5 GB 存储
- ✅ 100,000 次读取/天（每月 300万+）
- ✅ 50,000 次写入/天（每月 150万+）

**对于个人或中小型网站，完全免费！** 🎉

### Q: 什么情况下会收费？

**A:** 只有超出免费额度才会收费：
- Pages: 超过 500 次构建/月
- D1: 超过免费读写次数

对于这个 Fiverr 推广网站，基本不可能超出。

---

## 🚀 部署问题

### Q: 首次部署需要多久？

**A:** 
- 准备工作：5分钟
- D1 数据库创建：1分钟
- 首次构建：3-5分钟
- **总计：约 10 分钟**

后续更新只需要 2-3 分钟。

### Q: 每次更新都要重新部署吗？

**A:** 不需要！配置好后：
```bash
git add .
git commit -m "Update"
git push
```
Cloudflare 会自动检测并部署。

### Q: 可以预览更改吗？

**A:** 可以！创建 Pull Request，Cloudflare 自动创建预览部署。

---

## ⚠️ 错误排查

### Q: 构建失败：`Module not found`

**原因：** 依赖未正确安装

**解决：**
```bash
# 删除并重新安装依赖
rm -rf node_modules package-lock.json
npm install
git add .
git commit -m "Fix dependencies"
git push
```

### Q: 数据库错误：`DB is not defined`

**原因：** D1 数据库未绑定或绑定名称错误

**解决：**
1. 检查 D1 绑定的 Variable name 是否为 `DB`（大写）
2. 确保已执行 `schema.sql`
3. 绑定后需要重新部署

### Q: API 返回 404

**原因：** 构建配置错误

**解决：**
确保构建配置：
- Build command: `npm run pages:build`
- Build output: `.vercel/output/static`

### Q: 图片无法显示

**原因：** 图片优化配置问题

**解决：**
检查 `next.config.js`：
```javascript
images: {
  unoptimized: true,
}
```

### Q: 样式丢失或错乱

**解决：**
```bash
# 重新构建
npm run build
git push
```

---

## 🌐 域名问题

### Q: 必须使用 .pages.dev 域名吗？

**A:** 不，可以配置自定义域名：
- `fiverr.yourdomain.com`
- `www.yourdomain.com`
- `yourdomain.com`

### Q: 如何配置自定义域名？

**A:** 
1. Pages 项目 → **Custom domains**
2. 添加域名
3. 配置 DNS（CNAME 记录）
4. 等待生效（5-30分钟）

### Q: 需要购买域名吗？

**A:** 
- 使用 `.pages.dev`：不需要
- 自定义域名：需要（推荐 Cloudflare Registrar、Namecheap 等）

---

## 🔒 安全问题

### Q: 管理后台需要密码吗？

**A:** 当前版本没有密码保护。建议：
- 不要分享 `/admin` 链接
- 可以自行添加认证（NextAuth.js）
- Cloudflare Access 可以添加访问控制

### Q: 数据会被别人看到吗？

**A:** 
- 前台文章：公开的（设计如此）
- 数据库：只有你能访问
- 管理后台：建议添加认证

### Q: HTTPS 默认开启吗？

**A:** 是的！Cloudflare 自动提供 HTTPS 证书。

---

## 📊 性能问题

### Q: 网站会很慢吗？

**A:** 不会！Cloudflare 有全球 CDN：
- 静态资源全球分发
- 就近访问，速度很快
- D1 数据库边缘网络

### Q: 能承受多少访问量？

**A:** 
- Pages：无限请求
- D1：每天 100,000 次读取

对于个人网站，绰绰有余！

### Q: 如何优化性能？

**A:** 
- 压缩图片（< 2MB）
- 使用 Auto Format 减小 HTML
- 定期清理旧文章
- 使用 WebP 格式图片

---

## 🔄 更新和维护

### Q: 如何更新文章？

**A:** 
1. 访问 `/admin`
2. 编辑文章
3. 保存 - 立即生效！

无需重新部署。

### Q: 如何更新代码？

**A:** 
```bash
# 修改代码
git add .
git commit -m "Update feature"
git push
```
自动重新部署。

### Q: 如何回滚到旧版本？

**A:** 
Cloudflare Dashboard:
1. **Deployments** → 选择稳定版本
2. **"..."** → **Rollback to this deployment**

---

## 🛠️ 高级功能

### Q: 可以添加评论系统吗？

**A:** 可以！推荐集成：
- Disqus
- Giscus（基于 GitHub Discussions）
- Utterances

### Q: 可以添加搜索功能吗？

**A:** 可以！可以：
- 前端搜索（简单）
- Cloudflare Workers + D1（完整）
- Algolia（第三方服务）

### Q: 可以导出文章吗？

**A:** 可以！
```bash
wrangler d1 execute fiverr-articles --command "SELECT * FROM articles" --json > articles.json
```

### Q: 可以导入文章吗？

**A:** 可以！编写 SQL 插入语句：
```sql
INSERT INTO articles (title, excerpt, content, ...) VALUES (...);
```

---

## 📱 移动端

### Q: 网站支持手机访问吗？

**A:** 完全支持！响应式设计：
- 手机
- 平板
- 电脑
- 各种屏幕尺寸

### Q: 可以在手机上管理文章吗？

**A:** 可以！访问 `/admin` 管理。

---

## 🎓 学习资源

### Q: 我对 Next.js 不熟悉，能部署吗？

**A:** 能！按照指南操作即可，不需要了解 Next.js。

### Q: 想深入学习，推荐什么？

**A:** 
- [Next.js 官方文档](https://nextjs.org/docs)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Cloudflare D1 文档](https://developers.cloudflare.com/d1/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)

### Q: 可以修改代码吗？

**A:** 当然！这是你的项目：
- 修改样式
- 添加功能
- 自定义内容
- 随意发挥！

---

## 📞 获取更多帮助

### 本项目文档
- **[README.md](./README.md)** - 项目概述
- **[QUICK_DEPLOY.md](./QUICK_DEPLOY.md)** - 5分钟快速部署
- **[CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)** - 完整部署指南
- **[DEPLOY_STEPS.md](./DEPLOY_STEPS.md)** - 可视化流程
- **[USAGE_GUIDE.md](./USAGE_GUIDE.md)** - 使用指南
- **[IMAGE_INSERT_GUIDE.md](./IMAGE_INSERT_GUIDE.md)** - 图片插入指南

### 社区资源
- [Cloudflare Community](https://community.cloudflare.com/)
- [Cloudflare Discord](https://discord.gg/cloudflaredev)
- [Next.js Discord](https://nextjs.org/discord)

---

## 💡 小提示

**快速查找答案：**
1. 先看 [QUICK_DEPLOY.md](./QUICK_DEPLOY.md)
2. 遇到问题查本 FAQ
3. 详细步骤看 [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md)
4. 还不行？查看 Cloudflare 文档

**最常见问题：**
1. ✅ 数据库绑定（Variable name: `DB`）
2. ✅ 绑定后需要重新部署
3. ✅ 构建配置要正确

**记住这三点，90% 的问题都能解决！** 🎯

---

**🎉 祝你部署顺利！有问题随时查阅这些指南。**


