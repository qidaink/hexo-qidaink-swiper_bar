/* =====================================================================
* FileInstructions：文章置顶轮播图js实现文件
* Repository: https://github.com/Zfour/hexo-swiper-bar
* RelatedLinks: https://www.swiper.com.cn/
* Author: Zfour
* Modify: qidaink
* Instructions: 仅供自己学习使用，如有需求，还请使用作者原插件
* =====================================================================*/
/* global hexo */

'use strict';  /* 启用strict模式 */

/* ------------------------------------------------------------------ */
/* 过滤器的优先级 priority，值越低，过滤器会越早执行 */
function priority_swiper(){
    var priority = 0
    if(hexo.config.swiper.priority){
        priority = hexo.config.swiper.priority
    }
    else{
        priority = 0
    }
    return priority
}

/* ------------------------------------------------------------------ */
/* 使用 after_generate 过滤器（必须是生成文件之后才行） */
hexo.extend.filter.register('after_generate',function() {
    var swiper_cfg = hexo.config.swiper;
    
    if(swiper_cfg.enable == false) return;

    var layout_name ='';
    var layout_type ='';
    var layout_index =0;
    var temple = swiper_cfg.temple_html.split("${temple_html_item}") /* ${temple_html_item} 作为一个字符串，用于分割字符串 */
    layout_name = swiper_cfg.layout.name;    /* 将代码片段插入的地方的名字标识 */
    layout_type = swiper_cfg.layout.type;    /* type 表示标识的类型 可以为  id 和 class ，id是唯一的，更加方便查找 */
    layout_index =  swiper_cfg.layout.index; /* 定义 class 的时候会出现多个 class 的情况，这时就需要使用 index，确定是哪一个 */

    var get_layout = '';
    if (layout_type == 'class'){                      /* type 为 class */
        /* 返回一个包含了所有指定类名的子元素的类数组对象。当在 document 对象上调用时，会搜索整个DOM文档，包含根节点。
        也可以在任意元素上调用getElementsByClassName() 方法，它将返回的是以当前元素为根节点，所有指定类名的子元素。*/
        get_layout =  `document.getElementsByClassName('${ layout_name }')[${ layout_index }]`;
    }
    else if (layout_type == 'id'){                   /* type 为 id */
        /* getElementById()返回一个匹配特定 ID的元素，由于元素的 ID 在大部分情况下要求是独一无二的，
        这个方法自然而然地成为了一个高效查找特定元素的方法。*/
        get_layout =  `document.getElementById('${ layout_name }')`; 
    }
    else {                                           /* type 默认的情况为 id */
        get_layout =  `document.getElementById('${layout_name}')`
    }

    var temple_html_item = '';
    var item = '';
    var posts_list = hexo.locals.get('posts').data; /* 获取文章的所有信息，主要是为了获得Front-matter中的参数,决定了该插件必须使用 after_generate 过滤器 */
    var new_posts_list =[];
    for (item of posts_list){
        if(item.swiper_index && item.swiper_desc){
            new_posts_list.push(item);             /* push() 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。*/             
        }
    }
    /* 返回两个元素的差值 */
    function sortNumber(a,b){                    
        return a.swiper_index - b.swiper_index
    }
    new_posts_list = new_posts_list.sort(sortNumber); /* arr.sort([compareFunction]) compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前 */
    new_posts_list = new_posts_list.reverse(); /* reverse() 方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。*/

    for (item of new_posts_list){
        if(item.swiper_index && item.swiper_desc){
            temple_html_item += `<div class="blog-slider__item swiper-slide" style="width: 750px; opacity: 1; transform: translate3d(0px, 0px, 0px); transition-duration: 0ms"><div class="blog-slider__img"><img src="${ item.swiper_cover||item.cover }" alt="${ item.swiper_cover||item.cover }"/></div><div class="blog-slider__content"><span class="blog-slider__code">${ item.date.format('YYYY-MM-DD') }</span><a class="blog-slider__title" href="${ item.path }">${ item.title }</a><div class="blog-slider__text">${ item.swiper_desc }</div><a class="blog-slider__button" href="${ item.path }">详情</a></div></div>`;
        }
    }

    /* 拼接要插入的 html 片段 */
    var temple_html =`${ temple[0] }<div class="blog-slider__wrp swiper-wrapper" style="transition-duration: 0ms">${ temple_html_item }</div><div class="blog-slider__pagination swiper-pagination-clickable swiper-pagination-bullets"></div>${ temple[1] }`;

    var script_text = ` <script data-pjax>
                            if(${get_layout} && location.pathname =='${ swiper_cfg.enable_page }'){
                                var parent = ${ get_layout };
                                var child = '${ temple_html }';
                                console.log('swiper-bar加载成功');
                                parent.insertAdjacentHTML("afterbegin",child);
                                <!-- Inside a callback or Promise that runs after new DOM content has been inserted -->
                                <!-- 以下语句是为了适配 pjax，由于插入 html 片段发生在 pjax 初始化之后，所以此链接中的 a 标签跳转会导致全局页面刷新，而以下的 refresh() 函数可以很好的解决这个问题 -->
                                var newContent = document.querySelector("#recent-posts");
                                pjax.refresh(newContent);
                            }
                        </script>
                        <!-- Swiper JS -->
                        <script data-pjax src = "https://unpkg.com/swiper@6.5.9/swiper-bundle.js"></script>
                        <!-- Initialize Swiper -->
                        <script data-pjax src = "https://unpkg.com/hexo-qidaink-swiper_bar/src/swiper-init.js"></script>
                        <style>${swiper_cfg.plus_style}</style>`;
    hexo.extend.injector.register('head_end',`<!-- Link Swiper's CSS -->
                                              <link rel="stylesheet" href = "https://unpkg.com/swiper@6.5.9/swiper-bundle.css">
                                              <link rel="stylesheet" href="https://unpkg.com/hexo-qidaink-swiper_bar/src/swiperbar.css">
                                             `, "default");
    hexo.extend.injector.register('body_end',script_text, "default");
},priority_swiper())