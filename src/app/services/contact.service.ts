import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {global} from  './global';

@Injectable()
export class ContactService {

  public url: string;

  constructor (
    public _http: HttpClient
  ) {
    this.url = global.url;
  }

  contact(message): Observable<any> {
    let json = JSON.stringify(message);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'contact', json, {headers:headers});
  }
}
