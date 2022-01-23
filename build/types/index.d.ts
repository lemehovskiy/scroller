interface ILiteEvent<T> {
    on(handler: {
        (data?: T): void;
    }): void;
    off(handler: {
        (data?: T): void;
    }): void;
}
declare class Scroller {
    private element;
    private options;
    private elementTriggerOffsetTop;
    private elementTriggerOffsetBottom;
    private scrollTriggerOffsetPxStart;
    private scrollTriggerOffsetPxEnd;
    private progressLength;
    private progress;
    private readonly onProgress;
    constructor(element: HTMLElement, options?: {
        scrollTriggerOffset?: {
            start: number | string;
            end: number | string;
        };
        autoAdjustScrollOffset?: boolean;
    });
    private init;
    get progressChanged(): ILiteEvent<number>;
    private onLoad;
    private onResize;
    private onScroll;
    private subscribeLoad;
    private subscribeScroll;
    private subscribeResize;
}
export default Scroller;
