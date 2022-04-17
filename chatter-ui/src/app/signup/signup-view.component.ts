import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'signup-view',
  templateUrl: './signup-view.component.html',
  styleUrls: ['./signup-view.component.scss']
})
export class SignupViewComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      rePassword: new FormControl('', [Validators.required])
    });
  }

  trySignup() {
    const value = this.formGroup.value;
    if (this.formGroup.valid && value.password===value.rePassword){

    }else {
      window.alert("Invalid signup!")
    }
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }
}
