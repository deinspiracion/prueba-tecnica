import { Component, NgModule } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http'
import { DetallesPage } from '../detalles/detalles';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  personal = []
  aux = []
  constructor(public navCtrl: NavController,
              public http : HttpClient,
              public modal : ModalController) {
    
    const URL = 'https://my-json-server.typicode.com/HaibuSolutions/prueba-tecnica-sf/user'
    

    this.http.get(URL)
    .subscribe( ( data:any ) =>{
      this.personal = data
      this.letraInicial()
    } , ( error )=>{
      console.error(error)
    } )

    

    // tambien se puede utlizar fetch 

    // fetch(URL).then( res => res.json() )
    // .then( data => console.log(data) )
    // .catch( err => console.error(err) )

    
  }

  letraInicial(){
    this.personal.map(per=>{
      let inicial = per.nombre.charAt(0)
      return per['inicial']=inicial
    })
    console.log(this.personal);
    this.aux = this.personal
  }



  buscar(even){
    
    let textoBuscar = even.target.value || ''
    this.personal = this.aux
    if(textoBuscar.trim() !== ''){
        this.personal = this.personal.filter((per)=>{
        let nombreCompleto = per.nombre + ' ' + per.apellido
        return nombreCompleto.toLowerCase().indexOf(textoBuscar.toLowerCase()) >= 0
      })
    }


  }

  verDetalle(index){
    console.log(index);
    let item = this.personal[index]
    this.modal.create(DetallesPage,{item}).present()
    
  }

}
