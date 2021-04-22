import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { UserService } from "src/app/services/user.service";
import { catchError } from "rxjs/operators";
import { MessageService } from "./services/message.service";

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    constructor(
        private readonly userService: UserService,
        private readonly msgSvc: MessageService
    ) {
        //
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const newReq = req.clone({
            url: environment.apiUrl + req.url,
            setHeaders: {
                Authorization: `Bearer ${this.userService.userToken}`
            }
        });
        return next.handle(newReq).pipe(
            catchError((error) => {
                let message = "";
                switch (error.status) {
                    case 0:
                        message = "Server error";
                        break;
                    case 403:
                        return;
                    default:
                        message = error.error;
                }
                this.msgSvc.showError(message);
                return throwError(error);
            })
        );
    }
}
