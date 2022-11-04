import { AbstractControl, ValidationErrors } from '@angular/forms';
import { contains } from './array';
import * as languageTags from '../../ietf-language-tags.json';

export function requiredList(control: AbstractControl): ValidationErrors | null {
  return Object.values(control.value).length > 0 ? null : {
    required: {
      valid: false
    }
  };
}

export function validateLanguage(control: AbstractControl): ValidationErrors | null {
  return contains(languageTags.ieftLanguageTags, control.value) ? null : {
    validateLanguage: {
      valid: false
    }
  };
}

// TODO: The following is just an early attempt to force some structural correctness. Internationalized URLs and JavaScript's inability
//  to support unicode character classes cause so much trouble that the task is un-pleasing at best. Also, it might make sense to consider
//  disallowing userinfo, localhost and IP addresses.
export const httpOrHttpsUrlRegex = /^https?:\/\/(?:[^\s\/@]+@)?(:?localhost|\[[a-fA-F0-9:.]+\]|[^\s\/@:.?#\[\]]+(?:\.[^\s\/@:.?#\[\]]+)+)(?::\d+)?(?:\/\S*)?$/;
