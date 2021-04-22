import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/services/user.service";

@Injectable()
export class BackofficeGuard implements CanLoad {
    constructor(
        private readonly userSvc: UserService,
        private readonly router: Router
    ) {
        //
    }
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.userSvc.isLogged) {
            return true;
        } else {
            return this.router.parseUrl('/login');
        }
    }
}
