import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from '../../../services/locations.service';
import { Observable } from 'rxjs';
import { Location } from '../../../models/location';

const zipCodeDuplicationsValidator = (locations: LocationsService) => {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (control.value !== undefined && locations.hasLocation(control.value)) {
      return { duplication: true };
    }
    return null;
  }
}

@Component({
  selector: 'app-location-input',
  templateUrl: './location-input.component.html',
  styleUrls: ['./location-input.component.scss'],
})
export class LocationInputComponent {

  @Input('task$') taskInProgress$: Observable<boolean> | undefined;
  @Output() zipCode: EventEmitter<Location> = new EventEmitter<Location>();

  readonly form: FormGroup = new FormGroup(
    {
      zipcode: new FormControl('', {
        validators: [
          Validators.required,
          zipCodeDuplicationsValidator(this.locations),
        ],
        updateOn: 'blur'
      }),
      country: new FormControl('us', [
        Validators.required,
      ]),
    }
  );

  constructor(
    private readonly locations: LocationsService,
  ) {
  }

  onAdd() {
    if (this.form.valid) {
      const zipCode = this.form.value.zipcode;
      const countryCode = this.form.value.country;
      this.zipCode.emit({ zipCode, countryCode });
      this.form.reset();
    }
  }

}
