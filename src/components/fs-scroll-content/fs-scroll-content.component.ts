import {
  Component,
  ElementRef,
  Input,
  HostBinding
} from '@angular/core';

@Component({
  selector: '[fsScrollContent]',
  templateUrl: 'fs-scroll-content.component.html',
  styleUrls: [ 'fs-scroll-content.component.scss' ]
})
export class FsScrollContentComponent {

  @Input('instance') instance;

  @HostBinding('class.fs-scroll-content') public selfClass = true;

  constructor(public el: ElementRef) {}
}
