import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { LocationsService } from '../../../services/locations.service';
import { ZipCode } from '../../../models/zip-code';

const zipCodeUSPattern = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

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

  @Output() zipCode: EventEmitter<ZipCode> = new EventEmitter<ZipCode>();

  form: FormControl = new FormControl('', {
    validators: [
      Validators.pattern(zipCodeUSPattern),
      zipCodeDuplicationsValidator(this.locations),
    ],
    updateOn: 'blur'
  });

  constructor(
    private readonly locations: LocationsService,
  ) {
  }

  onAdd() {
    if (this.form.valid) {
      this.zipCode.emit(this.form.value);
      this.form.reset();
    }
  }

}
