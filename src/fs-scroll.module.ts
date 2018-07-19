import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { FsScrollComponent } from './components';
import { FsScrollService } from './services';
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
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsScrollModule,
      providers: [FsScrollService]
    };
  }
}
