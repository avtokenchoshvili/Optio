import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Entities,  } from '../interfaces/entities';


import { Role } from '../interfaces/role';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
constructor (private _http:HttpClient ) {

}
public getRoles():Observable<Entities[]> {

  const data = {
    "typeId": 4,
    "sortBy": "name",
    "sortDirection": "asc",
    "pageIndex": 0,
    "pageSize": 50,
    "includes": [
      "code", "name"
    ]
  }
  return this._http.post<Entities[]>("https://development.api.optio.ai/api/v2/reference-data/find",data )
  .pipe(map((data:any)=> data ['data']['entities'])

  )
}

public saveUser(userData:User):Observable<{data:User}>{
  return this._http.post<{data:User}>('https://development.api.optio.ai/api/v2/admin/users/save' ,userData)
}




}
