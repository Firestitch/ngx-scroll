import { ChangeDetectionStrategy, Component, ElementRef, HostBinding } from '@angular/core';
import { FsScrollInstance } from '../../services/scroll-instance';
import { FsScrollContentFooterComponent } from '../scroll-content-footer/scroll-content-footer.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: '[fsScrollContent]',
    templateUrl: 'scroll-content.component.html',
    styleUrls: ['scroll-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FsScrollContentFooterComponent, AsyncPipe],
})
export class FsScrollContentComponent {

  @HostBinding('class.fs-scroll-content') public selfClass = true;

  constructor(
    public el: ElementRef,
    public instance: FsScrollInstance,
  ) {}
}
