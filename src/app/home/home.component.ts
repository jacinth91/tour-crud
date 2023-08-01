import { Component, Input, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  closeResult = '';
  tourList: any = [];
  userRole: any;
  USER_KEY = 'auth-user';
  constructor(private router: Router, private modalService: NgbModal,
    private toastr: ToastrService, private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    this.getUser()
    this.getAllTour();

  }

  async getAllTour() {
    this.httpProvider.getAllTours().subscribe((data : any) => {
      console.log(data)
      if (data != null && data.body != null) {
        var resultData = data.body.data;
        if (resultData) {
          this.tourList = resultData;
        }
      }
    },
    (error : any)=> {
        if (error) {
          if (error.status == 404) {
            if(error.error && error.error.message){
              this.tourList = [];
            }
          }
        }
      });
  }

  AddTour() {
    this.router.navigate(['AddTour']);
  }

  deleteTourConfirmation(tour: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result) => {
        this.deleteTour(tour);
      },
        (reason) => {});
  }

  deleteTour(tour: any) {
    this.httpProvider.deleteTourById(tour._id).subscribe((data : any) => {
      console.log(data)
      if (data != null && data.body != null) {
        var resultData = data.body;

          this.toastr.success(resultData.message);
          this.getAllTour();

      }
    },
    (error : any) => {});
  }

  getUser(): any {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      const data = JSON.parse(user);
      this.userRole = data?.body?.data?.role;
      console.log(this.userRole)
    }


  }
}
