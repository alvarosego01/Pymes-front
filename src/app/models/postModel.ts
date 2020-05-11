

	// title:
	// {
	// 	type:String,
	// 	required:[true, 'Nombre de la publicación es necesario']
	// },

	// mail:
	// {
	// 	type:String,
	// 	required:[true, 'Se requiere un correo de contacto']
	// },

	// text:
	// {
	// 	type:String,
	// 	required:[true, 'La publicación debe poseer alguna descripción']
	// },

	// img:
	// {
	// 	type:String,
	// 	required:[true, 'La publicación debe poseer una imagen que mostrar']
	// },

	// type:
	// {
	// 	type:String,
	// 	require:[true, 'Debe definir el tipo de publicación'],
	// 	enum: tipo
	// },


	// department:
	// {
	// 	type: String,
	// 	required: [true, 'El departamento es necesario']
	// },
	// city:
	// {
	// 	type: String,
	// 	required: [true, 'La ciudad  es necesaria']
	// },
	// municipality:
	// {
	// 	type: String,
	// 	required: [true, 'El municipio es necesario']
	// },

	// price:
	// {
	// 	type:Number,
	// 	require:[true, 'Debe establecer un precio a la publicación']
	// },

	// phone:
	// {
	// 	type:String,
	// 	require:[true, 'Debe poseer un numero de contacto']
	// },

	// view:
	// {
	// 	type:Number ,
	// 	required:false,
	// 	default: 0
	// },//visitas a la publiacion

	// points:
	// {
	// 	type:Number,
	// 	required:false,
	// 	default: 0
	// }, //puntuacion de la publicacion

	// days:
	// {
	// 	type:Number,
	// 	required: false
	// },//dias en que estará activa la publicación

	// status:
	// {
	// 	type:Boolean,
	// 	required: false,
	// 	default: false
	// },//determinada por el admin si puede o no ser visible

	// user:
	// {
	// 	type:Scheme.Types.ObjectId,
	// 	ref:'User',
	// 	required: [true, 'Debe existir un usuario válido para publicar']
	// },//usuario dueño de la publicación

	// category:
	// {
	// 	type:String,
	// 	required:false
	// },//tipo de producto o servicio que se ofrece

	// verify_at:
	// {
	// 	type:String,
	// 	required:false,
	// 	default: null
	// },//fecha de cuando el admin revisó

	// created_at:
	// {
	// 	type:String,
	// 	default: Date('d-m-Y')
	// },//fecha de cuando fue creado

	// updated_at:
	// {
	// 	type:String,
	// 	required:false,
	// 	default: null
	// },//fecha de cuando fue modificado

	// comments:
	// {
	// 	type:Array,
	// 	required:false
	// },

	// reactions:
	// {
	// 	type:Array,
	// 	required:false
	// },

	// stars:
	// {
	// 	type:Array,
	// 	required:false
	// }



export class _PostModel {
    constructor(

        public title: string,
        public mail?: string,
        public phone?: string,
        public text?: string,
        public type?: string,
        public department?: string,
        public city?: string,
        public municipality?: string,
        public price?: string,
        public days?: string,
        public category?: string,
        public img?: string,
        public user?: string,
        public verify_at?: string,
        public created_at?: string,
        public updated_at?: string,
        public comments?: string,
        public reactions?: string,
        public stars?: string,
        public view?: string,
        public points?: string,
        public status?: string,

    ) {}
  }
