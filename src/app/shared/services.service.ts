import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../interfaces/role';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
constructor (private _http:HttpClient ) {

}
public getRoles():Observable<Role> {
  return this._http.post<Role>("https://development.api.optio.ai/api/v2/reference-data/find", {
    "typeId": 4,
    "sortBy": "name",
    "sortDirection": "asc",
    "pageIndex": 0,
    "pageSize": 50,
    "includes": [
      "code", "name"
    ]
  })
}

}
