import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT, Location } from '@angular/common';

import { of, Subject, Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

import { FsScrollInstance } from '../services/scroll-instance';


@Injectable()
export class FsScrollService {

  private _instances = (<any>window).FsScrollServiceInstances;
  private _pendingInstances = (<any>window).FsScrollServicePendingInstances;

  constructor(
    @Inject(DOCUMENT)
    private _document: Document,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
  ) {
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

  public scrollToAnchor(name: string, args?: ScrollIntoViewOptions): void {
    const elem = this._document.querySelector(`[fsScrollAnchor="${name}"]`);

    if (!!elem) {
      const scrollArgs = {
        ...{
          block: 'center',
          behavior: 'smooth',
        },
        ...args,
      }
      elem.scrollIntoView(scrollArgs as ScrollIntoViewOptions);
    }
  }


  public scrollToQueryParamAnchor(args?: ScrollIntoViewOptions): void {
    const anchor = this._route.snapshot.queryParams.anchor;

    this.scrollToAnchor(anchor, args);
    this.clearAnchor();
  }

  public setAnchor(name: string): void {
    const url = this._router
      .createUrlTree([], {
        relativeTo: this._route,
        queryParams: { anchor: name },
        queryParamsHandling: 'merge',
      })
      .toString();

    this._location.replaceState(url);
  }

  public clearAnchor(): void {
    this.setAnchor(null);
  }
}
