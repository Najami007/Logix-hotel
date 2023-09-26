import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker/public_api';
import { Time, time } from 'highcharts';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit{
  curDate = new Date();

  logo:any;
  logo1:any;

  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    private app:AppComponent,
    private global:GlobalDataModule,
    private dialogue: MatDialog,
    
  ){

  }



  ngOnInit(): void {

    this.global.setHeaderTitle('Booking');
    this.getRoom();
    this.getParty();
    this.getBookings();

    this.logo = this.global.Logo;
    this.logo1 = this.global.Logo1;







    
  }


  

  /////////////////////////////////////////////////////////

  searchRoom:any;
  searchParty:any;
  searchBooking:any;

  RoomID:any;
  partyID:any;
  bookingDate:any = new Date();
  rentPerDay:any;
  arrivalDate:any ;
  arrivalTime:any;
  DepartureDate:any ;
  DepartureTime:any;
  TotalDays:any;
  bookingThrough:any;
  bookingDescription:any;

  ////////////////////////////////////////////////


  lblVoucherPrintDate = new Date();
  lblBookingNo:any;
  lblBookingDate:any;
  lblAdvanceJvNo:any;
  lblRefundJvNo:any;
  lblBookingStatus:any
  lblBookingRemarks:any;
  lblBookingChannel:any;
  lblCustomerName:any;
  lblRentPerDay:any;
  lblRoomTitle:any; //
  lblTotalDays:any; //
  lblPaidAmount:any; //
  lblArrivalDate:any;
  lblDepartureDate:any;
  lblConfirmationDate:any;


/////////////////////////////////////////////////////////

  bookingID:any;
  cancelRemarks:any;


/////////////////////////////////////////////////////////

  RoomList:any;
  partyList:any;



  ///////////////////////////////////////////

  savedBookingsData:any;
  bookingStaus:any = 'Pending';

  SavedData:any;


  //////////////////////////////////////////


  bookingChannelList:any[] =[
    {name:'WhatsApp'},
    {name:'Website'},
    {name:'Application'},
    {name:'Walk In'}
  ]

  StatusList = [
    {title:'Pending'},
    {title:'Cancelled'},
    {title:'Confirmed'},
    {title:'Refunded'},
    {title:'Visited'},
    {title:'All'},
  ]


  


  onRoomSelected(){
    var curRoom = this.RoomList.find((e:any)=> e.roomID == this.RoomID );
    this.rentPerDay = curRoom.rentPerDay;
  }


  ///////////////////// will Filter out the data from Data Received From Api//////////////

  filterBookings(){
  if(this.bookingStaus != 'All'){
    
      
        var curRow = this.savedBookingsData.filter((e:any)=>e.bookingStatus == this.bookingStaus);
      this.SavedData = curRow;
      
   
   
  }else{
    this.SavedData = this.savedBookingsData;
  }

  
  
  }
  


  //////////////////////////////////////
  
  getRoom(){
    this.http.get(environment.mainApi+'GetRoom').subscribe(
      (Response:any)=>{
        this.RoomList = Response;
      }
    )

  }



  //////////////////////////////////////////
  
  getParty(){
    this.http.get(environment.mallApiUrl+'getparty').subscribe(
    {
      next:value =>{
        this.partyList = value;
        
      
      },
      error: error=>{
        this.msg.WarnNotify('Error Occured While Loading Data')
       
      }        
      
      
    }
    )
  }


  ////////////////////////////////////////////

/////////////////// will give the difference of arrival and departure date

getHours(date1:any, Time1:any, date2:any, Time2:any) {
  const DateTime1 = new Date(Date.parse(date1 + ' ' + Time1));
  const DateTime2 = new Date(Date.parse(date2 + ' ' + Time2));

  // Check if the dates and times are valid.
  if (isNaN(DateTime1.getTime()) || isNaN(DateTime2.getTime())) {
    return false;
  }

  // Calculate the difference in seconds.
  const differenceInSeconds = (DateTime2.getTime() - DateTime1.getTime()) / 1000;

  // Calculate the difference in hours.
  const differenceInHours = differenceInSeconds / 3600;

  // Return the difference in hours.
  return differenceInHours;
}

  /////////////////////////////////////////

  getBookings(){
    this.http.get(environment.mainApi+'getbooking').subscribe(
    (Response)=>{
      this.savedBookingsData = Response;
      console.log(Response);

      this.SavedData =this.savedBookingsData.filter((e:any)=>e.bookingStatus == 'Pending');
     
    }
    )
  }


  //////////////////////////////////////////

  save(){

    var curValue = this.getHours(this.global.dateFormater(this.arrivalDate,'-'),this.arrivalTime,
    this.global.dateFormater(this.DepartureDate,'-'),this.DepartureTime);

    if(this.RoomID == '' || this.RoomID == undefined){
      this.msg.WarnNotify('Select Room Number')
    }else if(this.partyID == '' || this.partyID == undefined){
      this.msg.WarnNotify('Select Customer Name')
    }else if(this.rentPerDay == '' || this.rentPerDay == undefined){
      this.msg.WarnNotify('Enter The Amount of Rent')
    }
    else if(this.arrivalDate == '' || this.arrivalDate == undefined){
      this.msg.WarnNotify('Select Date Of Arrival')
    }else if(this.arrivalTime == '' || this.arrivalTime == undefined){
      this.msg.WarnNotify('Enter The Arrival Time')
    }
    else if(this.DepartureDate == '' || this.DepartureDate == undefined){
      this.msg.WarnNotify('Select Date Of Departure')
    }
    else if( this.DepartureTime == '' || this.DepartureTime == undefined ){
      this.msg.WarnNotify('Enter The Departure Time')
    }else if(this.TotalDays == '' || this.TotalDays == undefined){
      this.msg.WarnNotify('Enter The Days of Stay')
    }else if(this.bookingThrough == '' || this.bookingThrough == undefined){
      this.msg.WarnNotify('Select the Channel of Booking')
    }else if(this.global.dateFormater(this.arrivalDate,'-') + ' '+this.arrivalTime > this.global.dateFormater(this.DepartureDate,'-') +' '+ this.DepartureTime){
      this.msg.WarnNotify('Departure Date is Not Valid');

    }else if(curValue.toString() < '6' ){
      this.msg.WarnNotify('Departure Time must be more than 6 Hour')
    }else { 


      if(this.bookingDescription == '' || this.bookingDescription == undefined){
        this.bookingDescription = '-';
      }

      this.app.startLoaderDark();

      this.http.post(environment.mainApi+'insertbooking',{
        RoomID:this.RoomID,
      PartyID:this.partyID,
      BookingDate: this.global.dateFormater(this.bookingDate,'-'),
      DateOfArrival: this.global.dateFormater(this.arrivalDate,'-'),
      TimeOfArrival: this.arrivalTime,
      DateOfDeparture:this.global.dateFormater(this.DepartureDate,'-'),
      TimeOfDeparture:this.DepartureTime,
      RentPerDay: this.rentPerDay,
      TotalDays:this.TotalDays,
      BookingDescription: this.bookingDescription,
      BookingThrough: this.bookingThrough,
  
      UserID: this.global.getUserID()
      }).subscribe(
        (Response:any)=>{
          if(Response.msg == 'Data Saved Successfully'){
            this.msg.SuccessNotify('Booking Done');
            this.getBookings();

         

            this.reset();
            this.app.stopLoaderDark();
          }else{
            this.msg.WarnNotify(Response.msg);
            this.app.stopLoaderDark();
          }
        }
      )

      }
  
  }

  ////////////////////////////////////////

  confirmBooking(row:any){
    this.dialogue.open(ConfirmBookingComponent,{
      width:"40%",
      data:row

    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getBookings();
            
      }
      
    })
  }



  //////////////////////////////////

  reset(){
    this.RoomID = '';
    this.partyID = '';
    this.bookingDate = new Date();
    this.rentPerDay = '';
    this.arrivalDate='';
    this.arrivalTime ='';
    this.DepartureDate='';
    this.DepartureTime='';
    this.TotalDays = '';
    this.bookingThrough = '';
    this.bookingDescription = '';
  }




  ///////////////////// will open the model window of cancellation Remarks

  cancel(row:any){

    this.bookingID = row.bookingID;

  }



////////////////////////////// will Cancel the Booking

  cancelBooking(){

    if(this.cancelRemarks == '' || this.cancelRemarks == undefined){
      this.msg.WarnNotify('Enter The Booking Cancellation Remarks')
    }else{
      this.http.post(environment.mainApi + 'CancelBooking',{
        BookingID:this.bookingID,    
        Remarks: this.cancelRemarks,
        UserID: this.global.getUserID()
      }).subscribe(
        (Response:any)=>{
          if(Response.msg == 'Data Saved Successfully'){
            this.msg.SuccessNotify('Booking Cancelled');
            this.cancelRemarks = '';
            this.getBookings();
           

            
          }else{
            this.msg.WarnNotify(Response.msg);
          }
        }
      )
    }

    
  }


  ///////////////////////////////////////

  printBooking(row:any){

    this.lblBookingNo = row.bookingID;
    this.lblBookingDate = row.bookingDate;
    this.lblAdvanceJvNo = row.invoiceNo;
    this.lblRefundJvNo = row.refundInvNo;
    this.lblBookingStatus = row.bookingStatus;
    this.lblBookingRemarks = row.bookingDescription;
  this.lblBookingChannel = row.bookingThrough;
  this.lblCustomerName = row.partyName;
  this.lblRentPerDay = row.rentPerDay;
  this.lblRoomTitle = row.roomTitle;
  this.lblTotalDays = row.totalDays;
  this.lblPaidAmount = row.advancePaid;
  this.lblArrivalDate  = row.dateOfArrival;
  this.lblDepartureDate = row.dateOfDeparture;
  this.lblConfirmationDate = row.confirmationDate;



   setTimeout(() => {
    this.global.printData('#printDiv');
   }, 1000);
  }



}
