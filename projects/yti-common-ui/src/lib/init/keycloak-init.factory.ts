import { HttpClient } from "@angular/common/http";
import { KeycloakService } from "keycloak-angular";
import { YtiCommonUiConfig } from "../yti-common-ui-config";

const silentCheckSso = '/assets/silent-check-sso.html';

export function initializeKeycloak(
  keycloak: KeycloakService,
  config: YtiCommonUiConfig,
  http: HttpClient,
  authenticatedUserUrl: string
): () => Promise<any> {
    return (): Promise<any> => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const isInitialize = await keycloak.init({
            config: {
              url: config.url,
              realm: config.realm,
              clientId: config.clientId
            },
            initOptions: {
              onLoad: 'check-sso',
              checkLoginIframe: true,
              silentCheckSsoRedirectUri:
                window.location.origin + silentCheckSso
            }
          })

          if (isInitialize) {
            await http.get<any>(authenticatedUserUrl, {}).toPromise()
          }
          resolve()

        } catch (error) {
          console.log("Error during Keycloak initialization: ", error)
          reject(error);
        }
      });
    };
}
