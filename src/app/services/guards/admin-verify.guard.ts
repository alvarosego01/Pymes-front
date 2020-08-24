import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";

@Injectable({
  providedIn: "root",
})


export class AdminVerifyGuard implements CanActivate, CanActivateChild {
  constructor(
    public _usuarioService: UsersService,
    public router: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (this._usuarioService.estaLogueado()) {
      // //////////// //////////////console.log("Paso el guard");

      if (this._usuarioService.roleName == "Administrador") {
        ////// //////////////console.log('es admin');
        return true;
      } else {
        this.router.navigate(["/dashboard"]);
        return false;
      }
    } else {
      // //////////// //////////////console.log('Bloqueado por el guard');
      // si falla entonces lleva al login
      this.router.navigate(["/us"]);
      return false;
    }

  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
