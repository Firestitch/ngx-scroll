import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Output,
  OnDestroy,
  EventEmitter,
  Inject,
  ContentChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FsScrollService } from '../../services';
import { FsScrollInstance } from '../../classes';
import { FS_SCROLL_CONFIG } from '../../fs-scroll.providers';
import { IScrollConfig } from '../../interfaces/scroll-config';
import { FsScrollContentComponent } from '../fs-scroll-content';


@Component({
  selector: '[fsScroll]',
  templateUrl: 'fs-scroll.component.html',
  styleUrls: [ 'fs-scroll.component.scss' ]
})
export class FsScrollComponent implements OnInit, OnDestroy {

  private _load = new EventEmitter;

  @ContentChild (FsScrollContentComponent) scrollContentComponent: FsScrollContentComponent;

  @Input('name')
  set name(value) {
    this.instance.name = value;
  }

  @Input()
  set scrollThreshold(value) {
    this.instance.config.scrollThreshold = value;
  }

  @Input()
  set completed(value) {
    this.instance.complete();
  }

  @Input()
  set enabled(value) {
    this.instance.enabled = value;
  }

  @Input()
  set loading(value) {
    this.instance.loading(value);
  }

  @Input()
  set completeMessage(value) {
    this.instance.config.completeMessage = value;
  }

  @Input()
  set completeIcon(value) {
    this.instance.config.completeIcon = value;
  }

  @Output()
  get load(): EventEmitter<any> {
    return this._load;
  }

  @Output()
  get loadingChange(): Observable<boolean> {
    return this.instance.loadingObservable;
  }

  @HostBinding('class.fs-scroll') public selfClass = true;

  public instance: FsScrollInstance;

  constructor(private fsScrollService: FsScrollService,
              public _el: ElementRef,
              @Inject(FS_SCROLL_CONFIG) private config: IScrollConfig) {
    this.instance = new FsScrollInstance(fsScrollService, Object.assign({}, this.config));
  }

  public ngOnInit() {

    this.instance.init(this);

    if (this.scrollContentComponent) {
      this.scrollContentComponent.instance = this.instance;
    }

    if (this._load.observers.length) {
      this.instance.subscribe(() => {
        this._load.emit(this.instance);
      });
    }
  }

  public ngOnDestroy() {
    this.instance.destroy();
  }
}
