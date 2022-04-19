import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatterService} from "../service/chatter.service";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(private router: Router, private service: ChatterService) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  goToSignUp() {
    this.router.navigate(['/signup'])
  }

  tryLogin() {
    const value = this.formGroup.value;
    if (this.formGroup.valid) {
      this.service.login(value).subscribe(value1 => {
        if (value1.data?.Authenticated) {
          window.sessionStorage.setItem('name', value1.data.name)
          window.sessionStorage.setItem('username', value1.data.username)
          this.router.navigate(['/home'])
        } else {
          window.alert("Invalid login!")
        }
      }, () => window.alert("Invalid login!"))
    } else {
      window.alert("Invalid login!")
    }
  }
}
