import { Component } from '@angular/core';

import { Events } from 'ionic-angular';
import {ApibtcProvider} from '../../providers/apibtc/apibtc';

/**
 * Generated class for the Graph1yearComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'graph1year',
  providers:[ApibtcProvider],
  templateUrl: 'graph1year.html'
})
export class Graph1yearComponent {


  constructor(public apibtc:ApibtcProvider, public events: Events) {
    this.Get1y();
  }

  public lineChartData:Array<any> = [
    {data: [], label: 'Series A'}
  ];

  ultimas10btc:any = [];
  ultimo1y:any = [];

  public lineChartLabels:Array<any> = [];

  public lineChartOptions:any = {
    responsive: true
  };



  Get1y:any = function(){
    

    this.apibtc.Price1y().subscribe(precios =>{
          this.ultimas10btc[0] = {data: new Array()}; 
          this.lineChartData = [];
          for(let i=0; i<53; i++){
            this.ultimas10btc[0].data.push(Math.round(precios[i].close));
          }
          this.lineChartData = this.ultimas10btc;
          //console.log(this.lineChartData);
          this.primer = this.lineChartData[0].data[0];
          //console.log('primer: '+this.primer);
          var numdec = ((this.btcusd / this.primer) - 1)*100;
          this.variacion = numdec.toFixed(2);
          //this.ultimas10btc[12].data.push(Math.round(this.btcusd));
      });
        //labels Hours
    this.apibtc.Price1y().subscribe(precios =>{
            this.ultimo1y = [];
            for(let i=0; i<53; i++){
            var dd = new Date(precios[i].time*1000);
            var dia = dd.getDate();
            var mes = dd.getMonth()+1;
            //console.log(precios[i].time*1000+' = '+ dia +'/'+mes);
            this.ultimo1y.push(dia+'/'+mes);
          }
          this.lineChartLabels = this.ultimo1y;
          //console.log(this.lineChartLabels);
          
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

      
      public chartClicked(e:any):void {
        console.log(e);
      }
     
      public chartHovered(e:any):void {
        console.log(e);
      }




}
