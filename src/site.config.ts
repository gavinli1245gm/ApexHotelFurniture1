import configData from './data/config.json';

export const siteConfig = configData;

export const navLinks = [
  { name: "Home", href: "/" },
  { 
    name: "Catalog", 
    href: "/catalog",
    // 子菜单结构将在组件中通过数据文件进一步定义
  },
  { name: "Projects", href: "/projects" },
  { name: "About Us", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Contact Us", href: "/contact" },
];
