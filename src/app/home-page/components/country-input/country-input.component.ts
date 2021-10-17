import { Component, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, tap } from 'rxjs/operators';
import { countries } from '../../../models/countries';

export type Country = { code: string; name: string; };

@Component({
  selector: 'app-country-input',
  templateUrl: './country-input.component.html',
  styleUrls: ['./country-input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: CountryInputComponent,
    multi: true,
  }],
})
export class CountryInputComponent implements ControlValueAccessor {

  showOptions: boolean = false;
  error: boolean = false;
  readonly autocompleteForm: FormControl = new FormControl();
  readonly options$: Observable<Country[]>;

  private change: ((country: string) => void) | undefined;
  private forceHide: boolean = false;

  constructor(
    private readonly eRef: ElementRef,
  ) {
    this.options$ = this.autocompleteForm.valueChanges.pipe(
      startWith(''),
      debounceTime(100),
      map((value: string) => value?.trim()?.toLocaleLowerCase()),
      distinctUntilChanged(),
      tap(searchTerm => this.handleOptionsShow(searchTerm)),
      map(searchTerm => countries.filter(country => country.name.toLowerCase().includes(searchTerm))),
      tap(options => this.error = options.length === 0 && this.autocompleteForm.value?.length !== 0),
    );
  }

  // this is triggered by template (value) event on option
  onChange(country: Country): void {
    if (!this.change) {
      return;
    }
    this.change(country.code);
    this.autocompleteForm.setValue(country.name);
    this.forceHide = true;
  }

  // register custom function that will push changes to Form
  registerOnChange(fn: (country: string) => void): void {
    this.change = fn;
  }

  // update current value on Form value changes
  writeValue(value: string): void {
    const country = countries.find(c => c.code === value);
    this.autocompleteForm.setValue(country?.name);
  }

  registerOnTouched(fn: any): void {
    // no need for that, but could be implemented if needed
  }

  setDisabledState(isDisabled: boolean): void {
    // no need for that, but could be implemented if needed
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showOptions = false;
    }
  }

  private handleOptionsShow(searchTerm: string) {
    if (this.forceHide) {
      this.showOptions = false;
      this.forceHide = false;
    } else {
      this.showOptions = searchTerm?.length > 0
    }
  }

}
