@echo off
chcp 65001 >nul
echo.
echo ============================================
echo   🔧 修复 404 错误 - 自动执行脚本
echo ============================================
echo.
echo 正在修复并推送到 GitHub...
echo.

cd /d D:\cursorproject\fiverr

echo [1/3] 添加修复的文件...
git add next.config.js 404修复指南-立即执行.md 解决404错误.md

echo [2/3] 提交修复...
git commit -m "Fix: Remove output export config to fix 404 error"

echo [3/3] 推送到 GitHub...
git push

echo.
echo ============================================
echo   ✅ 完成！
echo ============================================
echo.
echo 接下来请执行：
echo.
echo 1. 访问 https://dash.cloudflare.com
echo 2. 进入项目 fiverr-da8
echo 3. 点击 Deployments 标签
echo 4. 等待自动构建完成（3-5分钟）
echo.
echo 或者手动触发：
echo - Deployments → 点击最新部署 → Retry deployment
echo.
echo 构建完成后访问：https://fiverr-da8.pages.dev
echo.
pause

