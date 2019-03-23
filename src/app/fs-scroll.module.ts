import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';

import { FsScrollComponent } from './components/scroll/scroll.component';
import { FsScrollContentComponent } from './components/scroll-content/scroll-content.component';

import { FsScrollService } from './services/scroll.service';
import { IScrollConfig } from './interfaces/scroll-config';
import { FS_SCROLL_CONFIG } from './fs-scroll.providers';


@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    FsScrollComponent,
    FsScrollContentComponent
  ],
  declarations: [
    FsScrollComponent,
    FsScrollContentComponent
  ]
})
export class FsScrollModule {
  static forRoot(config?: IScrollConfig): ModuleWithProviders {
    return {
      ngModule: FsScrollModule,
      providers: [
        FsScrollService,
        {
          provide: FS_SCROLL_CONFIG,
          useValue: config || {}
        }
      ]
    };
  }
}