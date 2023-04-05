import { HttpClient } from "@angular/common/http";
import { KeycloakService } from "keycloak-angular";
import { YtiCommonUiConfig } from "../yti-common-ui-config";
import { Location } from '@angular/common';

export function initializeKeycloak(
  keycloak: KeycloakService,
  config: YtiCommonUiConfig,
  http: HttpClient,
  authenticatedUserUrl: string,
  location: Location
): () => Promise<any> {
    return (): Promise<any> => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const isInitialize = await keycloak.init({
            config: {
              url: config.keycloakUrl,
              realm: config.keycloakRealm,
              clientId: config.keycloakClientId
            },
            initOptions: {
              onLoad: 'check-sso',
              checkLoginIframe: true,
              silentCheckSsoRedirectUri: `${window.location.origin}${location.prepareExternalUrl('/assets/silent-check-sso.html')}`,
              messageReceiveTimeout: 5000
            }
          })

          if (isInitialize) {
            await http.get<any>(authenticatedUserUrl, {}).toPromise()
          }
          resolve()

        } catch (error) {
          console.log("Error during Keycloak initialization: ", error && error.error)
          resolve();
        }
      });
    };
}

