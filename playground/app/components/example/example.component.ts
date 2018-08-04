import { Component, OnInit } from '@angular/core';
import { FsScrollService } from '../../../../src/services';
import { FsScrollInstance } from '../../../../src/classes';


@Component({
  selector: 'example',
  templateUrl: 'example.component.html'
})
export class ExampleComponent implements OnInit {

  public records = [];
  public page = 1;
  public state = 'idle';

  constructor(private scroll: FsScrollService) {}

  public ngOnInit() {
    this.records = this.generateArray();
  }

  public load(fsScrollInstance) {

    if (this.page > 10) {
      fsScrollInstance.complete();
      this.state = 'completed';
      return;
    }

    this.state = 'loading';
    fsScrollInstance.loading();
    setTimeout(() => {
      this.page++;
      const newRecords = this.generateArray();
      this.records.push(...newRecords);
      this.state = 'idle';
      fsScrollInstance.loaded();
    }, 200);
  }

  public destory() {
    this.page = 1;
    this.records = [];
    this.records = this.generateArray();
    this.state = 'destroyed';
  }

  public enable() {
    this.state = 'idle';
  }

  private generateArray() {
    const recordsCount = this.records.length;
    return Array.apply(null, { length: 50 })
      .map((value, index) => {
        return recordsCount + (index + 1);
      });
  }
}
