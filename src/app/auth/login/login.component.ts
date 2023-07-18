import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginRequestPayload } from 'src/app/interface/login-request.payload';
import { AuthService } from '../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string;
  isError = false;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router,
    private toastr: ToastrService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.loginRequestPayload = {
      username: '',
      password: ''
    }
    this.registerSuccessMessage = '';
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['registered'] === "true") {
        this.toastr.success('Sign up Successful');
        this.registerSuccessMessage = `Please Check your inbox for activation email
        activate your account before you Login!`;
      }
    })
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;
    this.authService.login$(this.loginRequestPayload).subscribe({
      next: res => {
        this.isError = false;
        this.router.navigateByUrl('/').then(() => {
          window.location.reload();
        });
      },
      error: res => {
        console.log("Login failed")
        this.isError = true;
      }
    });
  }
}
