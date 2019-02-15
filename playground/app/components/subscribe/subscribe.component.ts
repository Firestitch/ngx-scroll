import { Component, OnInit } from '@angular/core';
import { FsScrollService, FsScrollInstance } from '@firestitch/scroll';


@Component({
  selector: 'subscribe',
  templateUrl: 'subscribe.component.html'
})
export class SubscribeComponent implements OnInit {

  public records = [];
  public page = 1;
  public fsScrollInstance: FsScrollInstance;

  constructor(private scroll: FsScrollService) {}

  public ngOnInit() {

    this.load();

    this.scroll.component('scroll-subscribe').subscribe((fsScrollInstance: FsScrollInstance) => {
      this.fsScrollInstance = fsScrollInstance;
      fsScrollInstance.subscribe(() => {
        this.fsScrollInstance.loading();

        setTimeout(() => {
          this.load();
        }, 200);
      });
    });
  }

  public load() {

      const newRecords = this.generateArray(5);
      this.records.push(...newRecords);
      if (this.fsScrollInstance) {
        this.fsScrollInstance.loaded();
      }
      this.page++;
  }

  private generateArray(count) {
    const recordsCount = this.records.length;
    if (this.page >= 10) {
      this.fsScrollInstance.complete();
      return [];
    }

    return Array.apply(null, { length: count })
      .map((value, index) => {
        return recordsCount + (index + 1);
      });
  }
}
