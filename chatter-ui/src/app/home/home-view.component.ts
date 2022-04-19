import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
  isLoggedIn = false
  username: any = null
  name: any = null


  constructor(private router: Router, public route: ActivatedRoute,) {
  }

  ngOnInit(): void {
    this.name = window.sessionStorage.getItem('name')
    this.username = window.sessionStorage.getItem('username')
    if (this.name && this.username && this.name.trim().length > 0 && this.username.trim().length > 0) {
      this.isLoggedIn = true
    }

    if (!this.isLoggedIn) {
      this.username = null;
      this.name = null;
      this.isLoggedIn = false;
      this.router.navigate(['/login'])
    }
  }

  logout() {
    window.sessionStorage.removeItem('name')
    window.sessionStorage.removeItem('username')
    this.router.navigate(['/login'])
  }
}
