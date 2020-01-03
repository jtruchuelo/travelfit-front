import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {global} from  './global';

@Injectable()
export class UserService {

  public url: string;
  public userToken: string;
  public identity;

  constructor (
    public _http: HttpClient
  ) {
    this.url = global.url;
  }

  register(user): Observable<any> {
    let json = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'register', json, {headers:headers});
  }

  login(user, userToken = null): Observable<any> {
    if (userToken != null ) {
      user.userToken = 'true';
    }

    let json = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url+'login', json, {headers:headers});
  }

  logout(token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    // console.log(headers);
    return this._http.post(this.url+'logout',null, {headers:headers});
  }

  update (user, token): Observable<any> {
    let json = JSON.stringify(user);

    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization', token);

    return this._http.put(this.url + 'users/' + user.user_id, json, {headers:headers});
  }

  getIdentity(){
    let identity = JSON.parse(localStorage.getItem('identity'));

    if(identity && identity != "undefined"){
      this.identity = identity;
    }else{
      this.identity = null;
    }

    return this.identity;
  }

  getToken(){
    let userToken = localStorage.getItem('userToken');

    if(userToken && userToken != "undefined"){
      this.userToken = userToken;
    }else{
      this.userToken = null;
    }

    return this.userToken;
  }
}
