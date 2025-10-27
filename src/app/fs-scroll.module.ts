import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FsScrollComponent } from './components/scroll/scroll.component';
import { FsScrollContentComponent } from './components/scroll-content/scroll-content.component';
import { FsScrollContentFooterComponent } from './components/scroll-content-footer/scroll-content-footer.component';

import { FsScrollService } from './services/scroll.service';
import { IScrollConfig } from './interfaces/scroll-config';
import { FS_SCROLL_CONFIG } from './fs-scroll.providers';
import { FsDocumentScrollService } from './services/document-scroll.service';
import { FsScrollAnchorDirective } from './directives/scroll-anchor.directive';


@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        FsScrollComponent,
        FsScrollContentComponent,
        FsScrollContentFooterComponent,
        FsScrollAnchorDirective,
    ],
    exports: [
        FsScrollComponent,
        FsScrollContentComponent,
        FsScrollAnchorDirective,
    ],
    providers: [
        FsDocumentScrollService
    ]
})
export class FsScrollModule {
  static forRoot(config?: IScrollConfig): ModuleWithProviders<FsScrollModule> {
    return {
      ngModule: FsScrollModule,
      providers: [
        FsScrollService,
        FsDocumentScrollService,
        {
          provide: FS_SCROLL_CONFIG,
          useValue: config || {}
        }
      ]
    };
  }
}
