import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { Observable } from 'rxjs';

import { FsScrollService } from '../../services/scroll.service';
import { FsScrollInstance } from '../../services/scroll-instance';
import { FS_SCROLL_CONFIG } from '../../fs-scroll.providers';
import { IScrollConfig } from '../../interfaces/scroll-config';
import { FsScrollContentComponent } from '../scroll-content/scroll-content.component';


@Component({
  selector: '[fsScroll]',
  templateUrl: 'scroll.component.html',
  styleUrls: [ 'scroll.component.scss' ],
  providers: [ FsScrollInstance ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsScrollComponent implements OnInit, OnDestroy {

  private _load = new EventEmitter;

  @ContentChild (FsScrollContentComponent, { static: false }) scrollContentComponent: FsScrollContentComponent;

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

  constructor(private fsScrollService: FsScrollService,
              public instance: FsScrollInstance,
              public _el: ElementRef,
              @Inject(FS_SCROLL_CONFIG) private config: IScrollConfig) {
  }

  public ngOnInit() {

    this.instance.init(this);

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
