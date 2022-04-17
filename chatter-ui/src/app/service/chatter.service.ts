import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from "rxjs/operators";

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
}
