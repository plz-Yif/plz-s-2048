# 2048游戏 - 安卓应用打包指南

## 项目简介
这是一个经典的2048游戏，使用纯HTML、CSS和JavaScript开发，并配置为PWA（Progressive Web App）。

## 如何在安卓手机上安装

### 方法一：直接添加到主屏幕（推荐）
1. 在安卓手机上打开Chrome浏览器
2. 访问游戏的URL（如果在本地运行，需要将项目部署到Web服务器）
3. 点击Chrome浏览器右上角的三个点菜单
4. 选择"添加到主屏幕"
5. 按照提示完成安装过程
6. 安装完成后，游戏将出现在手机主屏幕上，就像原生应用一样

### 方法二：使用PWA Builder生成APK文件
1. 访问 [PWA Builder](https://www.pwabuilder.com/)
2. 在输入框中输入游戏的URL（如果在本地运行，需要将项目部署到Web服务器）
3. 点击"Start"按钮
4. PWA Builder会分析你的PWA配置
5. 点击"Build My PWA"按钮
6. 在生成的构建结果中，找到"Android"部分
7. 点击"Download APK"按钮下载APK文件
8. 将APK文件传输到你的安卓手机上
9. 在手机上安装APK文件（需要启用"未知来源"安装权限）

## 项目结构
```
2048/
├── index.html         # 游戏主页面
├── style.css          # 游戏样式
├── script.js          # 游戏核心逻辑
├── manifest.json      # PWA配置文件
├── service-worker.js  # PWA离线缓存功能
├── icon.svg           # 游戏图标
├── package.json       # 项目配置文件
└── README.md          # 项目说明文件
```

## 游戏功能
- 经典2048游戏玩法
- 支持键盘方向键操作
- 支持触摸屏滑动操作
- 分数统计和最高分保存
- 游戏胜利和结束检测
- 响应式设计，适配不同屏幕尺寸
- 离线访问功能

## 技术特点
- 使用纯HTML、CSS和JavaScript开发，无需依赖任何框架
- 实现了PWA功能，支持离线访问
- 响应式设计，适配各种屏幕尺寸
- 流畅的动画效果和交互体验
- 本地存储最高分，保持游戏进度

## 如何本地运行
1. 安装Node.js和npm
2. 运行 `npm install` 安装依赖
3. 运行 `npm start` 启动本地服务器
4. 在浏览器中访问 `http://localhost:8000`
