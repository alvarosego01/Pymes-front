// constante de peticion de servicios.
// export const _SERVICIOS = 'http://167.114.113.140:3031';
// export const _SERVICIOS = 'http://167.114.113.140:3031';
//
var urle = '';
if (window.location.href.indexOf("localhost") != -1){
    // production LOCALHOST
    // urle = 'http://localhost:5150';
    // DEVELOPER LOCALHOST
    urle = 'http://localhost:5160';

}else{
    // PRODUCCION URL
    urle = 'https://api.mercadopyme.co';
    // DEVELOPER URL
    //  urle = 'https://api-pymes.forgesystem.com';
}
// urle = 'https://api.mercadopyme.co';
export const _SERVICIOS = urle;



export const _NAMEPAGE = 'Mercado Pyme';