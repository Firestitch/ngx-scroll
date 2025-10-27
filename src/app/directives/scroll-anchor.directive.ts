import { Directive, HostBinding, HostListener, Input } from '@angular/core';

import { FsScrollService } from '../services/scroll.service';


@Directive({
    selector: '[fsScrollAnchor]',
    standalone: true
})
export class FsScrollAnchorDirective {

  @Input('fsScrollAnchor')
  @HostBinding('attr.fsScrollAnchor')
  public anchor: string;

  @Input()
  public target: string;

  constructor(private _scrollService: FsScrollService) {
  }

  @HostListener(
    'click',
    ['$event.button', '$event.ctrlKey', '$event.shiftKey', '$event.altKey', '$event.metaKey'],
  )
  public onClick(button: number, ctrlKey: boolean, shiftKey: boolean, altKey: boolean, metaKey: boolean): boolean {
    if (button !== 0 || ctrlKey || shiftKey || altKey || metaKey) {
      return true;
    }

    if (typeof this.target === 'string' && this.target != '_self') {
      return true;
    }

    this._scrollService.setAnchor(this.anchor);
  }
}
