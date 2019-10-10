import { ChangeDetectionStrategy, Component, ElementRef, HostBinding } from '@angular/core';
import { FsScrollInstance } from '../../services/scroll-instance';

@Component({
  selector: '[fsScrollContent]',
  templateUrl: 'scroll-content.component.html',
  styleUrls: [ 'scroll-content.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsScrollContentComponent {

  @HostBinding('class.fs-scroll-content') public selfClass = true;

  constructor(
    public el: ElementRef,
    public instance: FsScrollInstance,
  ) {}
}
