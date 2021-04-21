import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  loading = false;
  showError = false;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.loading = true;
    this.showError = false;
    this.userService.login(this.form.value.email, this.form.value.password).subscribe(
      (res) => {
        this.loading = false;
        this.router.navigateByUrl("/home");
      },
      (error) => {
        this.loading = false;
        this.showError = true;
      }
    );
  }
}
