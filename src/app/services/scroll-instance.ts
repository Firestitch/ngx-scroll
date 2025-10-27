import { ElementRef, Injectable, NgZone, inject } from '@angular/core';

import { Subject, BehaviorSubject, Observable, Subscription, fromEvent } from 'rxjs';
import { filter, map, throttleTime } from 'rxjs/operators';

import { FsScrollService } from '../services/scroll.service';
import { IScrollConfig } from '../interfaces/scroll-config';
import { FsScrollComponent } from '../components/scroll/scroll.component';
import { FS_SCROLL_CONFIG } from '../fs-scroll.providers';


@Injectable()
export class FsScrollInstance {
  config = inject<IScrollConfig>(FS_SCROLL_CONFIG);
  private _fsScroll = inject(FsScrollService);
  private _zone = inject(NgZone);


  public name: string;
  public enabled = true;

  private _loading = new BehaviorSubject<boolean>(false);
  private _completed = new BehaviorSubject<boolean>(false);
  private _loaded = new Subject();
  private _load = new Subject();
  private _el: ElementRef;
  private _component: FsScrollComponent;
  private _contentElement: ElementRef;
  private _scroll: Observable<any>;
  private reloadSubscription = null;
  private contentHeight = null;
  private scrollTop = 0;

  constructor() {
    const config = this.config;

    this.config = Object.assign({}, config);

    this.config.spinnerDiameter = this.config.spinnerDiameter || 40;
    this.config.scrollThreshold = this.config.scrollThreshold || 1000;
  }

  public init(component: FsScrollComponent) {
    this._component = component;
    this._el = this._component._el;

    if (this.name) {
      this._fsScroll.pushInstance(this);
    }

    this._zone.runOutsideAngular(() => {
      this.subscribeToScroll();
      this.subscribeDown();
    });
  }

  get isLoading() {
    return this._loading.getValue();
  }

  get isLoading$() {
    return this._loading.asObservable();
  }

  get completed$() {
    return this._completed.asObservable();
  }

  get completed() {
    return this._completed.getValue();
  }

  public complete() {
    this._completed.next(true);
  }

  get loadingObservable(): Observable<boolean> {
    return this._loading.asObservable();
  }

  get loadedObservable(): Observable<any> {
    return this._loaded.asObservable();
  }

  public loading(value?) {
    this._loading.next(value === undefined || value);
  }

  public loaded() {
    this.loading(false);
    this._loaded.next(true);
  }

  public destroy() {
    this._loading.complete();
    this._loaded.complete();
    this._load.complete();
    this._completed.complete();
  }

  public subscribe(fn: (value?: any) => void): Subscription {

    setTimeout(() => {

      if (this._component.scrollContentComponent) {
        this._contentElement = this._component.scrollContentComponent.el;
        this.reload();

      } else {
        console.warn('Missing the fsScrollContent component');
      }
    });

    return this._load.asObservable().subscribe(fn);
  }

  public reload() {

    this.contentHeight = null;
    this.scrollTop = 0;
    if (this.reloadSubscription) {
      this.reloadSubscription.unsubscribe();
    }

    this.reloadSubscription = this.loadedObservable.subscribe(() => {
      this._reload();
    });

    this._reload();
  }

  private _reload() {

    if (!this._contentElement) {
      return;
    }

    // Delay to allow for rendering
    setTimeout(() => {

      const contentHeight = this._contentElement.nativeElement.offsetHeight;
      if (!this.completed &&
          contentHeight <= this._el.nativeElement.offsetHeight &&
          this.contentHeight !==  contentHeight) {

        this._load.next(this);
      } else if (this.reloadSubscription) {
        this.reloadSubscription.unsubscribe();
      }

      this.contentHeight = contentHeight;
    });
  }

  private subscribeToScroll() {
    this._scroll = fromEvent(this._el.nativeElement, 'scroll')
      .pipe(
        throttleTime(20),
        map((e: any) => ({
          scrollHeight: e.target.scrollHeight,
          scrollTop: e.target.scrollTop,
          clientHeight: e.target.clientHeight
        }))
      );
  }

  private subscribeDown() {
    this._scroll
      .pipe(
        throttleTime(20),
        filter(() => !this.isLoading && !this.completed && this.enabled),
        filter(e => {
          return this.isUserScrollingDown(e) && this.isScrollThresholdExceeded(e)
        })
      )
      .subscribe(() => {
        this._load.next(this);
      });
  }

  private isUserScrollingDown(e) {
    const down = e.scrollTop > this.scrollTop;
    this.scrollTop = e.scrollTop;
    return down;
  }

  private isScrollThresholdExceeded(e) {
    return e.scrollHeight < (e.scrollTop + e.clientHeight + this.config.scrollThreshold);
  }
}
