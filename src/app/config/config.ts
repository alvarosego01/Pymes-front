// constante de peticion de servicios.
// export const _SERVICIOS = 'http://167.114.113.140:3031';
// export const _SERVICIOS = 'http://167.114.113.140:3031';
//
var urle = '';
if (window.location.href.indexOf("localhost") != -1){
    urle = 'http://localhost:5160';
}else{
    urle = 'https://api.mercadopyme.co';
    // let  urle = 'http://167.114.113.140:5150';
}
// urle = 'https://api.mercadopyme.co';
export const _SERVICIOS = urle;