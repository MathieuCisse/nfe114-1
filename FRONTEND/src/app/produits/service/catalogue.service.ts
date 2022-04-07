import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CatalogueService {


  constructor(private httpClient : HttpClient) {}

  public getCatalogue(catalog?: String) : Observable<any> {
    const filter: String = catalog.trim();
    if(filter && filter !== '') {
      this.httpClient.get<any>(environment.filterCatalogue + '/' + catalog);
    }
    else {
      return this.httpClient.get<any>(environment.catalogue);
    }
  }
}
