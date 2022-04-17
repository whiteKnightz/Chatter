import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(private router: Router) {
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
    if (this.formGroup.valid){

    }else {
      window.alert("Invalid login!")
    }
  }
}
