import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { FsScrollComponent } from './components';
import { FsScrollService } from './services';
import { IScrollDefaultConfig } from './interfaces/scroll-default-config';
import { FS_SCROLL_DEFAULT_CONFIG } from './fs-scroll.providers';
// import { FsComponentService } from './services';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  exports: [
    FsScrollComponent,
  ],
  entryComponents: [
  ],
  declarations: [
    FsScrollComponent,
  ],
  providers: [
    // FsComponentService,
  ],
})
export class FsScrollModule {
  static forRoot(config: IScrollDefaultConfig = {}): ModuleWithProviders {
    return {
      ngModule: FsScrollModule,
      providers: [
        FsScrollService,
        {
          provide: FS_SCROLL_DEFAULT_CONFIG,
          useValue: config || {}
        }
      ]
    };
  }
}
