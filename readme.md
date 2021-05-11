# 自用文章置顶轮播图插件

&emsp;&emsp;本插件仅为方便自己学习使用，在作者原有插件的基础上进行修改，添加自己所需要的功能，以达到自己想要的效果。如有需求，还请使用原作者插件(当时fork的时候原作者插件版本为 1.1.1)。

- 原作者插件项目

<table>
    <tr>
        <td align="center">参考项目</td>
        <td align="center">项目地址</td>
    </tr>
    <tr>
        <td align="left">Zfour/hexo-swiper-bar</td>
        <td align="left"><a href="https://github.com/Zfour/hexo-swiper-bar" target="_blank">https://github.com/Zfour/hexo-swiper-bar</td>
    </tr>
</table>

- 参考博客

<table>
    <tr>
        <td align="center">参考博客</td>
        <td align="center">博客文章</td>
    </tr>
    <tr>
        <td align="left">小冰博客</td>
        <td align="left"><a href="https://zfe.space/post/hexo-swiper.html" target="_blank">教程：hexo-swiper 文章置顶插件</td>
    </tr>
    <tr>
        <td align="left">Akilarの糖果屋</td>
        <td align="left"><a href="https://akilar.top/posts/8e1264d1/" target="_blank">基于 swiper 的首页置顶轮播图</td>
    </tr>
</table>

# hexo-qidaink-swiper_bar

## 安装

```shell
npm i hexo-qidaink-swiper_bar
```

## 更新
```shell
npm i hexo-qidaink-swiper_bar@latest
```

## 配置

&emsp;&emsp;具体的配置可以查看参考博客中的博主文章，因为本插件是从冰老师的插件修改而来，所以配置就是按照冰老师的来的。

&emsp;&emsp;由于自己使用的是 NexT 主题，所以本来是想适配到 NexT 的，但是对于搞硬件的我来说，这个还是有点小难，只是解决了插件对于 pjax 的适配(当时 fork 冰老师的插件的时候，冰老师的插件产生的文章轮播图框是正常的，但是点击其中链接，会导致全局刷新，对于 aplayer 就比较的不友好)，后边准备考研，所以就先记录在这里把，以后有空再进行修改。

&emsp;&emsp;在站点配置文件`_config`中添加以下内容:
```yaml
swiper:
  enable: true
  priority: 2
  enable_page: /
  layout:
    type: id
    name: recent-posts
    index: 0
  temple_html: '<div class="recent-post-item" style="height: auto;width: 100%"><div class="blog-slider swiper-container-fade swiper-container-horizontal" id="swiper_container">${temple_html_item}</div></div>'
  plus_style: ""
```

## 使用

&emsp;&emsp;在 Front-matter 添加以下参数即可，index 数字越大越靠前展示。

```markdown
swiper_index: 8
swiper_desc: 文章描述
swiper_cover: /images/xxx.jpg
```