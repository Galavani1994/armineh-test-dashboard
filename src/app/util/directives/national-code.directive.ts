import {Directive} from "@angular/core";
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";


export function isValidNationalCode(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let isValid: any;
    let input = control.value;
    if (!/^\d{10}$/.test(input)) {
      isValid = false;
    } else {
      const check = +input[9];
      const sum = input.split('').slice(0, 9).reduce((acc, x, i) => acc + +x * (10 - i), 0) % 11;
      isValid = sum < 2 ? check === sum : check + sum === 11;
    }

    return !isValid ? {nationalCodeValidate: true} : null;
  }

}

@Directive({
  selector: '[nationalCodeValidate]',
  providers:[{provide:NG_VALIDATORS,useExisting:NationalCodeDirective,multi:true}]

})
export class NationalCodeDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {

    let invalidNum : string[] = ["0000000000", "1111111111", "2222222222", "3333333333", "4444444444", "5555555555", "6666666666", "7777777777", "8888888888", "9999999999"];
    if (control.value.length !== 10 || invalidNum.includes(control.value)) {
      return {nationalCodeValidate: true}
    }
    return isValidNationalCode()(control);
  }
}
