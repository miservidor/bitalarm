import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApibtcProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApibtcProvider {

  constructor(public http: Http) {
    console.log('Hello ApibtcProvider Provider');
    this.http = http;
  };
 priceusd:any;

PriceNow:any = function(){
   return this.http.get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR", this.options).map(res=>res.json());

/*
  this.http.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,EUR", this.options).subscribe(data => {
      this.priceusd = data.USD;
      console.log(data);
      var usd = JSON.parse(data._body)
      console.log(usd.USD);
      var datousd = usd.USD;
      localStorage.setItem('lastethusd', datousd);
      return Promise.resolve(datousd);
        }, error => {
            console.log("ERROR");
        });*/
};

Price10h:any = function(){
  console.log('ejecuto price 10h');
   return this.http.get("https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=24&aggregate=1&e=CCCAGG", this.options).map(res=>res.json().Data);
}

Price30d:any = function(){
  return this.http.get("https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=30&aggregate=1&e=CCCAGG", this.options).map(res=>res.json().Data);
}

Price1y:any = function(){
  return this.http.get("https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&limit=52&aggregate=7&e=CCCAGG", this.options).map(res=>res.json().Data);
}

LastNews:any = function(){
  return this.http.get("https://min-api.cryptocompare.com/data/news/", this.options).map(res=>res.json());;
}

Cadaminuto:any = function(){
setInterval(this.Price10h, 10000);
}

Price24h:any = function(){
  return this.http.get("https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=24&aggregate=1&e=CCCAGG", this.options).map(res=>res.json().Data);
}
  
}
