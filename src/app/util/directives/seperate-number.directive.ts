import {Directive, ElementRef, HostListener} from "@angular/core";


// @ts-ignore
export function itpro(Number) {
  Number += '';
  Number = Number.replace(',', '');
  Number = Number.replace(',', '');
  Number = Number.replace(',', '');
  Number = Number.replace(',', '');
  Number = Number.replace(',', '');
  Number = Number.replace(',', '');
  let x = Number.split('.');
  let y = x[0];
  let z = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y))
    y = y.replace(rgx, '$1' + ',' + '$2');
  return y + z;
}

@Directive({
  selector: '[appDecimalAmount]'
})
export class SeperateNumberDirective {

  //private regex: RegExp = new RegExp(/^\d*\,?\d{0,2}$/g);
  private regex: RegExp = new RegExp(/\B(?=(\d{3})+(?!\d))/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      // @ts-ignore
      setTimeout((a) => {
        const current: string = this.el.nativeElement.value;
        var s = itpro(current);
        this.el.nativeElement.value = s;
        console.log('bbbb', s);
      }, 50);

    } else {
      const current: string = this.el.nativeElement.value;
      const next: string = current.concat(event.key);
      var s = itpro(next);
      this.el.nativeElement.value = s;
      event.preventDefault();
    }
  }
}
