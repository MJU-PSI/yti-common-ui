import { Component } from '@angular/core';

declare var require: any;

const image = 'assets/ajax-loading-indicator-small.gif';

@Component({
  selector: 'app-ajax-loading-indicator-small',
  template: `<img [src]="src" />`
})
export class AjaxLoadingIndicatorSmallComponent {
  src = image;
}
