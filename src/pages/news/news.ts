import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApibtcProvider} from '../../providers/apibtc/apibtc';

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  providers: [ApibtcProvider],
  templateUrl: 'news.html',
})
export class NewsPage {

  constructor(public navCtrl: NavController, public apibtc:ApibtcProvider, public navParams: NavParams) {
  }

    newdetail:Boolean = false;

    newmain = {
      'id':'',
      'title':'',
      'imageurl':'',
      'body':'',
      'source':'',
      'url':''
    };

    Loadnew(idnew){
      console.log('filtrar:'+idnew);
      var filtrado = [];
      this.newdetail = true;
      filtrado = this.listnews.filter(llega => llega.id===idnew);
      console.log(filtrado);
      this.newmain.id =filtrado[0].id;
      this.newmain.title =filtrado[0].title;
      this.newmain.imageurl =filtrado[0].imageurl;
      this.newmain.body =filtrado[0].body;
      this.newmain.source =filtrado[0].source;
      this.newmain.url =filtrado[0].url;
    }
    
    Close(){
      this.newdetail = false;
    }

  

  listnews:any = [];
  getNews(){
    this.apibtc.LastNews().subscribe(news=>{
        this.listnews = news;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
    this.getNews();
  }

}

