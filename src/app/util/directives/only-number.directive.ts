import {Directive, ElementRef, HostListener, Input} from "@angular/core";
import {itpro} from "./seperate-number.directive";


@Directive({
  selector: '[OnlyNumber]'
})
export class OnlyNumberDirective {
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete', 'Control'];

  constructor(private el: ElementRef) {
  }

  @Input() OnlyNumber: any;

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    let e = <KeyboardEvent>event;

    if (this.OnlyNumber) {
      if ([46, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        //(e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if (e.keyCode != 8 && (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
      } else if (this.specialKeys.indexOf(event.key) !== -1) {
        // @ts-ignore
        setTimeout((a) => {
          const current: string = this.el.nativeElement.value;
          var s = itpro(current);
          this.el.nativeElement.value = s;
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
}
