import * as CryptoJS from 'crypto-js';
import * as jalaliMoment from "jalali-moment";

export class AppUtil {
  static currentUser;
  static currentFullName;
  static currentBranchCode;

  public static cryptoJsEncryptors(input: string): string {
    return this.cryptoJsEncryptorsByKey(input,'Gh0St@ntaniye');
  }

  public static cryptoJsEncryptorsByKey(input: string,key:any): string {
    return CryptoJS.AES.encrypt(input, btoa(key)).toString();
  }

  public static cryptoJsDecryptor(input: string): string {
    return this.cryptoJsDecryptorByKey(input,'Gh0St@ntaniye');
  }

  public static cryptoJsDecryptorByKey(input: string, key:any): string {
    return CryptoJS.AES.decrypt(input, btoa(key)).toString(CryptoJS.enc.Utf8);
  }

  static compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  static downloadFile(base64Data, fileName, fileType) {
    let blob = AppUtil.base64ToBlob(base64Data);
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute('download', fileName + '.' + fileType);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  static isRegularKeyboard(key: string) {
    let lowercaseKey = key.toLowerCase();
    return lowercaseKey === 'backspace'
      || lowercaseKey === 'delete'
      || lowercaseKey === 'alt'
      || lowercaseKey === 'arrowleft'
      || lowercaseKey === 'arrowup'
      || lowercaseKey === 'arrowright'
      || lowercaseKey === 'shift'
      || lowercaseKey === 'arrowdown'
      || lowercaseKey === 'enter'
      || lowercaseKey === 'home'
      || lowercaseKey === 'end'
      || lowercaseKey === 'control';
  }

  static precisionConstraint(value: number, count: number, addedKey?) {
    if (value) {
      const stringOfValue = value.toString();

      const precisionIndex = stringOfValue.indexOf('.');
      if (precisionIndex > 0) {

        if (addedKey) {
          const duplicateDot = (value + addedKey).indexOf('.', precisionIndex + 1);
          if (duplicateDot > precisionIndex) {
            return true;
          }
        }

        const decimalPart = stringOfValue.substring(precisionIndex);
        return decimalPart.length > count;
      }
    }
    return false;
  }

  static isNumeric(value: any): boolean {
    return !isNaN(value - parseFloat(value));
  }

  static updateObject(goalObject, cloneObj) {
    let fields = Object.getOwnPropertyNames(cloneObj);
    for (let i = 0; i < fields.length; i++) {
      Reflect.set(goalObject, fields[i], Reflect.get(cloneObj, fields[i]));
    }
    return goalObject;
  }

  static isStringEmptyOrUndefined(value: string): boolean {
    return value === 'undefined' || value == undefined || (typeof value === 'string' && value.trim().length === 0);
  }

  static isValueNullOrUndefined(value: any) {
    return value == undefined;
  }

  static clone(selected: any) {
    return JSON.parse(JSON.stringify(selected));
  }

  static getTextWidth(text, font?) {
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    if (context) {
      context.font = font || '11px arial';
      let metrics = context.measureText(text);
      return metrics.width;
    } else {
      return 0;
    }
  }

  static getMaxTextWidth(textValues: string[], minVal?: number) {
    let maxlength = minVal ? minVal : 0;
    for (let textValue of textValues) {
      if (textValue.length > maxlength) {
        maxlength = AppUtil.getTextWidth(textValue);
      }
    }
    return maxlength;
  }

  static base64ToBlob(b64Data: string) {
    let base64FormatIndex = b64Data.indexOf(';base64,');
    const type = b64Data.substring(4, base64FormatIndex);
    const byteArray = new Uint8Array(
      atob(b64Data.substring(base64FormatIndex + 8))
        .split('').map(char => char.charCodeAt(0)));

    return new Blob([byteArray], {type: type});
  }

  private static getFileName = (sheetName?: string) => {
    const faDate = jalaliMoment().locale('fa').format('jYYYY/jMM/jDD');

    let fileName = sheetName ? `${sheetName}-${faDate}` : faDate;
    return {
      sheetName,
      fileName
    };
  };
}
