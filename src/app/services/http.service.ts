import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, mergeMap, Observable, Subject, tap} from 'rxjs';
import { Entities,  } from '../interfaces/entities';
import { User } from '../interfaces/user';
import {GetUser} from "../interfaces/getUser";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly getUserDefault = {
    search: "",
    sortBy: "email",
    sortDirection: "asc",
    pageIndex: 0,
    pageSize: 20,
    includes: [],
    excludes: [],
}

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
  .pipe(map((data:any)=> data ['data']['entities']))
}

  public addUser(userData:User): Observable<any> {
    return this.saveUser(userData).pipe(
      mergeMap((data) => {
      console.log(data, "BEFORE")
        return this.getUsers;
    }),
      tap(data => {
        console.log(data, 'AFTER')
      })
    )
  }

public saveUser(userData:User):Observable<any>{
  return this._http.post<{data:User}>('https://development.api.optio.ai/api/v2/admin/users/save' ,userData)
}

public get getUsers(): Observable<User> {
  return this._http.post<{data:User}>('https://development.api.optio.ai/api/v2/admin/users/find', this.getUserDefault)

    .pipe(

      map((data: any) => data.data.entities),

      tap((data) => {
      console.log(data, 'AFTER')
    }))
}
  public findUser(value: GetUser): Observable<{ data: { entities: User[],  total: number } }>{
    return this._http.post<{data: {entities: User[], total: number}}>("https://development.api.optio.ai/api/v2/admin/users/find", value);
  }

}
