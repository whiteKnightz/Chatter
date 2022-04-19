import {Inject, Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";
import {SignupRequest} from "../shared/utils";

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

  registerUser(request: SignupRequest): Observable<any>{
    console.log(request)
    const option = {'Content-Type': 'application/json', 'body' : JSON.stringify(request), headers: new HttpHeaders().set('Content-Type', 'application/json')};
    return this.http.request('POST','http://localhost:8000/user/', option)
  }
}
