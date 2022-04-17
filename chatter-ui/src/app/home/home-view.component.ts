import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
  isLoggedIn = false


  constructor(private router: Router,) {
  }

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login'])
    }
  }

}
