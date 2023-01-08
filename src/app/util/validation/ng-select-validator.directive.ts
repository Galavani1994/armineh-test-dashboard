//
import {Directive, DoCheck, ElementRef, HostListener, Input, OnInit, Optional} from '@angular/core';
import {AbstractControl, FormControl, NgControl} from '@angular/forms';


@Directive({
    selector: 'ng-select'
})
export class NgSelectValidatorDirective implements OnInit, DoCheck {

    // @ts-ignore
  @Input() DValidation: FormControl;

    public abstractControl: AbstractControl;
    public oldvalue: any;

    @HostListener('change', ['$event'])
    onClick(event:any) {
        if (event == undefined) {
            this.abstractControl.reset();
        }

    }

    constructor(public el: ElementRef, @Optional() public model?: NgControl) {
        // @ts-ignore
      this.abstractControl = (model) ? model.control : null;
    }


    ngOnInit() {
        this.oldvalue = (this.abstractControl) ? this.abstractControl.value : null;
        this.el.nativeElement.insertAdjacentHTML('afterend', '<div id="errMessage" style="font-size: 10px"></div>');
    }


    ngDoCheck() {
        if (this.abstractControl) {
            if (this.abstractControl.value !== this.oldvalue) {
                if (this.abstractControl.dirty && this.abstractControl.touched) {
                    this.oldvalue = this.abstractControl.value;
                    if (!this.abstractControl.valid) {
                        for (let ss in this.abstractControl.errors) {
                            if (ss === 'required') {
                                this.el.nativeElement.nextElementSibling.style.color = 'red';
                                this.el.nativeElement.nextElementSibling.innerText = 'این قسمت باید دارای مقدار باشد';
                                this.el.nativeElement.style.borderRight = '';
                            }
                        }
                    }
                    if (!this.abstractControl.invalid && this.abstractControl.valid) {
                        this.el.nativeElement.nextElementSibling.style.color = 'green';
                        this.el.nativeElement.nextElementSibling.innerText = '';
                        this.el.nativeElement.style.borderRight = '';
                    }
                }
                if (this.abstractControl.invalid && !this.abstractControl.valid) {
                    this.el.nativeElement.nextElementSibling.style.color = '';
                    this.el.nativeElement.nextElementSibling.innerText = '';
                    this.el.nativeElement.style.borderRight = '';
                }
            }
        }
    }


}
