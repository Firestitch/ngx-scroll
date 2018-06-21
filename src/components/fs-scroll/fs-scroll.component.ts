import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter, map, pairwise, tap } from 'rxjs/operators';

@Component({
  selector: '[fs-scroll]',
  templateUrl: 'fs-scroll.component.html',
  styleUrls: [ 'fs-scroll.component.scss' ],
})
export class FsScrollComponent implements OnInit {

  public onScroll$;
  // @Input()  public activationUp   = 10;
  @Input()  public activationDown = 85;
  @Input()  public loaderDiametr = 30;
  // @Input()  public refreshing = false;
  @Input()  public loading    = false;
  @Output() public loadingChange = new EventEmitter();

  // @Output() public scrolledUp   = new EventEmitter();
  @Output() public scrolledDown = new EventEmitter();

  @HostBinding('class') public selfClass = 'fs-scroll-wrapper';

  constructor(private _el: ElementRef) {

  }

  public ngOnInit() {
    this.subscribeToScroll();
    // this.uu();
    this.subscribeDown();

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
        // filter(positions =>
        //   this.isUserScrollingDown(positions) && this.isScrollExpectedPercentDown(positions[1]) ||
        //   this.isUserScrollingUp(positions) && this.isScrollExpectedPercentUp(positions[1])
        // ),
        // filter(() => !this.loading),
        // tap(() => {
        //   this.loadingChange.next(true);
        // })
      )
      // .subscribe((positions) => {
      //   console.log('scrolld');
      //   // if (this.scrolledDown) {
      //   //   this.scrolledDown.next();
      //   // }
      //   //
      //   // if (this.scrolledUp) {
      //   //   this.scrolledUp.next();
      //   // }
      // })
  }

  public subscribeDown() {
    this.onScroll$
      .pipe(
        filter(positions =>
          this.isUserScrollingDown(positions) && this.isScrollExpectedPercentDown(positions[1])
        ),
        filter(() => !this.loading),
        tap(() => {
          this.loadingChange.next(true);
        })
      ).subscribe(() => {
        this.scrolledDown.next();
    })
  }

  // public uu() {
  //   this.onScroll$
  //     .pipe(
  //       filter(positions =>
  //         this.isUserScrollingUp(positions) && this.isScrollExpectedPercentUp(positions[1])
  //       ),
  //       filter(() => !this.refreshing),
  //       tap(() => {
  //         this.refreshing = true;
  //         // this.refreshing.next(true);
  //       })
  //     ).subscribe(() => {
  //     console.log('up');
  //   })
  // }

  // private isUserScrollingUp(positions) {
  //   return positions[0].scrollTop > positions[1].scrollTop;
  // }

  private isUserScrollingDown(positions) {
    return positions[0].scrollTop < positions[1].scrollTop;
  }

  private isScrollExpectedPercentDown(position) {
    return ((position.scrollTop + position.clientHeight) / position.scrollHeight) > (this.activationDown / 100);
  }

  // private isScrollExpectedPercentUp(position) {
  //   return (position.clientHeight / position.scrollHeight) < (this.activationDown / 100);
  // }
}
