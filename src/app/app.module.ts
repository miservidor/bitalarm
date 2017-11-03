import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { PipesRoundPipe } from '../pipes/pipes-round/pipes-round';
import {JsdatePipe} from '../pipes/jsdate/jsdate';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { environment } from '../environments/environments';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { NewsPage } from '../pages/news/news';
import { Graph24Component } from '../components/graph24/graph24';
import { Graph30dComponent } from '../components/graph30d/graph30d';
import { Graph1yearComponent } from '../components/graph1year/graph1year';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApibtcProvider } from '../providers/apibtc/apibtc';
import { ChartsModule } from 'ng2-charts';
import { LocalNotifications } from '@ionic-native/local-notifications';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    NewsPage,
    Graph24Component,
    Graph30dComponent,
    Graph1yearComponent,
    PipesRoundPipe,
    JsdatePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Graph24Component,
    Graph30dComponent,
    Graph1yearComponent,
    HomePage,
    NewsPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundMode,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApibtcProvider
  ]
})
export class AppModule {}
