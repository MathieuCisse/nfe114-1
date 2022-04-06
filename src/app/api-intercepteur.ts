import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class ApiIntercepteur implements HttpInterceptor {
  jwtToken: String = '';
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.jwtToken != '') {
      req = req.clone({ setHeaders: { Authorization: `Bearer ${this.jwtToken}` }});
    }

    return next.handle(req).pipe(tap(
      (evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {

          let tab: Array<String> ;
          const enteteAuthorization = evt.headers.get('Authorization');
          if (enteteAuthorization != null ) {
            tab = enteteAuthorization.split(/Bearer\s+(.*)$/i);
            if (tab.length > 1) {
              this.jwtToken = tab [1]; }
          }

        }
      }, ( error: HttpErrorResponse ) =>  {
        switch (error.status) {
          case 401 :
            this.router.navigate(['/client/signin']);
            break;
          default :
            console.log ('ERROR !!!!!');
        }
      }
    ) );
  }
}
