import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, inject } from '@angular/core';
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
  el = inject(ElementRef);
  instance = inject(FsScrollInstance);


  @HostBinding('class.fs-scroll-content') public selfClass = true;
}
