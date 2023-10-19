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
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { RoomStatusComponent } from './room-status/room-status.component';



@Component({
  selector: 'app-hotel-dashboard',
  templateUrl: './hotel-dashboard.component.html',
  styleUrls: ['./hotel-dashboard.component.scss']
})
export class HotelDashboardComponent implements OnInit {


  curDate:Date = new Date();

  constructor(
    private globalData :GlobalDataModule,
    private http:HttpClient,
    private dialogue: MatDialog,
    private msg:NotificationService,
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
  
  searchRoom:any = 0;
  statusList:any = [{id:0 ,title:'All'} ,{id:1 ,title:'On Rent'} , {id:2 ,title:'Empty'} , {id:3 ,title:'Cleaning'} , {id:4 ,title:'Personal Use'} , {id:5 ,title:'Out Of Order'}]

  totalBookings:any = 0;
  pendingBookings:any = 0;
  totalCheckIn:any = 0;
  totalCheckOut:any = 0;

  reuseRoomList:any = [];
  roomsList:any = [];
  totalRooms:any = 0;
  checkInRooms:any = 0;
  daysOfMonth:any;

  daysList:any;

  onStatusSelected(){
    
    if(this.searchRoom == 0){
      this.getRoom();
    }else{
      this.roomsList = this.reuseRoomList.filter((e:any)=>e.roomCrntStatusID == this.searchRoom);
    }

    
  }


  getBookings(){
    this.http.get(environment.mainApi+'getbooking').subscribe(
    (Response:any)=>{

      var bookedRooms = Response.filter((e:any)=>e.bookingStatus == 'pending');
     
    this.totalBookings = Response.length;
    this.pendingBookings = bookedRooms.length;
     
    }
    )
  }


  daysInMonth(month:any, year:any) {
    return new Date(year, month, 0).getDate();
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
        this.reuseRoomList = Response;
        this.roomsList = Response;
        this.totalRooms = Response.length;
        // console.log(Response);
        
        
     this.daysOfMonth = this.daysInMonth(this.curDate.getMonth()+1,this.curDate.getFullYear());
    
      this.daysList = [];

      for(var i = 1; i <= this.daysOfMonth; i++){

      this.daysList.push(i);


   }
        
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







  
  changeRoomStatus(row:any){
    this.dialogue.open(RoomStatusComponent,{
      width:"40%",
      data:row,

    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getRoom();
      }
      
    })
  }
}
