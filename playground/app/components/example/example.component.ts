import { Component, OnInit } from '@angular/core';

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

  constructor() {
  }

  public ngOnInit() {
    this.records = this.generateArray(this.initialCount);
  }

  public loadMore() {
    setTimeout(() => {
      this.page++;
      const newRecords = this.generateArray(20, this.page);
      this.records.push(...newRecords);
      this.loading = false;
    }, 500);
  }

  private generateArray(count, offset = 1) {
    const recordsCount = this.records.length;
    if (offset > 5) {
      this.completed = true;
      return [];
    } else {
      return Array.apply(null, { length: count })
        .map((value, index) => {
          return recordsCount + (index + 1);
        });
    }
  }


}
