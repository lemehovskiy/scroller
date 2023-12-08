import {
  getResizeValues,
  getWindowHeight,
  getBodyHeight,
  getScrollTop,
  getProgress,
} from "@lemehovskiy/scroller-utils/dist";

type HandlerType<T> = (data?: T) => void;

type TriggerOffsetType = {
  start: number | string;
  end: number | string;
};

type OptionsType = {
  scrollTriggerOffset: TriggerOffsetType;
  autoAdjustScrollOffset: boolean;
};

interface ILiteEvent<T> {
  on(handler: HandlerType<T>): void;
  off(handler: HandlerType<T>): void;
}

class LiteEvent<T> implements ILiteEvent<T> {
  private handlers: HandlerType<T>[] = [];

  public on(handler: HandlerType<T>) {
    this.handlers.push(handler);
  }

  public off(handler: HandlerType<T>) {
    this.handlers = this.handlers.filter((h) => h !== handler);
  }

  public trigger(data?: T) {
    this.handlers.slice(0).forEach((h) => h(data));
  }

  public expose(): ILiteEvent<T> {
    return this;
  }
}

export default class Scroller {
  private element: HTMLElement;
  private options: OptionsType;
  private elementTriggerOffsetTop: number;
  private elementTriggerOffsetBottom: number;
  private scrollTriggerOffsetPxStart: number;
  private scrollTriggerOffsetPxEnd: number;
  private progressLength: number;
  private progress: number;
  private readonly onProgress = new LiteEvent<number>();

  constructor(element: HTMLElement | null, options?: OptionsType) {
    if (element === null) return;
    this.element = element;
    this.options = {
      scrollTriggerOffset: { start: 0, end: 0 },
      autoAdjustScrollOffset: false,
      ...options,
    };
    this.init();
  }

  private init = (): void => {
    this.subscribeLoad();
  };

  public get progressChanged() {
    return this.onProgress.expose();
  }

  private onLoad = () => {
    this.onResize();
    this.onScroll();
    this.subscribeResize();
    this.subscribeScroll();
  };

  private onResize = () => {
    const scrollTop = getScrollTop();
    const windowHeight = getWindowHeight();
    const bodyHeight = getBodyHeight();
    const { y: elementViewportOffsetTop, height: elementHeight } =
      this.element.getBoundingClientRect();

    const {
      elementTriggerOffsetTop,
      elementTriggerOffsetBottom,
      scrollTriggerOffsetStart,
      scrollTriggerOffsetEnd,
      progressLength,
    } = getResizeValues(
      scrollTop,
      windowHeight,
      bodyHeight,
      elementViewportOffsetTop,
      elementHeight,
      this.options.scrollTriggerOffset,
      this.options.autoAdjustScrollOffset,
    );

    this.elementTriggerOffsetTop = elementTriggerOffsetTop;
    this.elementTriggerOffsetBottom = elementTriggerOffsetBottom;
    this.scrollTriggerOffsetPxStart = scrollTriggerOffsetStart;
    this.scrollTriggerOffsetPxEnd = scrollTriggerOffsetEnd;
    this.progressLength = progressLength;
  };

  private onScroll = () => {
    const scrollTop = getScrollTop();
    const windowHeight = getWindowHeight();
    const progress = getProgress(
      scrollTop,
      windowHeight,
      this.scrollTriggerOffsetPxStart,
      this.elementTriggerOffsetTop,
      this.progressLength,
    );

    this.progress = progress;
    this.onProgress.trigger(progress);
  };

  private subscribeLoad = (): void => {
    window.addEventListener("load", this.onLoad);
  };

  private subscribeScroll = (): void => {
    window.addEventListener("scroll", this.onScroll);
  };

  private subscribeResize = (): void => {
    window.addEventListener("resize", this.onResize);
  };
}
