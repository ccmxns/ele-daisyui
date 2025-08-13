# 图标文件说明

此目录包含应用程序的图标文件：

## 文件说明
- `icon.png`: 用于 Linux 平台的 PNG 图标
- `icon.ico`: 用于 Windows 平台的 ICO 图标（需要手动生成）
- `icon.icns`: 用于 macOS 平台的 ICNS 图标（需要手动生成）

## 图标要求
- Windows (.ico): 至少 256x256 像素，支持多种尺寸
- macOS (.icns): 至少 512x512 像素，支持 Retina 显示
- Linux (.png): 至少 256x256 像素

## 生成说明
要生成完整的图标文件，请：

1. 确保源 PNG 图标至少为 512x512 像素
2. 使用在线工具或专业软件生成：
   - 在线转换: https://icoconvert.com/
   - 或使用 ImageMagick: `convert icon.png icon.ico`
   - 或使用 iconutil (macOS): `iconutil -c icns icon.iconset`

## 当前状态
- ✅ PNG 图标已就绪
- ⚠️  ICO 图标需要生成
- ⚠️  ICNS 图标需要生成
