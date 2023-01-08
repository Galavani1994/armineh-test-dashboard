import {NgModule} from "@angular/core";
import {NumberFormatPipe} from "./pipes/number-format-pipe";
import {IRCurrencyPipe} from "./pipes/IRCurrencyPipe ";

@NgModule({
  imports: [],
  declarations: [
    NumberFormatPipe,
    IRCurrencyPipe
  ],
  exports: [
    NumberFormatPipe,
    IRCurrencyPipe
  ]
})
export class UtilModule {

}
