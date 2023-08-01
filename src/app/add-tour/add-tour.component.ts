import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-add-tour',
  templateUrl: './add-tour.component.html',
  styleUrls: ['./add-tour.component.scss']
})
export class AddTourComponent implements OnInit {
  addTourForm: tourForm = new tourForm();

  @ViewChild("tourForm")
  tourForm!: NgForm;

  isSubmitted: boolean = false;
  USER_KEY = 'auth-user';
  userRole: any;

  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUser()
  }

  AddTour(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveTour(this.addTourForm).subscribe(async (data:any) => {
        console.log(data)
        if (data != null && data.body != null) {
          if (data != null && data.body != null) {
            var resultData = data.body;

              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);

          }
        }
      },
        async (error: { message: any; }) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
  getUser(): any {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      const data = JSON.parse(user);
      this.userRole = data?.data?.name;
      console.log(data)
    }


  }

}

export class tourForm {
  title: string = "";
  guide: string = "";
  location: string = "";
  date_of_tour: string = "";
  images: string = "";
}
