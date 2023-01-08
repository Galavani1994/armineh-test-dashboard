import { Directive, Input } from '@angular/core';
import {NG_VALIDATORS, Validator, FormControl, AbstractControl, ValidationErrors} from '@angular/forms';

@Directive({
  selector: '[customMax]',
  providers: [{provide: NG_VALIDATORS, useExisting: CustomMaxDirective, multi: true}]
})

export class CustomMaxDirective implements Validator {
  @Input()
  customMax: string;

  validate(c: AbstractControl): {[key: string]: any} | null {
    let v = c.value;
    return ( v > Number(this.customMax) )? {'customMax': true} : null;
  }
}
