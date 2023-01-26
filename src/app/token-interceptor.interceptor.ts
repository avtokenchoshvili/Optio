import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,

} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

private auth_token  = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImludGVybnNoaXBAb3B0aW8uYWkiLCJzdWIiOiIzOTg3NjY3MzE3MzQ4OTgzIiwiaWF0IjoxNjczNTI3NzMyLCJleHAiOjE2NzUyNTU3MzJ9.ss2VWdlLDTJYa2rOXfffwnaMJIIeEB7DwkSVsl8xcTjheFu8ATS4eoCtzP5lDYRxQSaG7JXi8FhCRFivMSkSgg';
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler)
  : Observable<HttpEvent<any>> {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(this.auth_token)}`
    };
    const authrequest = request.clone({ setHeaders: headers });
    return next.handle(authrequest);
  }
}
