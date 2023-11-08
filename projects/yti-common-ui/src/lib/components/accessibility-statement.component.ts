import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accessibility-statement',
  templateUrl: './accessibility-statement.component.html',
  styleUrls: ['./accessibility-statement.component.css']
})
export class AccessibilityStatementComponent {
  currentLang: String;
  langChangeSubscription: Subscription;

  constructor(private translateService: TranslateService) {

    this.currentLang = translateService.currentLang;

    this.langChangeSubscription = translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    })
   }

  ngOnDestroy(): void {
    this.langChangeSubscription.unsubscribe();
  }
}
