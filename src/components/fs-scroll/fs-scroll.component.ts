import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Output,
  OnDestroy,
  EventEmitter, Inject,
} from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import { filter, map, pairwise, tap } from 'rxjs/operators';

import { FsScrollService } from '../../services';
import { FsScrollInstance } from '../../classes';
import { FS_SCROLL_DEFAULT_CONFIG } from '../../fs-scroll.providers';
import { IScrollDefaultConfig } from '../../interfaces/scroll-default-config';


@Component({
  selector: '[fsScroll]',
  templateUrl: 'fs-scroll.component.html',
  styleUrls: [ 'fs-scroll.component.scss' ],
})
export class FsScrollComponent implements OnInit, OnDestroy {

  @Input('fsScroll')
  set name(value) {
    this.instance.name = value;
  }

  @Input()
  set activationDown(value) {
    this.instance.activationDown = (!value && value !== 0) ? 85 : value;
  }

  @Input()
  set loaderDiametr(value) {
    this.instance.loaderDiametr = (!value && value !== 0) ? 30 : value;
  }

  @Input()
  set completed(value) {
    this.instance.completed = value;
  }

  @Input()
  set enabled(value) {
    this.instance.enabled = value;
  }

  @Input()
  set loading(value) {
    this.instance.loading = value;
  }

  @Input() public endMessage;
  @Input() public endIcon;

  @Output()
  get loadingChange(): Observable<boolean> {
    return this.instance.loading$;
  }

  @Output()
  get load(): EventEmitter<any> {
    return this.instance.load$;
  }

  @HostBinding('class.fs-scroll-wrapper') public selfClass = true;

  public onScroll$;
  public instance: FsScrollInstance;

  constructor(public scroll: FsScrollService,
              private _el: ElementRef,
              @Inject(FS_SCROLL_DEFAULT_CONFIG) private _defaultConfig: IScrollDefaultConfig) {
    this.instance = new FsScrollInstance();
  }

  public ngOnInit() {
    if (this.instance.name) {
      this.scroll.pushInstance(this.instance);
    }

    if (this._defaultConfig.endMessage && !this.endMessage) {
      this.endMessage = this._defaultConfig.endMessage;
    }

    if (this._defaultConfig.endIcon && !this.endIcon) {
      this.endIcon = this._defaultConfig.endIcon;
    }

    this.subscribeToScroll();
    this.subscribeDown();

  }

  public ngOnDestroy() {
    this.scroll.remove(this.name);
    this.onScroll$.completed();
  }

  public subscribeToScroll() {
    this.onScroll$ = fromEvent(this._el.nativeElement, 'scroll')
      .pipe(
        map((e: any) => ({
          scrollHeight: e.target.scrollHeight,
          scrollTop: e.target.scrollTop,
          clientHeight: e.target.clientHeight
        })),
        pairwise(),
      )
  }

  public subscribeDown() {
    this.onScroll$
      .pipe(
        filter(() => {
          return this.instance.enabled;
        }),
        filter(positions =>
          this.isUserScrollingDown(positions) && this.isScrollExpectedPercentDown(positions[1])
        ),
        filter(() => !this.instance.loading),
        tap(() => {
          this.instance.loading = true;
        })
      ).subscribe(() => {
        this.instance.load$.next();
    })
  }

  private isUserScrollingDown(positions) {
    return positions[0].scrollTop < positions[1].scrollTop;
  }

  private isScrollExpectedPercentDown(position) {
    return ((position.scrollTop + position.clientHeight) / position.scrollHeight) > (this.instance.activationDown / 100);
  }
}
