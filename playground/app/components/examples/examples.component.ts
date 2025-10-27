import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { ExampleComponent } from '../example/example.component';
import { SubscribeComponent } from '../subscribe/subscribe.component';
import { DocumentScrollComponent } from '../document-scroll/document-scroll.component';

@Component({
    templateUrl: './examples.component.html',
    standalone: true,
    imports: [FsExampleModule, ExampleComponent, SubscribeComponent, DocumentScrollComponent]
})
export class ExamplesComponent {
  public config = environment;
}
