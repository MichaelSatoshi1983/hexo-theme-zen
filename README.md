# hexo-theme-zen
## 禅 - Hexo极简主题

---

功能简单，但是文件超小，不开评论功能每个页面只加载**15kb**左右

配置文件参考`_config.zen.yml`

支持`Twikoo`和`beaudar`评论功能

支持在文章正文后添加 GitHub 风格的 Emaction 表情反应。将下面配置加入站点的 `_config.zen.yml`，并设置自己的 Emaction Worker 地址：

```yaml
emaction:
  enable: true
  endpoint: https://your-emaction-worker.workers.dev
  availableArrayString: "👍,thumbs-up;😄,smile-face;🎉,party-popper;😕,confused-face;❤️,heart;🚀,rocket;👀,eyes;👎,thumbs-down;"
```

每篇文章使用自己的 `page.path` 作为反应目标 ID。表情选择框会靠近笑脸按钮展开，并根据视口空间调整位置。组件颜色读取 Zen 主题变量，并随主题切换同步变化和过渡。

支持在页脚显示 Cloudflare Worker 提供的访问统计。配置示例：

```yaml
site_stats:
  enable: true
  endpoint: https://pv.eth0.bond
  time_zone: Asia/Shanghai
```

页脚会在每次页面加载时发送一次统计请求，不会定时轮询。PV 为服务部署后的累计页面加载次数；UV 为所选时区内按浏览器每日去重的访客数。浏览器标识每天轮换并发送到 Worker 做哈希；原始访客 IP 不写入 D1。若禁用此功能，将 `enable` 设为 `false`。

正确的高亮配置
```yaml
highlight:
  enable: true
  line_number: false
  auto_detect: false
  tab_replace: ''
  wrap: false
  hljs: true
prismjs:
  enable: false
```
