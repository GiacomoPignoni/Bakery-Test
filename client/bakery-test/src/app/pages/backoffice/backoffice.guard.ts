import { Injectable } from "@angular/core";
import { CanLoad} from "@angular/router";
import { UserService } from "src/app/services/user.service";

@Injectable()
export class BackofficeGuard implements CanLoad {
    constructor(
        private readonly userSvc: UserService
    ) {
        //
    }

    canLoad() {
        return this.userSvc.isLogged;
    }
  }