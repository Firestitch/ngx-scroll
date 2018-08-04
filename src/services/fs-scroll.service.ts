import { Injectable } from '@angular/core';
import { FsScrollInstance } from '../classes';
import { of } from 'rxjs/observable/of';
import { timeout } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FsScrollService {

  private _instances = (<any>window).FsScrollServiceInstances;
  private _pendingInstances = (<any>window).FsScrollServicePendingInstances;

  constructor() {
    if (!(<any>window).FsScrollServiceInstances) {
      (<any>window).FsScrollServiceInstances = new Map<string, FsScrollInstance>();
      this._instances = (<any>window).FsScrollServiceInstances;
    }

    if (!(<any>window).FsScrollServicePendingInstances) {
      (<any>window).FsScrollServicePendingInstances = new Map<string, FsScrollInstance>();
      this._pendingInstances = (<any>window).FsScrollServicePendingInstances;
    }
  }

  public pushInstance(instance) {

    if (!instance.name) {
      throw Error('FsScroll must have a name');
    }

    this._instances.set(instance.name, instance);

    if (this._pendingInstances.has(instance.name)) {
      const subject = this._pendingInstances.get(instance.name);

      subject.next(instance);
      subject.complete();
    }
  }

  public component(name): Observable<any> {
    if (this._instances.has(name)) {
      return of(this._instances.get(name))
    } else {
      const subject = new Subject();
      this._pendingInstances.set(name, subject);

      return subject.pipe(
        timeout(1000),
      )
    }
  }

  public remove(name) {
    const instance = this._instances.get(name);
    if (instance) {
      instance.destroy();
    }

    this._instances.delete(name);
  }
}
