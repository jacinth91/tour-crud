import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpProviderService } from '../service/http-provider.service';
import { ToastrService } from 'ngx-toastr';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  useloginForm: loginForm = new loginForm();
  userRole:any

  @ViewChild("loginForm")
  loginForm!: NgForm;
    loading = false;
    submitted = false;
    USER_KEY = 'auth-user';

    constructor(
      private httpProvider: HttpProviderService,
       private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,

    ) { }

    ngOnInit() {
this.getUser()
    }

    // convenience getter for easy access to form fields
    onSubmit(){

    }

    HomeClick(isValid:any) {
      console.log(this.loginForm.value)
      this.httpProvider.logUserIn(this.loginForm.value).subscribe(async(data) =>{
        if (data != null && data.body != null) {
          this.saveUser(data);
          this.toastr.success('Log In Sucessfull')
          setTimeout(() => {
            this.router.navigate(['Home']);
          }, 500);
        }
      },
      async error => {
        this.toastr.error(error.message);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 500);
      });


    }
    clean(): void {
      window.sessionStorage.clear();
    }

    saveUser(user: any): void {
      window.sessionStorage.removeItem(this.USER_KEY);
      window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
     getUser(): any {
      const user = window.sessionStorage.getItem(this.USER_KEY);
      if (user) {
        const data = JSON.parse(user);
        this.userRole = data?.data?.name;

      }

      return {};
    }

}

export class loginForm {
  email: string = "";
  password: string = "";
}
