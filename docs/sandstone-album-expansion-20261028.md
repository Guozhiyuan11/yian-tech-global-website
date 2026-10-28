# 砂岩相册扩充记录

日期：2026-10-28。

已审查原素材库1854张照片，去除完全重复后1708张。本次选用386张不同照片，组成30个相册：10个颜色/纹理、3个设计集合、17个产品/场景。照片可跨相册复用，1073次相册关联不等于独立图片数量。

每页24张，英西双语各54个相册分页；全站构建114页。相册支持点击放大、前后切换、键盘关闭和带照片参考的定制询盘。

| 相册 | 照片数 |
| --- | ---: |
| red | 36 |
| yellow-woodgrain | 24 |
| golden-yellow | 24 |
| patterned-yellow | 8 |
| grey | 24 |
| cream-beige | 24 |
| grey-green | 24 |
| red-woodgrain | 18 |
| chocolate | 13 |
| black | 24 |
| carved-reliefs | 71 |
| shaped-pieces | 72 |
| architecture-reference | 36 |
| sample-panels | 64 |
| surface-details | 104 |
| blocks-slabs | 97 |
| profiles-mouldings | 72 |
| columns-balustrades | 27 |
| capitals-bases | 11 |
| basins-planters | 9 |
| floral-reliefs | 38 |
| geometric-reliefs | 24 |
| narrative-reliefs | 14 |
| animal-carving | 16 |
| figures-statues | 5 |
| paving-steps | 15 |
| wall-cladding | 19 |
| facades | 24 |
| garden-settings | 20 |
| packing-production | 116 |

生成：使用Pillow运行 `scripts/prepare_sandstone_albums.py`，然后 `npm run build`。原图位于忽略目录 `.source-review/sandstone-20261028/originals/`。

验证：构建成功，114个HTML的本地链接及图片目标存在；相册页单H1、无重复ID、UTF-8正常。桌面和390像素手机已验证分页、语言对应、放大切换和关闭焦点恢复，无横向溢出。最终部署状态见外层 `docs/主站Cloudflare发布记录.md`。
