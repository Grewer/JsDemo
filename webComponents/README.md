# WebComponents

## 起因
说起来这个东西, 出来了至少 2 年了, 但是因为最近两年我基本没做过 web 端的东西, 所以也没怎么了解过了, 趁着这次放假, 补充一下知识点


先来看看 MDN 中对于他的描述:

Web Components旨在解决这些问题 — 它由三项主要技术组成，它们可以一起使用来创建封装功能的定制元素，可以在你喜欢的任何地方重用，不必担心代码冲突。

*   **Custom elements（自定义元素）：**一组JavaScript API，允许您定义custom elements及其行为，然后可以在您的用户界面中按照需要使用它们。
*   **Shadow DOM（影子DOM）**：一组JavaScript API，用于将封装的“影子”DOM树附加到元素（与主文档DOM分开呈现）并控制其关联的功能。通过这种方式，您可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
*   **HTML templates（HTML模板）：** [`<template>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template) 和 [`<slot>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/slot) 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。


## Custom elements（自定义元素）

> Web Components 标准非常重要的一个特性是，它使开发者能够将HTML页面的功能封装为 custom elements（自定义标签），而往常，开发者不得不写一大堆冗长、深层嵌套的标签来实现同样的页面功能。

### CustomElementRegistry
> 用来处理 web 文档中的 custom elements — 该对象允许你注册一个 custom element，返回已注册 custom elements 的信息，等等。

共有两种 custom elements：

*   **Autonomous custom elements** 是独立的元素，它不继承其他内建的HTML元素。你可以直接把它们写成HTML标签的形式，来在页面上使用。例如 `<popup-info>`，或者是`document.createElement("popup-info")`这样。
*   **Customized built\-in elements** 继承自基本的HTML元素。在创建时，你必须指定所需扩展的元素（正如上面例子所示），使用时，需要先写出基本的元素标签，并通过 [`is`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes#attr-is) 属性指定custom element的名称。例如`<p is="word-count">`, 或者 `document.createElement("p", { is: "word-count" })`。


#### customElements.define

用来注册一个 custom element，该方法接受以下参数

*   表示所创建的元素名称的符合 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 标准的字符串。注意，custom element 的名称不能是单个单词，且其中 [必须要有短横线](https://html.spec.whatwg.org/#valid-custom-element-name) 。
*   用于定义元素行为的 [类](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) 。
*   `可选参数`，一个包含 `extends` 属性的配置对象，是可选参数。它指定了所创建的元素继承自哪个内置元素，可以继承任何内置元素。

#### 小栗子:

```html
<div is="my-name"></div>
<gender-info></gender-info>
<script>
    // 基础 HTML 的元素
    class Names extends HTMLDivElement {
        constructor() {
            super();
            // this 指向的就是当前元素
            this.innerText = 'Grewer wrote example'
        }
    }

    customElements.define('my-name', Names, {extends: 'div'});


    // 自定义标签:
    class Gender extends HTMLElement {
        constructor() {
            // 必须首先调用 super方法
            super();

            this.innerText = 'Grewer gender is male'

            // 添加方法
            this.onclick = () => {
                console.log('run in customElement')
            }
        }
    }

    customElements.define('gender-info', Gender)
</script>
```
页面的显示:
![](./imgs/customElement1.png)

DOM 中的显示:

![](./imgs/customElement2.png)


#### 组件名注意点
- 必须有 "-"  如果组件名是 gender  则直接报错, 即使是这样的名称也可以 "gender-"
- 首字母也不能大写, 比如就不能写成 Gender-info

### 生命周期

在custom element的构造函数中，可以指定多个不同的回调函数，它们将会在元素的不同生命时期被调用：

*   `connectedCallback`：当 custom element首次被插入文档DOM时，被调用。
*   `disconnectedCallback`：当 custom element从文档DOM中删除时，被调用。
*   `adoptedCallback`：当 custom element被移动到新的文档时，被调用。
*   `attributeChangedCallback`: 当 custom element增加、删除、修改自身属性时，被调用。


大部分生命周期和其他框架的类似, 但是其中有一个 `attributeChangedCallback` 需要说明下:

```html

<life-test></life-test>

<script>

    class Life extends HTMLElement {
        // 用来搭配 attributeChangedCallback, 控制要监听的具体属性
        static get observedAttributes() {
            return ['style', 'test'];
        }

        constructor() {
            super();
            this.innerText = 'life test  click'
            this.onclick = this.change
        }

        change = () => {
            console.log('add run')
            this.style.background = `rgba(0, 0, 0, ${Math.random()})`
            this.setAttribute('test', Math.random() * 100)
        }
        
        attributeChangedCallback(...arg) {
            // 打印的值分别是: 属性值名, 旧值, 新值  如果没有就为 null
            // 如果同时改变了 2 个属性, 则触发此函数两次
            console.log('changed', arg)
        }
    }

    customElements.define('life-test', Life)
    
</script>
```
想要使用 `attributeChangedCallback` 生命周期, 就必须搭配上 `observedAttributes`



## 兼容以及 polyfill



https://www.webcomponents.org/polyfills

## 结语



参考:  
- https://developer.mozilla.org/zh-CN/docs/Web/Web_Components
