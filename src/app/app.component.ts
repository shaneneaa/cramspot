import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
      title: 'Browse workspace',
      url: '/home',
      icon: 'search'
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
      icon: 'power'
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
      url: '/notification',
      icon: 'information-circle-outline'
    },
    {
      title: 'Privacy Policy',
      url: '/notification',
      icon: 'lock'
    },
    {
      title: 'Contact Us',
      url: '/notification',
      icon: 'call'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
