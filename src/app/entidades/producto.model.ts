export class Producto{
    codigoproducto?: number ;
	nombreproducto?: string ;
	descripcionproducto?: string ;
	precioproducto?: number ; 
	urlfoto?: string ;

	constructor(args:{
	codigoproducto: number ,
	nombreproducto: string ,
	descripcionproducto: string ,
	precioproducto: number ,
	urlfoto: string 
	}){
		this.codigoproducto = args.codigoproducto,
		this.nombreproducto = args.nombreproducto,
		this.descripcionproducto = args.descripcionproducto,
		this.precioproducto = args.precioproducto,
		this.urlfoto = args.urlfoto
	}
}