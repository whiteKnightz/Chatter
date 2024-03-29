import {Inject, Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {Chat, LoginRequest, SignupRequest} from "../shared/utils";

@Injectable({
  providedIn: 'root'
})
export class ChatterService {


  constructor(private http: HttpClient) {
  }

  getBroadcastEnabledConfig(): Observable<boolean> {
    return this.http.get<any>(
      `http:localhost:8000/api/v1/system-config/BROADCAST/configs/BROADCAST_ENABLED`
    ).pipe(map(r => r.value.toString() === 'true'));
  }

  getSuspendEnabledConfig(): Observable<boolean> {
    return this.http.get<any>(
      `http:localhost:8000/api/v1/system-config/COMMON/configs/ENABLE_ON_PROPERTY`
    ).pipe(map(r => r.value.toString() === 'true'));
  }

  getServices(): Observable<any[]> {
    return this.http.get<any[]>(
      `http:localhost:8000/idm/services`);
  }

  registerUser(request: SignupRequest): Observable<any> {
    const option = {
      'Content-Type': 'application/json', 'body': JSON.stringify(request),
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.http.request('POST', 'http://localhost:8000/api/auth/signup/', option)
  }

  login(request: LoginRequest): Observable<any> {
    const option = {
      'Content-Type': 'application/json', 'body': JSON.stringify(request),
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.http.request('POST', 'http://localhost:8000/api/auth/login/', option)
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8000/api/user/')
  }

  getChats(username: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8000/api/chat/search/byPerson/${username}/`)
  }

  getChatsById(id: string): Observable<Chat> {
    return this.http.get<Chat>(`http://localhost:8000/api/chat/${id}/`)
  }

  findForPerson(param: string[]): Observable<any> {
    const option = {
      'Content-Type': 'application/json', 'body': JSON.stringify(param),
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    return this.http.request('POST', 'http://localhost:8000/api/chat/search/byPerson/', option)
  }

  searchUserByName(userSearchKey: string): Observable<any[]> {
    return this.http.get<any>(`http://localhost:8000/api/user/searchByName/${userSearchKey}/`)
  }
}
