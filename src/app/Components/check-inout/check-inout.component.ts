import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'jquery';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';
import { AddcheckINServiceComponent } from './addcheck-inservice/addcheck-inservice.component';

@Component({
  selector: 'app-check-inout',
  templateUrl: './check-inout.component.html',
  styleUrls: ['./check-inout.component.scss']
})
export class CheckINOUtComponent implements OnInit {

  curDate = new Date();

  constructor(
    private http:HttpClient,
    private msg:NotificationService,
    private global:GlobalDataModule,
    private app:AppComponent,
    private dialogue: MatDialog,
  ){

  }





  ngOnInit(): void {
    this.global.setHeaderTitle('Check IN OUt');
   
    this.getBookingsList();
    this.getRoom();
    this.getParty();
    this.getServices();
    this.getCoaList();
    this.getSavedVouchers();
  }


  searchText:any;

  bookingSearch:any;
  coaSearch:any;
  roomSearch:any;
  partySearch:any;
  bookingID:number = 0;
  roomID:number = 0;
  partyID:number = 0;
  rentPerDay:any;
  checkInDate:any = new Date();
  checkInTime:any;
  totalDays:any = 0;
  estimatedDays:any;
  advanceAmount:any = 0;
  bookingAdvance:any = 0;
  familyInfo:any;
  cioRemarks:any;
  coaID:number = 0;


  billTotal:number = 0;


  ///////////////////////////////////////

  serviceSearch:any;
  serviceID:any;
  serviceCharges:any;
  quantity:any;
  amountCharged:any;
  serviceDate:any;
  serviceTime:any;
  servicesTotalAmount:any = 0;











  //////////////////////////////////


  bookingList:any = [];
  roomList:any = [];
  partyList:any = [];
  servicesList:any = [];
  coaList:any = [];

  savedVoucherList:any = [];



  serviceTableList:any= [];

  SavedCheckINData:any = [];




  getBookingsList(){
    this.http.get(environment.mainApi+'getbooking').subscribe(
    (Response:any)=>{

      if(Response != ''){
        this.bookingList =Response.filter((e:any)=>e.bookingStatus == 'Confirmed');
      }
     
      // console.log(this.bookingList);
    },
    (Error)=>{
      this.msg.WarnNotify('Error Occured While Loading Booking List');
    }
    )
  }


  getRoom(){
    this.http.get(environment.mainApi+'GetRoom').subscribe(
      (Response:any)=>{
        this.roomList = Response;
      //  console.log(Response);
      }
    )

  }


  
  getParty(){
    this.http.get(environment.mallApiUrl+'getparty').subscribe(
    {
      next:(value:any) =>{
        this.partyList = value;
        
      
      }      
      
      
    }
    )
  }



  getTotal(){
    this.billTotal = (this.rentPerDay * this.totalDays ) + this.servicesTotalAmount;
    
  }
  
  getServices(){
    this.http.get(environment.mallApiUrl+'getservice').subscribe(
     {
       next:value=>{
         this.servicesList = value;
         // console.log(value);
       }
     }
    ) 
   }
 

   onServiceSeleted(){
    var curService = this.servicesList.find((e:any)=>e.serviceID == this.serviceID);

   

    this.amountCharged = curService.serviceCharges;
   }



   addService(){

   
    
    var curRow = this.serviceTableList.find((obj:any)=> obj.ServiceID == this.serviceID);

 
    if(curRow == undefined){

         
      var curService = this.servicesList.find((e:any)=>e.serviceID == this.serviceID);
      var serviceTitle = curService.serviceTitle;
      var serviceCharges = curService.serviceCharges;
   
      this.serviceTableList.push({ServiceID: this.serviceID,serviceTitle:serviceTitle, ServiceDate:this.serviceDate, 
        ServiceTime:this.serviceTime, ServiceCharges:serviceCharges, Quantity:this.quantity, AmountCharged:this.amountCharged});

      this.serviceTableList.forEach((e:any) => {
        this.servicesTotalAmount = 0;
        this.servicesTotalAmount += e.AmountCharged * e.Quantity;
      });
  
      this.getTotal();
    
      this.serviceID = 0;
      this.serviceCharges = '';
      this.quantity = '';
      this.amountCharged = '' ;
      this.serviceDate = '';
      this.serviceTime = '';

    

    }else if(curRow.ServiceID == this.serviceID){
   
      this.msg.WarnNotify('Service Already Entered');
    }


    
    
   


   }


   deleteService(item:any){
    
    var index = this.serviceTableList.indexOf(item);
    this.serviceTableList.splice(index,1);

   }


   getCoaList(){
    this.http.get(environment.mainApi+'GetCashBankCOA').subscribe(
      (Response)=>{
    
        this.coaList = Response;
        
      }
    )
  }


  reset(){
    
   this.bookingID = 0;
    this.roomID = 0;
    this.partyID = 0;
    this.rentPerDay = '';
    this.checkInDate = new Date();
    this.checkInTime = '';
    this.totalDays = 0;
    this.estimatedDays = '';
    this.advanceAmount = 0;
    this.bookingAdvance = 0;
    this.familyInfo = '';
    this.cioRemarks = '';
    this.coaID = 0;
    this.billTotal = 0;
    this.servicesTotalAmount = '';
    this.serviceTableList = [];

  }

  onRoomChange(){
   
    
    var curRoom  = this.roomList.find((e:any)=>e.roomID == this.roomID);
    this.rentPerDay = curRoom.rentPerDay;
    this.bookingID = 0;
    this.partyID = 0;
    this.bookingAdvance = 0;

   
    
  }

  onBookingChange(){
    var curBooking = this.bookingList.find((e:any)=>e.bookingID == this.bookingID);
   

    this.roomID = curBooking.roomID;
    this.bookingAdvance = curBooking.advancePaid;
    this.partyID = curBooking.partyID;
    this.rentPerDay = curBooking.rentPerDay;
 
    
  }



  saveCheckIN(){
    if(this.roomID == 0 || this.roomID == undefined){
      this.msg.WarnNotify('Select Room');
    }else if(this.partyID == 0 || this.partyID == undefined){
      this.msg.WarnNotify('Select Customer Name')
    }else if(this.checkInDate == '' || this.checkInDate == undefined){
      this.msg.WarnNotify('Select Check In Date')
    }else if(this.checkInTime == '' || this.checkInTime == undefined){
      this.msg.WarnNotify('Enter Check In Time')
    }else if(this.rentPerDay == '' || this.rentPerDay  == undefined){
      this.msg.WarnNotify('Enter Rent Per Day')
    }else if(this.totalDays == '' || this.totalDays == undefined){
      this.msg.WarnNotify('Enter Total Days')
    }else if(this.estimatedDays == '' || this.estimatedDays == undefined){
      this.msg.WarnNotify('Enter Estimates Days of Stay')
    }else{

      if(this.cioRemarks == '' || this.cioRemarks == undefined){
        this.cioRemarks = '-';
      }

      if(this.familyInfo == '' || this.familyInfo == undefined){
        this.familyInfo = '-';
      }

      this.insertCheckIn();
    }
  }

   insertCheckIn(){
    this.app.startLoaderDark();
    this.http.post(environment.mainApi+'insertcheckin',{
      RoomID:this.roomID,
      PartyID:this.partyID,
      BookingID:this.bookingID,
      CheckInDate:this.global.dateFormater(this.checkInDate,'-'),
      CheckInTime: this.checkInTime,
      RentPerDay: this.rentPerDay,
      TotalDays:this.totalDays,
      EstimatedDays:this.estimatedDays,
      CioRemarks: this.cioRemarks,
      FamilyInfo: this.familyInfo,
      AdvancePaid: this.advanceAmount,
      BookingAdvancePaid: this.bookingAdvance,
      COAID:3,
      CioDetail:JSON.stringify(this.serviceTableList),
      UserID: this.global.getUserID()
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Saved Successfully'){
          this.msg.SuccessNotify(Response.msg);
          this.reset();
          this.app.stopLoaderDark();
        }else{
          this.msg.WarnNotify(Response.msg);
          this.app.stopLoaderDark();
          
        }
      },
      (Error)=>{
        this.app.stopLoaderDark();
      }
    )
   }



   getSavedVouchers(){
    this.http.get(environment.mainApi+'GetCIOHistory').subscribe(
      (Response:any)=>{

        this.savedVoucherList = Response;
        this.SavedCheckINData = Response.filter((e:any)=>e.activeStatus == true)
       // console.log(this.SavedCheckINData);
      }
    )
   }



   addNewService(row:any){
    this.dialogue.open(AddcheckINServiceComponent,{
      width:"40%",
      data:row
    }).afterClosed().subscribe(val=>{
      if(val == 'Update'){
        this.getSavedVouchers();
      }
      
    })
   }

}
