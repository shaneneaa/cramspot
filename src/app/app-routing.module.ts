import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard]},
  { path: 'feed', loadChildren: './pages/feed/feed.module#FeedPageModule', canActivate: [AuthGuard] },
  { path: 'notification', loadChildren: './pages/notification/notification.module#NotificationPageModule', canActivate: [AuthGuard] },
  { path: 'account', loadChildren: './pages/account/account.module#AccountPageModule', canActivate: [AuthGuard] },
  { path: 'feed-modal', loadChildren: './pages/feed-modal/feed-modal.module#FeedModalPageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'payment/:id', loadChildren: './pages/payment/payment.module#PaymentPageModule', canActivate: [AuthGuard] },
  { path: 'how-it-works', loadChildren: './other-pages/how-it-works/how-it-works.module#HowItWorksPageModule', canActivate: [AuthGuard] },
  { path: 'about', loadChildren: './other-pages/about/about.module#AboutPageModule', canActivate: [AuthGuard] },
  { path: 'privacy-policy', loadChildren: './other-pages/privacy-policy/privacy-policy.module#PrivacyPolicyPageModule', canActivate: [AuthGuard] },
  { path: 'contactus', loadChildren: './other-pages/contactus/contactus.module#ContactusPageModule', canActivate: [AuthGuard] },
  { path: 'reservation-details', loadChildren: './pages/reservation-details/reservation-details.module#ReservationDetailsPageModule' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
