import{_ as k}from"./chunks/ArticleMetadata.z59YqEIl.js";import{_ as r,p as d,a as o,v as C,C as g,y as n,e as l,f as h,o as t,q as c,s as y}from"./chunks/framework.x10tvMrD.js";import"./chunks/theme.joikb01B.js";import"./chunks/index.w40geAFS.js";const A="/assets/1-1.NFs2PZpD.jpg",F="/assets/1-2._U3mG3Df.jpg",B="/assets/1-3.gU5D-D7V.jpg",u="/assets/1-4.rlSGXu5T.jpg",S=JSON.parse('{"title":"实现简单的富文本输入框","description":"","frontmatter":{"title":"实现简单的富文本输入框","aside":true,"editLink":false,"lastUpdated":false,"showComment":false,"showDate":false,"date":"2024-03-28T13:34:12.000Z"},"headers":[],"relativePath":"develop/editor/01-从零开发L0级富文本编辑器/01-实现简单的富文本输入框.md","filePath":"develop/editor/01-从零开发L0级富文本编辑器/01-实现简单的富文本输入框.md","lastUpdated":1712041835000}'),D={name:"develop/editor/01-从零开发L0级富文本编辑器/01-实现简单的富文本输入框.md"},m=l("h1",{id:"实现简单的富文本输入框",tabindex:"-1"},[n("实现简单的富文本输入框 "),l("a",{class:"header-anchor",href:"#实现简单的富文本输入框","aria-label":'Permalink to "实现简单的富文本输入框"'},"​")],-1),b=h('<h2 id="富文本编辑器历程" tabindex="-1">富文本编辑器历程 <a class="header-anchor" href="#富文本编辑器历程" aria-label="Permalink to &quot;富文本编辑器历程&quot;">​</a></h2><p>首先我们需要了解富文本编辑器的历程。 富文本编辑器按发展历程而言，分为 L0、L1、L2、L3三个阶段，每个阶段都比上一个阶段的定制化程度更高，浏览器兼容问题更少，同时开发难度也更大。</p><h3 id="l0级富文本编辑器" tabindex="-1">L0级富文本编辑器 <a class="header-anchor" href="#l0级富文本编辑器" aria-label="Permalink to &quot;L0级富文本编辑器&quot;">​</a></h3><p>早期时代网页的富文本能力主要依靠对DOM的contenteditable属性来渲染样式，以及依赖于浏览器的document.execCommand()方法来修改富文本内容的样式，仅提供了有限的命令，实现最简单的功能，如粗体、斜体、文字颜色等等。<br></p><ul><li><p>可编辑内容依赖 <code>contenteditable</code> API；</p></li><li><p>编辑内容使用 <code>document.execCommand</code> API。</p></li><li><p>优点</p><ul><li>依赖于html原生的编辑能力，实现难度较低</li><li>对性能要求不高，操作起来比较流畅</li></ul></li><li><p>缺点</p><ul><li>不同浏览器对于document.execCommand()方法实现方法的不同，会导致生成的html内容会不同，兼容性较差 <ul><li>比如实现粗体效果，有些浏览器可能通过&lt;b&gt;标签实现，有些浏览器可能通过&lt;strong&gt;标签实现</li><li>删除内容会导致冗余的html标签内容，如删除&lt;strong&gt;文本&lt;strong&gt;内容中的文本，会遗留&lt;strong&gt;&lt;strong&gt;标签</li><li>不能实现协同编辑功能</li></ul></li></ul></li></ul><p>L0级富文本编辑器代表编辑器：Ueditor、KindEditor、summernote、CKEditor（早期版本）等。<br></p><h3 id="l1富文本编辑器" tabindex="-1">L1富文本编辑器 <a class="header-anchor" href="#l1富文本编辑器" aria-label="Permalink to &quot;L1富文本编辑器&quot;">​</a></h3><p>由于L0级富文本编辑器存在兼容的问题，且对文档样式的要求越来越高，L0级富文本编辑器无法满足需求，L1阶段的编辑器应运而生。<br> L1级依然使用了L0级的视线原理，通过DOM的contenteditable属性来渲染样式，不过L1级是将富文本内容抽象成数据模型，通过数据模型来管理编辑器的内容以及选区状态等，并采用<strong>自定义execCommand</strong>的方案，可以实现更加丰富的富文本功能。</p><ul><li>优点 <ul><li>通过抽离数据模型来管理富文本内容及状态，能够避免此前阶段同步浏览器之间对不同样式实现的差异。</li><li>通过内部数据模型实现在写协作的功能。</li><li>解决了富文本中脏数据、复杂功能难以实现的问题。</li></ul></li><li>缺点 <ul><li>实现技术门槛比较高。</li><li>内部数据模型的实现依赖于对DOM的变更监听来管理数据，如存在未知操作可能会导致数据模型的错乱从而影响编辑器的功能。</li><li>相比 L0 阶段，引进了一些组合输入问题，依然拥有 <code>contenteditable</code> 遗留问题，比如光标的兼容性问题等。</li></ul></li></ul><p>L1级编辑器代表编辑器：Quill、Draft.js、CKEditor（新版）等。</p><h3 id="l2级编辑器" tabindex="-1">L2级编辑器 <a class="header-anchor" href="#l2级编辑器" aria-label="Permalink to &quot;L2级编辑器&quot;">​</a></h3><p>为了解决contenteditable编辑不可控的问题，以GoogleDocs为代表的编辑器通过<strong>自研排版引擎</strong> 步入了L2阶段，实现了更好的实现富文本的功能。<br> 它完全不依赖contenteditable，包括选区、光标等，都是是自己绘制的，自己实现了一个基于元素和绝对定位的排版引擎，基本上脱离了浏览器自身的大部分排版规则。</p><ul><li>优点 <ul><li>所有浏览器无论做什么操作进行选区的选中，都能够保持一致性。</li><li>不会有光标的兼容性问题。</li><li>不依赖于浏览器大部分排版规则。</li><li>可实现分页、标尺、脚注等高级功能。</li></ul></li><li>缺点 <ul><li>那肯定是代码功能更难写了！</li></ul></li></ul><h2 id="简单的富文本编辑器-富文本输入框" tabindex="-1">简单的富文本编辑器-富文本输入框 <a class="header-anchor" href="#简单的富文本编辑器-富文本输入框" aria-label="Permalink to &quot;简单的富文本编辑器-富文本输入框&quot;">​</a></h2><p>我们先来实现简单的富文本输入框，富文本输入框的主要应用场景是评论、动态等短文字的内容输入，比如微博、掘金沸点的输入框和评论模块都是富文本输入框。 首先我们来分析一下先来分析微博和掘金沸点的实现方式。</p><h3 id="微博实现方式" tabindex="-1">微博实现方式 <a class="header-anchor" href="#微博实现方式" aria-label="Permalink to &quot;微博实现方式&quot;">​</a></h3><p>打开控制台，可以看到微博的代码，在代码中可以看到微博的实现方式是textarea。</p><img src="'+A+'"><p>接下来输入内容，包括文字、表情、话题等，然后从控制台中获取并输出实际的内容。</p><img src="'+F+'"><p>我们从控制台里获取在textarea输入框里的内容如下：</p><img src="'+B+'">',22),E=h('<br><p>而在发布微博后，我们可以在控制台代码中看到，\\n都转换为&lt;br&gt;，话题转为链接，表情则转为img图片标签。</p><img src="'+u+`"><p>综合以上来看，微博的输入框是基于Textarea实现，输入内容显示均为文本内容，通过转换函数将指定格式的内容转换为对应的内容。</p><p>优缺点：</p><ul><li>优点： <ul><li>不需要单独开发编辑器组件。</li><li>只需要提供转换函数，就可以根据输入的内容按照规则进行转换。</li></ul></li><li>缺点： <ul><li>只能显示纯文本内容，不能显示非纯文本的内容，比如表情、超话等内容只能以纯文本形式展示。</li><li>如果没有输入空格或其他间隔符，或者没有按照微博指定格式输入，就会导致输入的内容无法正常解析转换，比如链接、超话、提及等内容。</li></ul></li></ul><h3 id="掘金沸点的实现方式" tabindex="-1">掘金沸点的实现方式 <a class="header-anchor" href="#掘金沸点的实现方式" aria-label="Permalink to &quot;掘金沸点的实现方式&quot;">​</a></h3><p>打开控制台，可以看到掘金沸点的代码，在代码中可以看到掘金的实现方式是contenteditable=&quot;true&quot;，也就是LO、L1编辑器的实现方式。<br> contenteditable属性可以指定元素内容是否可编辑。</p><p>优缺点</p><ul><li>优点 <ul><li>可以显示大部分样式内容，包括图片、表情、视频等等。</li><li>可以根据实际需求，定制化样式。</li><li>可以拦截复制的内容并根据其内容进行进一步处理。</li><li>......</li></ul></li></ul><h4 id="语法" tabindex="-1">语法 <a class="header-anchor" href="#语法" aria-label="Permalink to &quot;语法&quot;">​</a></h4><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#B31D28;--shiki-dark:#FF938A;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">*element* contenteditable=&quot;true|false&quot;&gt;</span></span></code></pre></div><h4 id="属性值" tabindex="-1">属性值 <a class="header-anchor" href="#属性值" aria-label="Permalink to &quot;属性值&quot;">​</a></h4><table><thead><tr><th>值</th><th>描述</th></tr></thead><tbody><tr><td>true</td><td>指定元素是可编辑的</td></tr><tr><td>false</td><td>指定元素是不可编辑的</td></tr></tbody></table><h2 id="实现简单的富文本输入框-1" tabindex="-1">实现简单的富文本输入框 <a class="header-anchor" href="#实现简单的富文本输入框-1" aria-label="Permalink to &quot;实现简单的富文本输入框&quot;">​</a></h2><h3 id="contenteditable实现" tabindex="-1">contenteditable实现 <a class="header-anchor" href="#contenteditable实现" aria-label="Permalink to &quot;contenteditable实现&quot;">​</a></h3><h4 id="将div变为可编辑状态" tabindex="-1">将div变为可编辑状态 <a class="header-anchor" href="#将div变为可编辑状态" aria-label="Permalink to &quot;将div变为可编辑状态&quot;">​</a></h4><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;rich_input&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> contenteditable</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;true&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> spellcheck</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;false&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">&gt;</span></span></code></pre></div><p>css样式：</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;">.rich_input</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">position</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">relative</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">font-size</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">14</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">line-height</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">24</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">#333</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">outline</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">none</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">padding</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">px</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 12</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">box-sizing</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">border-box</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">white-space</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">pre-wrap</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">word-break</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">break-all</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">border</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">#888</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> solid</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> 1</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">border-radius</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">width</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">500</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">height</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">overflow</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">scroll</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><h4 id="实现placeholder占位内容填充" tabindex="-1">实现placeholder占位内容填充 <a class="header-anchor" href="#实现placeholder占位内容填充" aria-label="Permalink to &quot;实现placeholder占位内容填充&quot;">​</a></h4><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">div</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;rich_input&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> contenteditable</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;true&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> spellcheck</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;false&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;"> placeholder</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#96D0FF;">&quot;placeholder&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#8DDB8C;">div</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">&gt;</span></span></code></pre></div><p>css样式</p><div class="language-css vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#6CB6FF;">.rich_input:empty::before</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">cursor</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">text</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">content</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">attr</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">placeholder</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">color</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">#333</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">position</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">absolute</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">top</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">5</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">}</span></span></code></pre></div><h4 id="实现插入文本内容" tabindex="-1">实现插入文本内容 <a class="header-anchor" href="#实现插入文本内容" aria-label="Permalink to &quot;实现插入文本内容&quot;">​</a></h4><p>这里涉及到选区的概念，由于本期只是实现简单的输入和插入功能，不涉及复杂的选区内容，本期暂不做介绍，下期会基于选区做个详细的介绍和说明。</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark-dimmed vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">    const</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;"> addText</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span><span style="--shiki-light:#E36209;--shiki-dark:#F69D50;">val</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">{</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">      const</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;"> selection</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> window.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getSelection</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">      if</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (selection) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">        selection.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">removeAllRanges</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#768390;">        // 为空初始化光标</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">range.value) {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">          editorRef.value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">focus</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">          range.value </span><span style="--shiki-light:#D73A49;--shiki-dark:#F47067;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;"> selection.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">getRangeAt</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">          }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">          range.value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">deleteContents</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">();</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">          range.value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">insertNode</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(range.value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">createContextualFragment</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(val));</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">          range.value.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">collapse</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#6CB6FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">          selection.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#DCBDFB;">addRange</span><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">(range.value);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">      }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#ADBAC7;">    }</span></span></code></pre></div><p>最终效果:</p><iframe src="https://wty9sky.github.io/simple_editor/" class="w-full h-[300px]"></iframe><p>Github代码：</p><ul><li>源码地址：<a href="https://github.com/wty9sky/simple_editor" target="_blank" rel="noreferrer">https://github.com/wty9sky/simple_editor</a></li></ul><p>目前关于简单的富文本输入框就到这里了，更多的功能可以自行实现，下一期来实现简单的富文本编辑器。<br></p>`,32);function _(s,v,f,q,x,L){const e=k,p=d("ClientOnly");return t(),o("div",null,[m,C(p,null,{default:g(()=>{var i,a;return[(((i=s.$frontmatter)==null?void 0:i.aside)??!0)&&(((a=s.$frontmatter)==null?void 0:a.showArticleMetadata)??!0)?(t(),c(e,{key:0,article:s.$frontmatter},null,8,["article"])):y("",!0)]}),_:1}),b,n(" 可以看到，输入内容和表情都是文本内容，表情由[]包住，选择话题后显示的也是#文本#的形式，回车则是用\\n表示。"),E])}const V=r(D,[["render",_]]);export{S as __pageData,V as default};
