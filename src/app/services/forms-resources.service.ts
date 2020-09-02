import { Injectable } from "@angular/core";

import IMask from "imask";

@Injectable({
  providedIn: "root",
})
export class FormsResourcesService {
  constructor() {}

  instagramMask() {
    let patternMask = {
      mask: "{https://www.inst\\agr\\am.com/}string",
      blocks: {
        string: {
          // nested masks are available!
          mask: /^\w+$/,
        },
        lazy: false,
      },

      lazy: false,
    };

    return patternMask;
  }

  facebookMask() {
    let patternMask = {
      mask: "{https://www.f\\acebook.com/}string",
      blocks: {
        string: {
          // nested masks are available!
          mask: /^\w+$/,
        },
        lazy: false,
      },

      lazy: false,
    };

    return patternMask;
  }

  phoneMask() {
    let maskModel = {
      mask: "000000000000",
      lazy: true,
    };
    return maskModel;
  }

  moneyMask() {
    let maskModel = {
      mask: "num",
      blocks: {
        num: {
          // nested masks are available!
          mask: Number,
          thousandsSeparator: ".",
          scale: 0,
          // signed: false,
          // thousandsSeparator: ",",
          // padFractionalZeros: false,
          // normalizeZeros: true,
        },
        lazy: false,
      },
      lazy: false,
    };
    return maskModel;
  }

  webPage() {
    let maskModel = {
      // mask: 'urle',:{
      mask: "{www.}urle{.}com{/}",
      lazy: false,
      blocks: {
        urle: {
          mask: /^\w+$/,
        },
        com: {
          mask: /^\w+$/,
        },
        lazy: false,
      },
    };

    return maskModel;
  }


  userRedes(){

    let patternMask = {
      mask: "{@}string",
      blocks: {
        string: {
          // nested masks are available!
          // mask: /^\w+$/,
          mask: /^\w+$/,
        },
        lazy: false,
      },

      lazy: false,
    };

    return patternMask;

  }



  validUrl(url: string){


    let l = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    return l.test(url);

  }




  checkUrl(s) {
    var regexp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
  return regexp.test(s); }



    minSelectCheckBox(min: number ,modelo: any, max: number = null){

      let n = 0;

      modelo.forEach( async (ele,idx) => {

        if( ele.checked == true ){
          n++;
        }

      });

      if(
        ( (min != null) &&  (n < min)) ||
        ( (max != null) && (n > max)) ||
        (n == 0)
      ){

        return true;

      }else{
        return false;
      }

    }


    emptyField(id){

      // document.getElementById('fechaPautas')
      // //console.log('emptyfield', id);
      // let l: any = document.getElementById(id).value;
      let l: any = (document.getElementById(id) as HTMLInputElement).value;

      if(l == '' || l == null){
        return true;
      }else{
        return false;
      }


    }


}
