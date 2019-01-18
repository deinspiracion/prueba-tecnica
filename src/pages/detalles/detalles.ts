import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';



@Component({
  selector: 'page-detalles',
  templateUrl: 'detalles.html',
})
export class DetallesPage {
  item:any;
  fechaIncorrecta= false;
  rutIcorrecto = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public View: ViewController) {

    this.item = this.navParams.get('item')
    this.fechaIncorrecta = this.validarFecha(this.item.fechaNacimiento)
    this.rutIcorrecto = this.validaRut(this.item.rut);
   
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallesPage');
  }

  cerrar(){
    this.View.dismiss()
  }

  validaRut (rutCompleto) {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( rutCompleto ))
        return false;
    var tmp 	= rutCompleto.split('-');
    var digv	= tmp[1]; 
    var rut 	= tmp[0];
    if ( digv == 'K' ) digv = 'k' ;
    return (this.dv(rut) == digv );
  }
  
  dv(T){
    var M=0,S=1;
    for(;T;T=Math.floor(T/10))
        S=(S+T%10*(9-M++%6))%11;
    return S?S-1:'k';
  }


  validarFecha(f){
    let fecha =  f.split("/")
    let dia = fecha[0]
    let mes = fecha[1]
    let anio = fecha[2]
    let diaValid = new Date(anio,mes,0)
    console.log(diaValid);
    
    if( (mes > 12 || mes < 1) || ( anio < 0 ) && ( dia > diaValid || dia < 1 )   ){
      return true
    }

    return false;

  }

}
