import { Component, ViewChild, OnInit } from '@angular/core';
import { Events } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';

import { Nav } from 'ionic-angular';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApibtcProvider } from '../providers/apibtc/apibtc';
import { Storage } from '@ionic/storage';


import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { NewsPage } from '../pages/news/news';

@Component({
  providers:[ApibtcProvider],
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  btcusd:number;
  now:any;
  lastprice:any;
  DevMode:Boolean = false;
  changemode:Boolean = false;
  status:boolean;
  language:string;
  currency:string;
  graphtype:string;

  constructor(public platform: Platform, public statusBar: StatusBar, public apibtc:ApibtcProvider, public events: Events, private storage: Storage, public splashScreen: SplashScreen,  public alertCtrl:AlertController, public backgroundMode: BackgroundMode, private localNotifications: LocalNotifications) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'News', component: NewsPage }
    ];

    this.storage.get('alarmstatus').then((res)=>{
      if(res!=null){
      this.status = res;
    }
    });
    this.storage.get('language').then((res)=>{
      if(res!=null){
      this.language = res;
    }
    });
    this.storage.get('currency').then((res)=>{
      if(res!=null){
      this.currency = res;
    }
    });

  }
    ChangeStatus:any = function(){
      this.storage.set('alarmstatus', this.status);
    }

    ChangeLanguage:any = function(){
      this.storage.set('language', this.language);
    }
    ChangeCurrency:any = function(){
      this.storage.set('currency', this.currency);
    }
    ChangeGraph:any = function(){
      this.storage.set('graphtype', this.graphtype);
    }
  createUser() {
    console.log('User created!')
    this.events.publish('user:created', 'Juan', Date.now());
  };

  initializeApp() {
    this.platform.ready().then(() => {

      this.platform.pause.subscribe(() => {
        console.log('estado pause');
        setInterval(()=> {
          this.ahora();
        },60000); 
    });
    this.platform.resume.subscribe(() => {
      console.log('[INFO] App resumed');
  });
    this.localNotifications.on('click', (notification, state) => {
      let json = JSON.parse(notification.data);
 
      let alert = this.alertCtrl.create({
        title: notification.title,
        subTitle: json.mydata
      });
      alert.present();
    })
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }


// Nuevo


ShowPrice(){
  this.storage.get('limits').then((res)=>{
    this.lastprice = res;
  });
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


RefreshLimit(){
  this.storage.get('limits').then((res)=>{
    if(res!=null){
    this.dualValue2.upper = res.upper;
    this.dualValue2.lower = res.lower;
   console.log('lower :'+ res.lower);
   console.log('upper :'+ res.upper);
  }
});
}

ahora:any = function(){
  console.log('esstado bgmode : '+this.backgroundMode.isEnabled());
  
      this.apibtc.PriceNow().subscribe(now=>{
        this.btcusd= now.USD;
        console.log('new actual price: '+this.btcusd);
      });

      this.storage.get('limits').then((res)=>{
        if(res!=null){
      console.log('lower :'+ res.lower );
      console.log('upper :'+ res.upper);
      if(res.upper < this.btcusd ){
        this.PriceNotificationUp();
      }
      if(res.lower > this.btcusd ){
        this.PriceNotificationDown();
      }

      }
    });
};

ultimas10btc:any = [];
ultimas10hrs:any = [];

/*Get10Hrs:any = function(){
  console.log('cargando...');
  this.apibtc.Price10h().subscribe(precios =>{
    this.ultimas10btc[0] = {data: new Array()}; 
    for(let i=0; i<25; i++){
      this.ultimas10btc[0].data.push(Math.round(precios[i].close));
    }
    this.lineChartData = this.ultimas10btc;
      });
      //labels Hours
        this.apibtc.Price10h().subscribe(precios =>{
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
        this.lineChartLabels.label = 'BTC';
      });
}*/

testcarga:any = function(){
    setInterval(()=> {
      this.ahora();
    },40000); 
  };

//Fin NUevo

dualValue2:any = { upper:7000,
  lower: 5000};


ngOnInit(){

  this.backgroundMode.enable();
  console.log('esstado bgmode : '+this.backgroundMode.isEnabled());
  this.ahora();
//  this.Get10Hrs();
//  this.testcarga();

  this.storage.get('limits').then((res)=>{
    if(res!=null){
    this.dualValue2.upper = res.upper;
    this.dualValue2.lower = res.lower;
   console.log('lower :'+ res.lower);
   console.log('upper :'+ res.upper);
  }
  });



  }


}
