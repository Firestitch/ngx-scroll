import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { takeUntil } from 'rxjs/operators';

export class FsScrollInstance {

  public name: string;
  public enabled = true;
  public activationDown = 85;
  public loaderDiametr = 30;
  public completed = false;
  public load$ = new EventEmitter();

  private _loading = new BehaviorSubject<boolean>(false);
  private _instanceAlive = new EventEmitter();

  constructor() {}

  get loading() {
    return this._loading.getValue();
  }

  get loading$(): Observable<boolean> {
    return this._loading.asObservable();
  }

  set loading(value) {
    this._loading.next(value);
  }

  public subscribe(fn: (value: any) => void) {
    this.load$
      .pipe(takeUntil(this._instanceAlive))
      .subscribe(fn);
  }

  public destroy() {
    this._instanceAlive.next();
    this._instanceAlive.complete();
    this.load$.complete();
    this._loading.complete();
  }
}
