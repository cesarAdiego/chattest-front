import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
    constructor(private cookieService: CookieService) {}

        intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            let clonedRequest = req.clone({headers: req.headers.append("Accept-Language", this.cookieService.get('lang'))});

            return next.handle(clonedRequest);
        }
}