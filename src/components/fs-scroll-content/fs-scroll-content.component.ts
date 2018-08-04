import {
  Component,
  ElementRef,
  Input
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FsScrollService } from '../../services';
import { FsScrollInstance } from '../../classes';
import { FS_SCROLL_CONFIG } from '../../fs-scroll.providers';
import { IScrollConfig } from '../../interfaces/scroll-config';


@Component({
  selector: '[fsScrollContent]',
  templateUrl: 'fs-scroll-content.component.html',
  styleUrls: [ 'fs-scroll-content.component.scss' ]
})
export class FsScrollContentComponent {
  @Input('instance') instance;
  constructor(public el: ElementRef) {}
}
