import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatSupportService {

  // allCheckoutsData: Checkout[];
  ChatData: any;


  constructor(public _http: HttpClient) { }



  getChatSupport(keyword: any) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');

    return this._http.get(environment.apiURL + '?ajax=true&livesearch=true&s=' + keyword, { headers: headers, responseType: 'text' })
  }

  getArticle(url: any) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain');

    return this._http.get(url, { headers: headers, responseType: 'text' })
  }


}
