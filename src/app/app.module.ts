import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/Navigation/header/header.component';
import { SideNavbarComponent } from './Components/Navigation/side-navbar/side-navbar.component';
import { VoucherformComponent } from './Components/voucherform/voucherform.component';
import { CoaformComponent } from './Components/coaform/coaform.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DashBoardComponent } from './Components/dash-board/dash-board.component';
import { LedgerComponent } from './Reports/ledger/ledger.component';
import { TrialBalanceComponent } from './Reports/trial-balance/trial-balance.component';
import { PlstatComponent } from './Reports/plstat/plstat.component';
import { BsstatComponent } from './Reports/bsstat/bsstat.component';
import { ToastrModule } from 'ngx-toastr';
import { MainPageComponent } from './Components/main-page/main-page.component';
// import { FilterPipe } from './Shared/pipes/filter.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoginComponent } from './login/login.component';
import { PartyComponent } from './Components/party/party.component';
import { Subject } from 'rxjs/internal/Subject';
import { GlobalDataModule } from './Shared/global-data/global-data.module';
import { AddUserComponent } from './Components/add-user/add-user.component';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SettingsComponent } from './Components/settings/settings.component';
import { CityComponent } from './Components/settings/city/city.component';
import { MaterialModule } from './Shared/material/material.module';
import { AddcityformComponent } from './Components/settings/city/addcityform/addcityform.component';
import { TopNavbarComponent } from './Components/Navigation/top-navbar/top-navbar.component';
import { BankComponent } from './Components/bank/bank.component';


import { OwnerProfileComponent } from './Components/owner-profile/owner-profile.component';


import { OwnersReportComponent } from './Reports/owners-report/owners-report.component';
import { CashbookComponent } from './Reports/cashbook/cashbook.component';

import { CoaNotesComponent } from './Components/settings/coa-notes/coa-notes.component';
import { AddNoteComponent } from './Components/settings/coa-notes/add-note/add-note.component';
import { UpdateCoaComponent } from './Components/coaform/update-coa/update-coa.component';
import { ChangePinComponent } from './Components/add-user/change-pin/change-pin.component';


import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';
import { ListofCustomersComponent } from './Reports/listof-customers/listof-customers.component';
import { BudgettingComponent } from './Components/budgetting/budgetting.component';
import { BudgetReportComponent } from './Reports/budget-report/budget-report.component';
import { DailyTransactionRptComponent } from './Reports/daily-transaction-rpt/daily-transaction-rpt.component';
import { VoucherSupervisionComponent } from './Components/voucher-supervision/voucher-supervision.component';













@NgModule({
  declarations: [
    
    AppComponent,
    
    HeaderComponent,
    SideNavbarComponent,
    VoucherformComponent,
    CoaformComponent,
    DashBoardComponent,
    LedgerComponent,
    TrialBalanceComponent,
    PlstatComponent,
    BsstatComponent,
    MainPageComponent,
    LoginComponent,
    PartyComponent,
    AddUserComponent,
    SettingsComponent,
    CityComponent,
    AddcityformComponent,
    TopNavbarComponent,
    BankComponent,






  
    OwnerProfileComponent,
    OwnersReportComponent,

    CashbookComponent,
  
    CoaNotesComponent,
    AddNoteComponent,
    UpdateCoaComponent,
    ChangePinComponent,

    ListofCustomersComponent,
    BudgettingComponent,
    BudgetReportComponent,
    DailyTransactionRptComponent,
    VoucherSupervisionComponent,
    


 

    
   


    
    // FilterPipe,
    
  ],
  imports: [
    ChartModule,
    
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(), 
    Ng2SearchPipeModule,
    GlobalDataModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
    MatProgressBarModule,
    NgxMatSelectSearchModule,
    MaterialModule,
    
  

  ],
  providers: [{ provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] }],
  bootstrap: [AppComponent]
})
export class AppModule { 


}
