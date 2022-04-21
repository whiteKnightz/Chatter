import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChatterService} from "../service/chatter.service";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Chat, Correspondence} from "../shared/utils";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeViewComponent implements OnInit {
  isLoggedIn = false
  username: any = null
  name: any = null
  users: any[] = []
  chats: any[] = []
  formGroup: FormGroup = new FormGroup({});


  constructor(private router: Router, public route: ActivatedRoute, private service: ChatterService, private cdRef: ChangeDetectorRef,) {
  }

  ngOnInit(): void {
    this.name = window.sessionStorage.getItem('name')
    this.username = window.sessionStorage.getItem('username')
    this.service.getUsers().subscribe(value => {
      this.users = value.filter(value1 => value1.username !== this.username);
      this.cdRef.detectChanges();
    })
    this.service.getChats(this.username).subscribe(value => {
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

  loadChat(chatDetails: any) {
    this.service.getChatsById(chatDetails.chat_id).subscribe(value => this.setFormControl(value))
  }

  setFormControl(data: Chat) {
    let correspondences: any[] = [];
    if (!!data && !!data.gcs && data.gcs.length > 0) {
      data.gcs.map(value => correspondences.push(
        new FormControl({
          correspondence_id: value.correspondence_id,
          created_date: value.created_date,
          message: value.message,
          sender: value.sender,
          chat: value.chat,
        })
      ));
    }
    this.formGroup = new FormGroup({
      chat: new FormGroup({
        chat_id: new FormControl(data.chat.chat_id, []),
        sender: new FormControl(data.chat.sender, []),
        receiver: new FormControl(data.chat.receiver, []),
      }),
      gcs: new FormArray(correspondences),
      message: new FormControl('', [])
    })
    this.cdRef.detectChanges();
    const element = document.getElementById('conversation-list-div');
    if (!!element) {
      element.scrollTop = element.scrollHeight;
    }
  }

  showChatDiv() {
    // @ts-ignore
    return !!this.formGroup && !!this.formGroup.get('gcs') && !!this.formGroup.get('chat')
  }

  getTo() {
    return this.formGroup.get('chat')?.value.sender !== this.username ?
      this.formGroup.get('chat')?.value.sender :
      this.formGroup.get('chat')?.value.receiver
  }

  getChatMgsSummary(chat: any) {
    let message = chat.chats[chat.chats.length - 1].message;
    let msg = ''
    if (message.length > 16) {
      msg = `${message.replace(/(\n)/g, ' ').substring(0, 16)}...`
    } else {
      msg = message.replace(/(\n)/g, ' ')
    }
    return msg;
  }

  loadChatForUser(user: any) {
    this.service.findForPerson([user.username, this.username]).subscribe(value => {
      if (!!value.data && !!value.data.chat) {
        this.setFormControl(value.data);
      } else {
        this.setFormControl(
          {
            chat: {
              sender: this.username,
              receiver: user.username,
              chat_id: ''
            },
            gcs: []
          }
        )
      }
    })
  }
}
