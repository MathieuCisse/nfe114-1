import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class FirstService {

  
  constructor(private httpClient : HttpClient) { 
    this.datas = new Array<string> ();  
  }

  cpt : number = 0;
  datas : string [];
  log (data) {
    this.datas.push (data);
    this.cpt++;
    console.log (this.cpt + "" +this.datas );
  }

  URL : string = "http://heroku...";

  public getCatalogue () : Observable<any> {
    return this.httpClient.get<any> (environment.baseUrl);
  }


}
