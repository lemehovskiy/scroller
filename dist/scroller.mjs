function S(o, e, r) {
  var t = 0, s = o.top;
  e > s && (t = s - e);
  var i = 0, n = r - o.bottom;
  return e > n && (i = e - n), {
    startOffset: t,
    endOffset: i
  };
}
var b = function() {
  return document.body.clientHeight;
}, E = function(o, e) {
  var r = o.replace(/\s/g, ""), t = parseInt(r, 10);
  return /px$/.test(r) ? t : /%|vh$/.test(r) ? e / 100 * t : t;
}, L = function(o, e) {
  var r = [];
  return o.forEach(function(t) {
    var s = 0;
    typeof t == "string" ? s = E(t, e) : typeof t == "number" && (s = t), r.push(s);
  }), r;
}, P = function(o, e, r, t, s) {
  var i = o + e + r, n = (i - t) / s;
  n > 1 && (n = 1), n < 0 && (n = 0);
  var f = Math.round(n * 1e4) / 1e4;
  return f;
}, x = function(o, e, r, t) {
  return o + e + r - t;
}, z = function(o, e, r, t, s, i, n) {
  var f = r + e, l = f, a = f + t, g = L([o.start, o.end], s), c = g[0], h = g[1], u = 0, d = 0;
  if (n) {
    var T = S({
      top: l,
      bottom: a
    }, s, i), v = T.startOffset, m = T.endOffset;
    u = v, d = m;
  }
  return {
    elementTriggerOffsetTop: l,
    elementTriggerOffsetBottom: a,
    scrollTriggerOffsetStart: c + u,
    scrollTriggerOffsetEnd: h + d
  };
}, B = function(o, e, r, t, s, i, n) {
  var f = z(i, o, t, s, e, r, n), l = f.elementTriggerOffsetTop, a = f.elementTriggerOffsetBottom, g = f.scrollTriggerOffsetStart, c = f.scrollTriggerOffsetEnd, h = x(s, e, g, c);
  return {
    elementTriggerOffsetTop: l,
    elementTriggerOffsetBottom: a,
    scrollTriggerOffsetStart: g,
    scrollTriggerOffsetEnd: c,
    progressLength: h
  };
}, O = function() {
  return document.body.scrollTop || document.documentElement.scrollTop;
}, p = function() {
  return window.innerHeight;
};
class y {
  constructor() {
    this.handlers = [];
  }
  on(e) {
    this.handlers.push(e);
  }
  off(e) {
    this.handlers = this.handlers.filter((r) => r !== e);
  }
  trigger(e) {
    this.handlers.slice(0).forEach((r) => r(e));
  }
  expose() {
    return this;
  }
}
class R {
  constructor(e, r) {
    this.onProgress = new y(), this.init = () => {
      this.subscribeLoad();
    }, this.onLoad = () => {
      this.onResize(), this.onScroll(), this.subscribeResize(), this.subscribeScroll();
    }, this.onResize = () => {
      const t = O(), s = p(), i = b(), { y: n, height: f } = this.element.getBoundingClientRect(), {
        elementTriggerOffsetTop: l,
        elementTriggerOffsetBottom: a,
        scrollTriggerOffsetStart: g,
        scrollTriggerOffsetEnd: c,
        progressLength: h
      } = B(
        t,
        s,
        i,
        n,
        f,
        this.options.scrollTriggerOffset,
        this.options.autoAdjustScrollOffset
      );
      this.elementTriggerOffsetTop = l, this.elementTriggerOffsetBottom = a, this.scrollTriggerOffsetPxStart = g, this.scrollTriggerOffsetPxEnd = c, this.progressLength = h;
    }, this.onScroll = () => {
      const t = O(), s = p(), i = P(
        t,
        s,
        this.scrollTriggerOffsetPxStart,
        this.elementTriggerOffsetTop,
        this.progressLength
      );
      this.progress = i, this.onProgress.trigger(i);
    }, this.subscribeLoad = () => {
      window.addEventListener("load", this.onLoad);
    }, this.subscribeScroll = () => {
      window.addEventListener("scroll", this.onScroll);
    }, this.subscribeResize = () => {
      window.addEventListener("resize", this.onResize);
    }, this.element = e, this.options = {
      scrollTriggerOffset: { start: 0, end: 0 },
      autoAdjustScrollOffset: !1,
      ...r
    }, this.init();
  }
  get progressChanged() {
    return this.onProgress.expose();
  }
}
export {
  R as default
};
