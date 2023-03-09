import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  selector: 'fs-scroll-content-footer',
  templateUrl: 'scroll-content-footer.component.html',
  styleUrls: [ 'scroll-content-footer.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsScrollContentFooterComponent {
  @Input()
  public loading = false;

  @Input()
  public completed = false;

  @Input()
  public completeMessage: string;

  @Input()
  public completeIcon: string;

  @Input()
  public spinnerDiameter: number;
}
