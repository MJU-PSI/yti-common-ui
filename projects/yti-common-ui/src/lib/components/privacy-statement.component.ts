import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-privacy-statement',
  templateUrl: './privacy-statement.component.html',
  styleUrls: ['./privacy-statement.component.css']
})
export class PrivacyStatementComponent {
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
