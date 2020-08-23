// constante de peticion de servicios.
// export const _SERVICIOS = 'http://167.114.113.140:3031';
// export const _SERVICIOS = 'http://167.114.113.140:3031';
//
var siteurl = '';
var urle = '';
if (window.location.href.indexOf("localhost") != -1){
    // production LOCALHOST
    // urle = 'http://localhost:5150';
    // DEVELOPER LOCALHOST
    urle = 'http://localhost:5160';
    siteurl = 'http://localhost:4200/#';


}else{
    // PRODUCCION URL
    urle = 'https://api.mercadopyme.co';
    siteurl = 'https://mercadopyme.co/#';
    // DEVELOPER URL
    //  urle = 'https://api-pymes.forgesystem.com';
}
// urle = 'https://api.mercadopyme.co';
export const _SERVICIOS = urle;


export const _SITEURL = siteurl;

export const _NAMEPAGE = 'Mercado Pyme';

export const _EPAYCOSERIAL = '63416376ae532ed2a270ef8a0833543b';

export const _VERIFYEPAYCOURL = "https://api.secure.payco.co/validation/v1/reference";