/*
 * Public API Surface
 */

// Modules
export { FsScrollModule } from './app/fs-scroll.module';

// Providers
export { FS_SCROLL_CONFIG } from './app/fs-scroll.providers';

// Components
export { FsScrollComponent } from './app/components/scroll/scroll.component';
export { FsScrollContentComponent } from './app/components/scroll-content/scroll-content.component';
export { FsScrollAnchorDirective } from './app/directives/scroll-anchor.directive';

// Interfaces
export { IScrollConfig } from './app/interfaces/scroll-config';

// Services
export { FsScrollService } from './app/services/scroll.service';
export { FsDocumentScrollService } from './app/services/document-scroll.service';

// Classes
export { FsScrollInstance } from './app/services/scroll-instance';
