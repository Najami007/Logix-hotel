import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { Chart } from 'angular-highcharts';
import { Highcharts } from 'highcharts/highcharts-more.src';


import * as $ from 'jquery';
import * as highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-hotel-dashboard',
  templateUrl: './hotel-dashboard.component.html',
  styleUrls: ['./hotel-dashboard.component.scss']
})
export class HotelDashboardComponent implements OnInit {


  constructor(
    private globalData :GlobalDataModule,
    private http:HttpClient,
  ){}

  ngOnInit(): void {
    this.globalData.setHeaderTitle('Hotel DashBoard');

    this.getBookings();
    this.getCheckInOut();
    this.getRoom();
    this.getArrValue();

   
  }


  arrColor: ThemePalette = 'accent';
  arrModel: ProgressSpinnerMode = 'determinate';
  arrValue = 70;


  totalBookings:any = 0;
  pendingBookings:any = 0;
  totalCheckIn:any = 0;
  totalCheckOut:any = 0;

  roomsList:any = [];
  totalRooms:any = 0;
  checkInRooms:any = 0;


  getBookings(){
    this.http.get(environment.mainApi+'getbooking').subscribe(
    (Response:any)=>{

      var bookedRooms = Response.filter((e:any)=>e.bookingStatus == 'pending');
     
    this.totalBookings = Response.length;
    this.pendingBookings = bookedRooms.length;
     
    }
    )
  }



  
  getCheckInOut(){
    this.http.get(environment.mainApi+'GetCIOHistory').subscribe(
      (Response:any)=>{

        var checkOutList = Response.filter((e:any)=>e.activeStatus == false);
        var checkInList = Response.filter((e:any)=>e.activeStatus == true);
       
        this.totalCheckIn = Response.length;
        this.totalCheckOut = checkOutList.length;
        this.checkInRooms = checkInList.length;
        
      }
    )
   }



   getRoom(){
    this.http.get(environment.mainApi+'GetRoom').subscribe(
      (Response:any)=>{
        this.roomsList = Response;
        this.totalRooms = Response.length;
        
      }
    )

  }


  getArrValue(){
   setTimeout(() => {
    this.arrValue = (this.checkInRooms / this.totalRooms) * 100;
   }, 500);
  }






  getDonutChart(){
   
  }

}
