# Apex Hotel Furniture

Apex Hotel Furniture 是一个基于 [Astro 5.0](https://astro.build) 构建的高性能酒店家具企业官网。项目集成了 Tailwind CSS、Sitemap 生成以及 SEO 优化功能。

## 🚀 快速开始

### 1. 环境要求

- Node.js v18.17.1 或更高版本
- npm (随 Node.js 安装)

### 2. 安装依赖

```bash
npm install
```

### 3. 本地开发

启动开发服务器：

```bash
npm run dev
```

访问地址：`http://localhost:4321`

### 4. 构建项目

构建生产环境版本：

```bash
npm run build
```

构建产物将生成在 `dist/` 目录下。

### 5. 本地预览

预览构建后的项目：

```bash
npm run preview
```

## 🛠️ 技术栈

- **框架**: [Astro](https://astro.build/) (v5.0)
- **样式**: [Tailwind CSS](https://tailwindcss.com/)
- **图标**: [Lucide Icons](https://lucide.dev/)
- **内容管理**: Astro Content Collections (Markdown/MDX)
- **SEO**: 自定义 TDK 配置 + Schema.org 结构化数据
- **部署**: Static Site Generation (SSG)

## 📂 项目结构

```text
/
├── public/             # 静态资源 (图片、favicon等)
├── src/
│   ├── components/     # 可复用组件 (Header, Footer等)
│   ├── content/        # 内容集合 (产品、文章 Markdown 文件)
│   ├── data/           # 静态数据配置 (config.json)
│   ├── layouts/        # 页面布局 (SEO配置、全局样式)
│   ├── pages/          # 页面路由
│   ├── utils/          # 工具函数
│   └── site.config.ts  # 站点配置入口
├── astro.config.mjs    # Astro 配置文件
├── tailwind.config.mjs # Tailwind 配置文件
└── package.json        # 项目依赖配置
```

## 🌐 部署指南

本项目配置为静态站点生成 (SSG)，可以部署到任何静态托管服务。

### 部署到 Netlify / Vercel / Cloudflare Pages

1.  将代码推送到 GitHub 仓库。
2.  在托管平台（如 Netlify）关联 GitHub 仓库。
3.  **构建设置**:
    *   **Build Command**: `npm run build`
    *   **Publish Directory**: `dist`
4.  点击部署即可。

### 部署到传统服务器 (Nginx/Apache)

1.  在本地执行 `npm run build`。
2.  将 `dist/` 目录下的所有文件上传到服务器的 Web 根目录。
3.  配置 Nginx 指向该目录即可。

## 📝 SEO 配置

项目支持精细化的 SEO 配置。在每个页面的 frontmatter 或 props 中，你可以设置：
- `title`: 页面标题
- `description`: 页面描述
- `schema`: JSON-LD 结构化数据

示例：

```astro
---
const schema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Luxury Sofa",
  // ...
};
---
<Layout title="Custom Sofa" description="Best hotel sofa" schema={schema}>
  ...
</Layout>
```

## 📄 License

MIT
