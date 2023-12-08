<h3 align="center">scroller</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/lemehovskiy/scroller.svg)](https://github.com/lemehovskiy/scroller/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/lemehovskiy/scroller.svg)](https://github.com/lemehovskiy/scroller/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">
    VanillaJS plugin for detecting vertical scroll progress.
</p>

## Demo <a name="demo"></a>

[Basic demo](https://codepen.io/lemehovskiy/pen/MWLxbXb)

## 🧐 About <a name = "about"></a>

VanillaJS plugin for detecting vertical scroll progress.

## 🏁 Getting Started <a name = "getting_started"></a>

### Installing

```
npm i @lemehovskiy/scroller
```

### Scroller example

index.js

```js
import Scroller from "@lemehovskiy/scroller";

const scroller = new Scroller(document.querySelector(".scroller-element"), {
  autoAdjustScrollOffset: true,
});
const progressEl = document.getElementById("progress");

if (progressEl) {
  scroller.progressChanged.on((progress) => {
    progressEl.innerHTML = "" + progress;
  });
}

```

index.html

```html
<div id="progress"></div>
<div class="spacer"></div>
<div class="scroller-element"></div>
<div class="spacer"></div>
```

style.css

```css
.spacer {
  min-height: 500px;
  background-color: aquamarine;
}
.scroller-element {
  min-height: 700px;
  background-color: azure;
}
#progress {
  position: fixed;
  top: 0;
  left: 0;
}
```
