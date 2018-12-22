import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule'},
  { path: 'feed', loadChildren: './pages/feed/feed.module#FeedPageModule' },
  { path: 'notification', loadChildren: './pages/notification/notification.module#NotificationPageModule' },
  { path: 'account', loadChildren: './pages/account/account.module#AccountPageModule' },
  { path: 'feed-modal', loadChildren: './pages/feed-modal/feed-modal.module#FeedModalPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'payment', loadChildren: './pages/payment/payment.module#PaymentPageModule' },  { path: 'how-it-works', loadChildren: './other-pages/how-it-works/how-it-works.module#HowItWorksPageModule' },
  { path: 'about', loadChildren: './other-pages/about/about.module#AboutPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
