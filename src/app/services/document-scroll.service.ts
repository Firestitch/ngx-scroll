import { Injectable, inject } from '@angular/core';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { BlockScrollStrategy } from '@angular/cdk/overlay';


@Injectable()
export class FsDocumentScrollService {
  private viewportRuler = inject(ViewportRuler);


  private _blockScrollStrategy: BlockScrollStrategy;

  public disable() {
    this.getBlockScrollStrategy().enable();
  }

  public enable() {
    this.getBlockScrollStrategy().disable();
  }

  private getBlockScrollStrategy() {
    if (!this._blockScrollStrategy) {
      this._blockScrollStrategy = new BlockScrollStrategy(this.viewportRuler, window.document);
    }

    return this._blockScrollStrategy;
  }
}
