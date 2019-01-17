import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'My account',
      url: '/account',
      icon: 'person'
    },
    {
      title: 'Browse cramspot',
      url: '/home',
      icon: 'search'
    },
    {
      title: 'List your space',
      url: '/list-workspace',
      icon: 'add-circle'
    },
    {
      title: 'Feed',
      url: '/feed',
      icon: 'paper'
    },
    {
      title: 'Notifications',
      url: '/notification',
      icon: 'notifications'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'power',
      handler: () => {
        this.logout();
      }
    }
  ];

  public appPagesMore = [
    {
      title: 'How it Works',
      url: '/how-it-works',
      icon: 'settings'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle-outline'
    },
    {
      title: 'Privacy Policy',
      url: '/privacy-policy',
      icon: 'lock'
    },
    {
      title: 'Contact Us',
      url: '/contactus',
      icon: 'call'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthenticationService
  ) {
    this.initializeApp();
  }
  logout(){
    this.auth.logout();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
