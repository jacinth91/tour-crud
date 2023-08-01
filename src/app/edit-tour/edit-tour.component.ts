import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-edit-tour',
  templateUrl: './edit-tour.component.html',
  styleUrls: ['./edit-tour.component.scss']
})
export class EditTourComponent implements OnInit {
  editTourForm: tourForm = new tourForm();

  @ViewChild("tourForm")
  tourForm!: NgForm;

  isSubmitted: boolean = false;
  tourId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.tourId = this.route.snapshot.params['tourId'];
    this.getToursDetailById();
  }

  getToursDetailById() {
    this.httpProvider.getTourDetailById(this.tourId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body.data;
        console.log(data)
        if (resultData) {
          this.editTourForm._Id = resultData._id;
          this.editTourForm.title = resultData.title;
          this.editTourForm.guide = resultData.guide;
          this.editTourForm.location = resultData.location;
          this.editTourForm.date_of_tour = resultData.date_of_tour;
          this.editTourForm.images = resultData.images;
        }
      }
    },
      (error: any) => { });
  }

  EditTour(isValid: any) {
    this.isSubmitted = true;
console.log(this.editTourForm)
      this.httpProvider.updateTour(this.tourId,this.editTourForm).subscribe(async (data: any) => {
        console.log(data)
        if (data != null && data.body != null) {
          var resultData = data.body;

              this.toastr.success(resultData.message);
              setTimeout(() => {
                this.router.navigate(['/Home']);
              }, 500);

        }
      },
        async (error: { message: string | undefined; }) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });

  }
}

export class tourForm {
  _Id: number = 0;
  title: string = "";
  guide: string = "";
  location: string = "";
  date_of_tour: string = "";
  images: string = "";
}
