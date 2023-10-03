import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from './main.module';
import { CoaformComponent } from '../coaform/coaform.component';
import { DashBoardComponent } from '../dash-board/dash-board.component';
import { VoucherformComponent } from '../voucherform/voucherform.component';
import { LedgerComponent } from 'src/app/Reports/ledger/ledger.component';
import { TrialBalanceComponent } from 'src/app/Reports/trial-balance/trial-balance.component';
import { PlstatComponent } from 'src/app/Reports/plstat/plstat.component';
import { BsstatComponent } from 'src/app/Reports/bsstat/bsstat.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { PartyComponent } from '../party/party.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { SettingsComponent } from '../settings/settings.component';
import { BankComponent } from '../bank/bank.component';
import { OwnerProfileComponent } from '../owner-profile/owner-profile.component';
import { OwnersReportComponent } from 'src/app/Reports/owners-report/owners-report.component';
import { CashbookComponent } from 'src/app/Reports/cashbook/cashbook.component';
import { ListofCustomersComponent } from 'src/app/Reports/listof-customers/listof-customers.component';
import { BudgettingComponent } from '../budgetting/budgetting.component';
import { BudgetReportComponent } from 'src/app/Reports/budget-report/budget-report.component';
import { DailyTransactionRptComponent } from 'src/app/Reports/daily-transaction-rpt/daily-transaction-rpt.component';
import { VoucherSupervisionComponent } from '../voucher-supervision/voucher-supervision.component';
import { RoomComponent } from '../room/room.component';
import { BookingComponent } from '../booking/booking.component';
import { BookingRptDateWiseComponent } from 'src/app/Reports/booking-rpt-date-wise/booking-rpt-date-wise.component';
import { CheckINOUtComponent } from '../check-inout/check-inout.component';
import { CioRptDateWiseComponent } from 'src/app/Reports/cio-rpt-date-wise/cio-rpt-date-wise.component';
import { ServicesRptDateWiseComponent } from 'src/app/Reports/services-rpt-date-wise/services-rpt-date-wise.component';
import { ServicesRptServiceandDatewiseComponent } from 'src/app/Reports/services-rpt-serviceand-datewise/services-rpt-serviceand-datewise.component';
import { CioRptTypeDatewiseComponent } from 'src/app/Reports/cio-rpt-type-datewise/cio-rpt-type-datewise.component';
import { CioRptPartywiseComponent } from 'src/app/Reports/cio-rpt-partywise/cio-rpt-partywise.component';
import { ListOfRoomsComponent } from 'src/app/Reports/list-of-rooms/list-of-rooms.component';
import { BookingRptPartywiseComponent } from 'src/app/Reports/booking-rpt-partywise/booking-rpt-partywise.component';




const routes: Routes = [
  {path:'',component:MainPageComponent, children:[
    {path:'dashBoard', component:DashBoardComponent },
  { path: 'coa', component: CoaformComponent, },
  {path:'voucher', component: VoucherformComponent},
  {path:'ldgrpt', component: LedgerComponent},
  {path:'tbrpt', component: TrialBalanceComponent},
  {path:'plrpt', component: PlstatComponent},
  {path:'bsrpt', component: BsstatComponent},
  {path:'party', component: PartyComponent},
  {path:'AddUser', component: AddUserComponent},
  {path:'Settings',component:SettingsComponent},
  // {path:'bank',component:BankComponent},
  {path:'OwnerProfile',component:OwnerProfileComponent},

  // {path:'orptl',component:OwnersReportComponent},
  {path:'CBRpt',component:CashbookComponent},
  {path:'rptcust',component:ListofCustomersComponent},
  {path:'bdgtng',component:BudgettingComponent},
  {path:'bdgtrpt',component:BudgetReportComponent},
  {path:'Dtranrpt',component:DailyTransactionRptComponent},
  {path:'spv',component:VoucherSupervisionComponent},
  {path:'addRoom',component:RoomComponent},
  {path:'bkng',component:BookingComponent},
  {path:'brptdw',component:BookingRptDateWiseComponent},
  {path:'chkio',component:CheckINOUtComponent},
  {path:'ciorptdw',component:CioRptDateWiseComponent},
  {path:'ciorpttdw',component:CioRptTypeDatewiseComponent},
  {path:'ciorptpw',component:CioRptPartywiseComponent},
  {path:'srptdw',component:ServicesRptDateWiseComponent},
  {path:'srptsdw',component:ServicesRptServiceandDatewiseComponent},
  {path:'rptlor',component:ListOfRoomsComponent},
  {path:'brptpw',component:BookingRptPartywiseComponent},
  
  {path:'', redirectTo:'/main/dashBoard',pathMatch:'full'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
