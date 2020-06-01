import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Filebase64Service {

  constructor() { }



getFormatBase64(image){

	const body = {profilepic: image };
let mimeType = body.profilepic.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];


const body2 = {profilepic: image};
let mimeType2 = body2.profilepic.match(/[^:/]\w+(?=;|,)/)[0];

	var l = {
		allFormat: mimeType,
		smallFormat: mimeType2
	}

	return l;


}


getImageDimensions(file) {
  return new Promise (function (resolved, rejected) {
    var i = new Image()
    i.onload = function(){
    	var l = {
    		width: i.width,
    		height: i.height
    	}
      resolved(l);
    };
    i.src = file
  })
}


}
