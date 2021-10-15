import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'boldFragment'
})
export class BoldFragmentPipe implements PipeTransform {

  constructor(
    private readonly sanitizer: DomSanitizer,
  ) {
  }

  transform(value: string, subText: string): SafeHtml {
    if (!subText || subText.trim().length < 2) {
      return this.sanitizer.bypassSecurityTrustHtml(value);
    }

    const regEx = new RegExp(subText, "ig");
    let match = regEx.exec(value);
    let result = value;

    while (match && match.length > 0) {
      if (match) {
        result = result.replace(match[0], `<b>${match[0]}</b>`);
      }
      match = regEx.exec(value);
    }

    return this.sanitizer.bypassSecurityTrustHtml(result);
  }

}
