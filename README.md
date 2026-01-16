# AlibabaPuHuiTi_WebFonts
本仓库是 [阿里巴巴普惠体3.0](https://www.alibabafonts.com/#/font) 的web分发字体，使用cn-font-split工具进行分割

## 使用方式
1. css文件引入，可以按需只引入需要的。
```css
<!-- 阿里巴巴普惠体 v3.0 Regular -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/linyin022/AlibabaPuHuiTi_WebFonts@main/dist/AlibabaPuHuiTi-3-Regular.css">

<!-- 阿里巴巴普惠体 v3.0 Medium -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/linyin022/AlibabaPuHuiTi_WebFonts@main/dist/AlibabaPuHuiTi-3-Medium.css">

<!-- 阿里巴巴普惠体 v3.0 Bold -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/linyin022/AlibabaPuHuiTi_WebFonts@main/dist/AlibabaPuHuiTi-3-Bold.css">
```

2. 应用字体样式，浏览器会根据所显示文字、粗细动态加载资源。
```css
body {
  font-family: "AlibabaPuHuiTi-3-Regular", sans-serif;
}
head {
    font-family: "AlibabaPuHuiTi-3-Bold", sans-serif;
}
```