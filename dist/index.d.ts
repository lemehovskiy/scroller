type HandlerType<T> = (data?: T) => void;
type TriggerOffsetType = {
  start: number | string;
  end: number | string;
};
interface ILiteEvent<T> {
  on(handler: HandlerType<T>): void;
  off(handler: HandlerType<T>): void;
}
export default class Scroller {
  private element;
  private options;
  private elementTriggerOffsetTop;
  private elementTriggerOffsetBottom;
  private scrollTriggerOffsetPxStart;
  private scrollTriggerOffsetPxEnd;
  private progressLength;
  private progress;
  private readonly onProgress;
  constructor(
    element: HTMLElement,
    options?: {
      scrollTriggerOffset?: TriggerOffsetType;
      autoAdjustScrollOffset?: boolean;
    },
  );
  private init;
  get progressChanged(): ILiteEvent<number>;
  private onLoad;
  private onResize;
  private onScroll;
  private subscribeLoad;
  private subscribeScroll;
  private subscribeResize;
}
export {};
