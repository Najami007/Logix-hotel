import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.scss']
})
export class ConfirmBookingComponent implements OnInit{



  constructor(
    private http:HttpClient,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<ConfirmBookingComponent>,
    private global:GlobalDataModule,
    private msg:NotificationService
  ){

  }
  ngOnInit(): void {
   
    if(this.editData.bookingStatus == 'Confirmed'){
      this.actionBtn = 'Refund'
    }

    this.getCoaList();
  }


  advanceAmount:any;
  coaID:any;
  remarks:any;

  coaList:any;
  actionBtn = 'Confirm Booking';


  getCoaList(){
    this.http.get(environment.mainApi+'GetCashBankCOA').subscribe(
      (Response)=>{

        this.coaList = Response;
      }
    )
  }



  save(){
    if(this.advanceAmount == '' || this.advanceAmount == undefined){
      this.msg.WarnNotify('Enter Advance Amount')
    }
    else if(this.coaID == '' || this.coaID == undefined){
      this.msg.WarnNotify('Select Payment Head');
    }
    else{
      if(this.remarks == '' || this.remarks == undefined){
        this.remarks == '-';
      }

      if(this.actionBtn == 'Confirm Booking'){
        this.ConfirmBooking();
      }else if( this.actionBtn == 'Refund'){
        this.Refund();
      }
    }
  
  }




  ConfirmBooking(){
    this.http.post(environment.mainApi + 'ConfirmBooking',{
      BookingID:this.editData.bookingID, 
      PartyID: this.editData.partyID,
      CoaID: 6,
      AdvancePaid: this.advanceAmount,
      Remarks: this.remarks,
      UserID: this.global.getUserID()
    }).subscribe(
      (Response:any)=>{
        if(Response.msg == 'Data Saved Successfully'){
          this.msg.SuccessNotify('Booking Confirmed');
          this.reset();
          this.dialogRef.close('Update');
        }else{
          this.msg.WarnNotify(Response.msg);
        }
      }
    )
  }




  Refund(){
    
  }


  reset(){
    this.actionBtn = 'Confirm';
    this.advanceAmount = '';
    this.coaID = '';
    this.remarks = '';
    this.closeDialogue();
  }

  closeDialogue(){
    this.dialogRef.close();
  }






}
