import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GlobalDataModule } from 'src/app/Shared/global-data/global-data.module';
import { NotificationService } from 'src/app/Shared/service/notification.service';
import { AppComponent } from 'src/app/app.component';
import { environment } from 'src/environments/environment.development';
import { AddcityformComponent } from '../settings/city/addcityform/addcityform.component';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit{


  constructor(private globalData: GlobalDataModule,
 
    private http : HttpClient,
    private msg : NotificationService,
    private app:AppComponent,
    private dialogue:MatDialog
    ){

  }
  ngOnInit(): void{
   this.globalData.setHeaderTitle('Add Company');
   this.getCityNames();
  }




  //////////////////////////////////////////////////////
  //////////////////////getting the City Names/////////////////
  //////////////////////////////////////////////////////////////

  CitiesNames : any = []

  getCityNames(){
    this.http.get(environment.mainApi+'getcity').subscribe(
      {
        next : value =>{
          this.CitiesNames = value;
        },
        error : error=>{
          console.log(error);
        }
      }
    )
  }
/////////////////////////////////////////////////////////////////////////




addCity(){
  this.dialogue.open(AddcityformComponent,{
    width:"40%",

  }).afterClosed().subscribe(val=>{
    if(val == 'Update'){
      this.getCityNames();
    }
  })
}




///////getting City Name for the table//////
  getCityName(id:any){

    var curcity = this.CitiesNames.find((e:any)=>{return e.cityID == id});
    return   curcity.cityName;
  }
//////////////////////////////////////////////



citySearch:any;
  searchtxt:any;
  btnType = "Save";
  curCompanyID:any;
  companyName :any;
  mangerName :any;
  companyMobileno:any;
  companyTelephoneNo:any;
  CityID :any;
  companyAddress:any;
  description :any;
 
  validate = true;



  companyList:any = [];

  getCompany(){
    this.http.get(environment.mainApi+'GetCompany').subscribe(
      (Response)=>{
        this.companyList = Response;
      }
    )
  }



  insertCompany(){
    this.http.post(environment.mainApi+'insertcompany',{
      CompanyName:this.companyName,
      ManagerName: this.mangerName,
      MobileNo: this.companyMobileno,
      TelephoneNo: this.companyTelephoneNo,
      CityID: this.CityID,
      Address: this.companyAddress,
      Remarks: this.description,
      UserID: 1
    }).subscribe(
      
    )
  }



 

  ////////////Mobile no field formate//////////////////////////
  mobileNoFormate(){
    if(this.companyMobileno.length == 4){
      this.companyMobileno = this.companyMobileno + '-';
    }
  }

   ////////////////////to Set Phone No field Formate//////////////
   setPhoneno(){
    if(this.companyTelephoneNo.length == 3){
      this.companyTelephoneNo = this.companyTelephoneNo + '-';
    } 
  }







  reset(){
 
  }


}