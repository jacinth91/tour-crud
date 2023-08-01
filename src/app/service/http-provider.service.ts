import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

//var apiUrl = "https://localhost:44370/";

var apiUrl = "http://localhost:4000";

var httpLink = {
  userLogin:apiUrl+"/auth/login",
  getAllTours: apiUrl + "/tours",
  deleteTourById: apiUrl + "/tours/delete/",
  getTourDetailById: apiUrl + "/tours/",
  saveTour: apiUrl + "/tours",
  updateTourById :apiUrl + "/tours/"
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }
  public logUserIn(model:any):Observable<any>{
    return this.webApiService.post(httpLink.userLogin,model)

  }

  public getAllTours(): Observable<any> {
    return this.webApiService.get(httpLink.getAllTours);
  }

  public deleteTourById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteTourById + model, "");
  }

  public getTourDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getTourDetailById  + model);
  }

  public saveTour(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveTour, model);
  }
  public updateTour(id:any,model: any,): Observable<any> {
    return this.webApiService.post2(httpLink.updateTourById + id,model);
  }

}
