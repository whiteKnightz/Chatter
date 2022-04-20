import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChatterService} from "../service/chatter.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeViewComponent implements OnInit {
  isLoggedIn = false
  username: any = null
  name: any = null
  users: any[] = []
  chats: any[] = []


  constructor(private router: Router, public route: ActivatedRoute, private service: ChatterService, private cdRef: ChangeDetectorRef,) {
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe(value => {
      this.users = value.filter(value1 => value1.username!==this.username);
      this.cdRef.detectChanges();
    })
    this.service.getChats().subscribe(value => {
      if (!!value.chat && value.chat.length > 0) {
        for (let i = 0; i < value.chat.length; i++) {
          let chat_value = value.chat[i];
          if (!!value[chat_value['chat_id']]) {
            chat_value['chats'] = value[chat_value['chat_id']]
          }
          this.chats.push(chat_value);
        }
        this.cdRef.detectChanges();
      }
    })
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
