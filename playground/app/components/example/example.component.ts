import { Component, OnInit } from '@angular/core';
import { FsScrollService } from '../../../../src/services';
import { FsScrollInstance } from '../../../../src/classes';


@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent implements OnInit {

  public initialCount = 40;
  public records = [];
  public page = 1;
  public loading = false;
  public completed = true;
  public scrollComponent: FsScrollInstance;

  constructor(private scroll: FsScrollService) {
  }

  public ngOnInit() {
    this.records = this.generateArray(this.initialCount);

    this.scroll.component('example1').subscribe((instance: FsScrollInstance) => {
      console.log(instance);
    });
  }

  public loadMore() {
    setTimeout(() => {
      this.page++;
      const newRecords = this.generateArray(20, this.page);
      this.records.push(...newRecords);
      this.loading = false;
    }, 500);
  }

  public enable() {
    this.scrollComponent.enabled = true;
  }

  public disable() {
    this.scrollComponent.enabled = false;
  }

  private generateArray(count, offset = 1) {
    const recordsCount = this.records.length;
    if (offset > 5) { // currentPage = countPages
      this.completed = true;
      return [];
    } else {
      this.completed = false;

      return Array.apply(null, { length: count })
        .map((value, index) => {
          return recordsCount + (index + 1);
        });
    }
  }
}
