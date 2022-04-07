import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormulaireService {

  constructor(private httpClient: HttpClient) { }

  public postLogin(login: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };
    return this.httpClient.post<any>('/api/login', {login, password}, httpOptions);
  }
}
