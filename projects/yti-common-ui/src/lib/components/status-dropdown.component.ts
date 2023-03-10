import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Placement as NgbPlacement } from '@ng-bootstrap/ng-bootstrap';
import {Status, selectableStatuses, restrictedStatuses, creationTimeAllowedStatuses, allowedTargetStatuses} from '../entities/status';

type Placement = NgbPlacement;

@Component({
  selector: 'app-status-dropdown',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StatusDropdownComponent),
    multi: true
  }],
  template: `
    <div ngbDropdown [placement]="placement">
      <button [id]="'selected_' + id" class="btn btn-dropdown" ngbDropdownToggle>
        <span>{{selection | translate}}</span>
      </button>

      <div ngbDropdownMenu>
        <button *ngFor="let option of options"
                [id]="option + '_' + id"
                (click)="select(option)"
                class="dropdown-item"
                [class.active]="isSelected(option)">
          {{option | translate}}
        </button>
      </div>
    </div>
  `
})
export class StatusDropdownComponent implements ControlValueAccessor {

  @Input() id: string;
  @Input() placement: Placement = 'bottom-left';
  @Input() restrict = false;
  @Input() isSuperUser = false;
  @Input() originalStatus: Status|undefined;
  @Input() allowOnlyCreationTimeStatuses = false;

  selection: Status;

  private propagateChange: (fn: any) => void = () => {};
  private propagateTouched: (fn: any) => void = () => {};

  get options(): Status[] {

    if (this.isSuperUser) {
      return selectableStatuses;
    }
    if (this.allowOnlyCreationTimeStatuses) {
      return creationTimeAllowedStatuses;
    }
    if (this.restrict) {
      return restrictedStatuses;
    } else if (this.originalStatus) {
      return allowedTargetStatuses(this.originalStatus);
    } else {
      return selectableStatuses;
    }
  }

  isSelected(option: Status) {
    return this.selection === option;
  }

  select(option: Status) {
    this.selection = option;
    this.propagateChange(option);
  }

  writeValue(obj: any): void {
    this.selection = obj;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
}
