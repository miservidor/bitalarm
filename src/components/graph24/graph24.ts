import { Component } from '@angular/core';

import { Events } from 'ionic-angular';
import {ApibtcProvider} from '../../providers/apibtc/apibtc';
/**
 * Generated class for the Graph24Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'graph24',
  providers:[ApibtcProvider],
  templateUrl: 'graph24.html'
})
export class Graph24Component {
 
  constructor(public apibtc:ApibtcProvider, public events: Events){
    this.Get24Hrs();
  }

  public lineChartData:Array<any> = [
    {data: [], label: 'Series A'}
  ];

  ultimas10btc:any = [];
  ultimas10hrs:any = [];

  public lineChartLabels:Array<any> = [];


  public lineChartOptions:any = {
    responsive: true
  };



  Get24Hrs:any = function(){
    
        console.log('cargando graficos...');
        this.apibtc.Price10h().subscribe(precios =>{
          this.ultimas10btc[0] = {data: new Array()}; 
          this.lineChartData = [];
          for(let i=0; i<25; i++){
            this.ultimas10btc[0].data.push(Math.round(precios[i].close));
          }
          this.lineChartData = this.ultimas10btc;
          //console.log(this.lineChartData);
          this.primer = this.lineChartData[0].data[0];
          //console.log('primer: '+this.primer);
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

  text: string;

}
