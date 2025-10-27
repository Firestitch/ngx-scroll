import { Component, inject } from '@angular/core';
import { FsDocumentScrollService } from 'src/app/services/document-scroll.service';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'document-scroll',
    templateUrl: './document-scroll.component.html',
    standalone: true,
    imports: [MatButton]
})
export class DocumentScrollComponent {
  private documentScrollService = inject(FsDocumentScrollService);


  public enabled = true;


  public disable() {
    this.enabled = !this.enabled;
    this.documentScrollService.disable();
  }

  public enable() {
    this.enabled = !this.enabled;
    this.documentScrollService.enable();
  }
}
