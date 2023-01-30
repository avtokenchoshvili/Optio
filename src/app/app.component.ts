import {Component} from '@angular/core';
import {HttpService} from "./services/http.service";
import {Observable} from "rxjs";
import {User} from "./interfaces/user";
import {GetUser} from "./interfaces/getUser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  public users$: Observable<any>

  constructor(private httpService: HttpService) {
    this.users$ = httpService.getUsers;
  }

}
