import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';


import { Events } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import {ApibtcProvider} from '../../providers/apibtc/apibtc';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
import {NewsPage} from '../news/news'

@Component({
  selector: 'page-home',
  providers:[ApibtcProvider],
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  btcusd:number;
  now:any;
  lastprice:any;
  DevMode:Boolean = false;
  changemode:Boolean = false;
  mensaje:string;
  alarmstatus:boolean;
  timegraph:string ="graph24h";

  constructor(public navCtrl: NavController, private plt:Platform, public alertCtrl:AlertController, public backgroundMode: BackgroundMode, public apibtc:ApibtcProvider, private localNotifications: LocalNotifications, private storage: Storage, public events: Events) {
    
    events.subscribe('user:created', (user, time) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome', user, 'at', time);
    });
    
  }

  goToOtherPage:any =function() {
    //push another page onto the history stack
    //causing the nav controller to animate the new page in
    this.navCtrl.push(NewsPage);
  }


    SavePrice(){
      this.storage.set('lastprice', this.btcusd);
    }
    ShowPrice(){
      this.storage.get('limits').then((res)=>{
        this.lastprice = res;
      })
    }
    SaveLimit(){
      this.storage.set('limits', this.dualValue2);
    }
   
  PriceNotification(){
    this.localNotifications.schedule({
      id:1,
      title: 'Price Limit Alert',
      text:'Price Bitcoin: $'+this.btcusd+' USD',
      sound: 'file://assets/sounds/kling.mp3',
      data:{ mydata: 'Price limit has been reached: $'+this.btcusd+' USD'},
      at: new Date(new Date().getTime() + 5 * 1000),
      led: 'FF0000'
    })
  }

  PriceNotificationDown(){
    this.localNotifications.schedule({
      id:1,
      title: 'Price Limit Alert LOW',
      text:'Price Bitcoin: $'+this.btcusd+' USD',
      sound: 'file://assets/sounds/kling.mp3',
      data:{ mydata: 'Price limit has been reached: $'+this.btcusd+' USD'},
      at: new Date(new Date().getTime() + 5 * 1000),
      led: 'FF0000'
    })
  }

  PriceNotificationUp(){
    this.localNotifications.schedule({
      id:1,
      title: 'Price Limit Alert HIGH',
      text:'Price Bitcoin: $'+this.btcusd+' USD',
      sound: 'file://assets/sounds/kling.mp3',
      data:{ mydata: 'Price limit has been reached: $'+this.btcusd+' USD'},
      at: new Date(new Date().getTime() + 5 * 1000),
      led: '00FF00'
    })
  }
  
    TestLoad(){
      console.log('carga test');
    };

  ahora:any = function(){
    console.log('esstado bgmode : '+this.backgroundMode.isEnabled());
    this.apibtc.PriceNow().subscribe(now=>{
      this.btcusd= now.USD;
    });
    if(this.dualValue2.upper < this.btcusd ){
      this.PriceNotificationUp();
    }
    if(this.dualValue2.lower > this.btcusd ){
      this.PriceNotificationDown();
    }
  };

  dualValue2:any = { upper:7000,
  lower: 5000};
 
  // lineChart
  public lineChartData:Array<any> = [
    {data: [], label: 'Series A'}
  ];

  ultimas10btc:any = [];
  ultimas10hrs:any = [];

  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true
  };

  variacion:any;

   Get10Hrs:any = function(){

    console.log('cargando graficos...');
    this.apibtc.Price10h().subscribe(precios =>{
      this.ultimas10btc[0] = {data: new Array()}; 
      this.lineChartData = [];
      for(let i=0; i<25; i++){
        this.ultimas10btc[0].data.push(Math.round(precios[i].close));
      }
      this.lineChartData = this.ultimas10btc;
      console.log(this.lineChartData);
      this.primer = this.lineChartData[0].data[0];
      console.log('primer: '+this.primer);
      var numdec = ((this.btcusd / this.primer) - 1)*100;
      this.variacion = numdec.toFixed(2);
    });
    //labels Hours
      this.apibtc.Price10h().subscribe(precios =>{
        this.ultimas10hrs = [];
        for(let i=0; i<25; i++){
        var dd = new Date(precios[i].time*1000);
        var hh = dd.getHours();
        var mm = dd.getMinutes();
        if(mm==0){
        this.ultimas10hrs.push(hh+':00');  
        } else {
        this.ultimas10hrs.push(hh+':'+mm);
        }
      }
      this.lineChartLabels = this.ultimas10hrs;
      console.log(this.lineChartLabels);
      this.lineChartLabels.label = 'BTC';
    });
  }


  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = false;
  public lineChartType:string = 'line';
 
  testcarga:any = function(){
    setInterval(()=> {
      this.Get10Hrs();
      this.ahora();
    },40000); 
  }
 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

  toNews(){
    this.navCtrl.push(NewsPage);
  }

  that:any = this.apibtc;
  ngOnInit(){
    this.backgroundMode.enable();
    console.log('estado bgmode : '+this.backgroundMode.isEnabled());
    this.ahora();
    this.Get10Hrs();
    setInterval(()=> {
      this.Get10Hrs();
      console.log('carga grafico?');
      this.ahora();
    },60000);
    this.storage.get('limits').then((res)=>{
      if(res!=null){
      this.dualValue2.upper = res.upper;
      this.dualValue2.lower = res.lower;
     console.log('lower :'+ res.lower);
     console.log('upper :'+ res.upper);
    }
    });
    this.storage.get('alarmstatus').then((res)=>{
      if(res!=null){
        this.alarmstatus = res;
    } else {
      this.alarmstatus = true;
    }
    });
  }

}

