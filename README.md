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
