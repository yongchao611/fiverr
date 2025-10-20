-- Create articles table
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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_created ON articles(createdAt DESC);

-- Insert sample article (optional)
INSERT INTO articles (title, slug, excerpt, content, coverImage, published, createdAt, updatedAt)
VALUES (
  '欢迎使用 Fiverr 推广网站',
  'welcome-to-fiverr-promo',
  '这是您的第一篇文章！了解如何使用 Fiverr 找到最好的自由职业者。',
  '<h2>欢迎来到 Fiverr 推广中心！</h2>
<p>感谢您使用我们的平台。这是一个示例文章，展示了文章系统的功能。</p>

<h3>Fiverr 是什么？</h3>
<p>Fiverr 是全球领先的自由职业服务市场，连接着数百万的买家和卖家。无论您需要设计、开发、营销还是写作服务，Fiverr 都能帮助您找到合适的专业人才。</p>

<h3>为什么选择 Fiverr？</h3>
<ul>
  <li>超过 500 万专业卖家</li>
  <li>700+ 服务类别</li>
  <li>固定价格，透明收费</li>
  <li>安全支付保障</li>
  <li>24/7 客户支持</li>
</ul>

<h3>如何开始？</h3>
<ol>
  <li>访问 <a href="https://www.fiverr.com" target="_blank">Fiverr.com</a></li>
  <li>浏览服务分类</li>
  <li>选择合适的卖家</li>
  <li>下单并开始项目</li>
</ol>

<blockquote>
  "Fiverr 让我找到了完美的设计师，价格合理，质量出色！" - 满意客户
</blockquote>

<p>准备好开始您的项目了吗？立即访问 Fiverr 探索无限可能！</p>',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
  1,
  datetime('now'),
  datetime('now')
);



