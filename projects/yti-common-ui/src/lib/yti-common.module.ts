import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { AccordionChevronComponent } from './components/accordion-chevron.component';
import { AjaxLoadingIndicatorComponent } from './components/ajax-loading-indicator.component';
import { AjaxLoadingIndicatorSmallComponent } from './components/ajax-loading-indicator-small.component';
import { BackButtonComponent } from './components/back-button.component';
import { BreadcrumbComponent } from './components/breadcrumb.component';
import { ConfirmationModalComponent, ConfirmationModalService } from './components/confirmation-modal.component';
import { DropdownComponent } from './components/dropdown.component';
import { ErrorModalComponent, ErrorModalService } from './components/error-modal.component';
import { ExpandableTextComponent } from './components/expandable-text.component';
import { FilterDropdownComponent } from './components/filter-dropdown.component';
import { StatusDropdownComponent } from './components/status-dropdown.component';
import { FooterComponent } from './components/footer.component';
import { HighlightPipe } from './pipes/highlight.pipe';
import { KeysPipe } from './pipes/keys.pipe';
import { LoginModalComponent, LoginModalService } from './components/login-modal.component';
import { MenuComponent } from './components/menu.component';
import { PopoverCloseComponent } from './components/popover-close.component';
import { TranslateValuePipe } from './pipes/translate-value.pipe';
import { RequiredSymbolComponent } from './components/required-symbol.component';
import { InformationSymbolComponent } from './components/information-symbol.component';
import { StatusComponent } from './components/status.component';
import { IconComponent } from './components/icon.component';
import { ClipboardComponent } from './components/clipboard';
import { AlertModalComponent, AlertModalService } from './components/alert-modal.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AUTHENTICATED_USER_ENDPOINT, UserService } from './services/user.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ClipboardModule } from 'ngx-clipboard';
import { RouterModule } from '@angular/router';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './init/keycloak-init.factory';
import { YtiCommonUiConfig } from './yti-common-ui-config';
import { YTI_COMMON_UI_CONFIG } from './yti-common-ui-config.token';
import { HttpClient } from '@angular/common/http';

const components = [
  AccordionChevronComponent,
  AjaxLoadingIndicatorComponent,
  AjaxLoadingIndicatorSmallComponent,
  BackButtonComponent,
  BreadcrumbComponent,
  ConfirmationModalComponent,
  DropdownComponent,
  ErrorModalComponent,
  ExpandableTextComponent,
  FilterDropdownComponent,
  StatusDropdownComponent,
  FooterComponent,
  HighlightPipe,
  KeysPipe,
  LoginModalComponent,
  MenuComponent,
  PopoverCloseComponent,
  TranslateValuePipe,
  RequiredSymbolComponent,
  InformationSymbolComponent,
  StatusComponent,
  IconComponent,
  ClipboardComponent,
  AlertModalComponent
];
@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  entryComponents: [ // needed for modal components
    ErrorModalComponent,
    ConfirmationModalComponent,
    LoginModalComponent,
    AlertModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    TranslateModule,
    RouterModule,
    ClipboardModule,
    KeycloakAngularModule
  ],
  providers: [
    ErrorModalService,
    LoginModalService,
    ConfirmationModalService,
    AlertModalService,
    UserService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, YTI_COMMON_UI_CONFIG, HttpClient, AUTHENTICATED_USER_ENDPOINT],
    }
  ]
})
export class YtiCommonModule {
  static forRoot(ytiCommonUiConfig: YtiCommonUiConfig): ModuleWithProviders<YtiCommonModule> {
    return {
      ngModule: YtiCommonModule,
      providers: [
        {
          provide: YTI_COMMON_UI_CONFIG,
          useValue: ytiCommonUiConfig
        }
      ]
    };
  }

}
