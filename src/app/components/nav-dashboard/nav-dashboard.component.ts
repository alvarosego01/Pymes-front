import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  QueryList,
  ViewChildren,
  AfterViewInit,
} from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import {   NotifyService } from "src/app/services/service.index";
import { GlobalConfigService } from 'src/app/services/-global-config.service';

@Component({
  selector: "app-nav-dashboard",
  templateUrl: "./nav-dashboard.component.html",
  styleUrls: ["./nav-dashboard.component.sass"],
})
export class NavDashboardComponent implements OnInit, AfterViewInit {
  @ViewChildren("navlink") navlink: QueryList<any>;

  directiveNavDashboard: boolean = false;

  constructor(
    public _usersService: UsersService,
    public GlobalConfigService: GlobalConfigService,
    public _notifyService: NotifyService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.adjustNavDashboard(window.innerWidth);
    // //// //////////////console.log(this.navlink);
  }

  logout() {
    this._usersService.logout();


    this._notifyService.Toast.fire({
      title: '¡Vuelva pronto!',
      icon: 'success'
    });

  }

  openLoginByAside() {
    this._usersService.loginVisible = !this._usersService.loginVisible;
  }

  @HostListener("window:resize")
  onResize() {
    // this.currentWindowWidth = window.innerWidth
    // ////// //////////////console.log(this.currentWindowWidth);
    // //// //////////////console.log('maldita sea', window.innerWidth
    // );
    this.adjustNavDashboard(window.innerWidth);
  }

  adjustNavDashboard(width) {
    // let width = window.innerWidth;
    // //// //////////////console.log(width);
    if (this.navlink != null) {
      if (width < 1000) {
        var l = this.navlink["_results"];
        l.forEach((element) => {
          element.nativeElement.setAttribute("data-widget", "pushmenu");

          // //// //////////////console.log(element.nativeElement);
        });
        // this.navlink.nativeElement.text = 'CULO';
        // //// //////////////console.log(this.navlink);
      } else {
        var l = this.navlink["_results"];
        l.forEach((element) => {
          element.nativeElement.removeAttribute("data-widget");

          // //// //////////////console.log(element.nativeElement);
        });
        // this.navlink.nativeElement.removeAttribute('data-widget');

        // ////// //////////////console.log(this.navlink);
      }
    }
  }

  closeAside(e) {
    // navBurgerUser
    let l = document.querySelectorAll("body")[0];

    if (
      // e.target['className'] != '' &&
      !e.target["className"].includes("navBurgerUser")
    ) {
      // // //////////////console.log(e);
      // if (l.classList.contains("sidebar-open")) {
        l.classList.remove("sidebar-open");
        l.classList.add("sidebar-collapse");
        l.classList.add("sidebar-closed");
      // }
    }
    // sidebar-closed sidebar-collapse
  }
}
