import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FsScrollDirective } from './directives';
// import { FsComponentService } from './services';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    FsScrollDirective,
  ],
  entryComponents: [
  ],
  declarations: [
    FsScrollDirective,
  ],
  providers: [
    // FsComponentService,
  ],
})
export class FsScrollModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsScrollModule,
      // providers: [FsComponentService]
    };
  }
}
