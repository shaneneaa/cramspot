import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.page.html',
  styleUrls: ['./how-it-works.page.scss'],
})
export class HowItWorksPage implements OnInit {

  constructor(private alertController: AlertController) { }

  async alertFind() {
    const alert = await this.alertController.create({
      header: 'Discover a place to work and study',
      message: '<div text-center><ion-icon name="search"  style="color:#903d62; font-size:70px"></ion-icon> <br>'+
      ' <span style="color:#903d62; font-size:20px">1. Search</span>  <br><br>'+
      'Discover spaces posted by other user. Choose from hundreds of venues. Simply search by location and filter based on its rate. '+
      '<br><br><ion-icon name="time"  style="color:#903d62; font-size:70px"></ion-icon> <br>'+
      ' <span style="color:#903d62; font-size:20px">2. Check availability</span>  <br><br>'+
      'Set the date and time of your booking and wait for the response of the host.'+
      '<br><br><ion-icon name="calendar"  style="color:#903d62; font-size:70px"></ion-icon> <br>'+
      ' <span style="color:#903d62; font-size:20px">3. Book and confirm</span>  <br><br>'+
      'Pay for access rate to get the contact information of the host and start booking.'+'</div> ',
      buttons: ['OK'] 
    });

    await alert.present();
  }
  async alertList() {
    const alert = await this.alertController.create({
      header: 'How to list workspace',
      message: '<div text-center><ion-icon name="add-circle"  style="color:#903d62; font-size:70px"></ion-icon> <br>'+
      ' <span style="color:#903d62; font-size:20px">1. Add your workspace</span>  <br><br>'+
      'Input all the information details needed about your workspace and wait for the admin to verify your workspace. '+
      '<br><br><ion-icon name="calendar"  style="color:#903d62; font-size:70px"></ion-icon> <br>'+
      ' <span style="color:#903d62; font-size:20px">2. Response and accept request</span>  <br><br>'+
      'Response to availability request of client to inform them that your workspace is available or not.'+
      '<br><br><ion-icon name="clipboard"  style="color:#903d62; font-size:70px"></ion-icon> <br>'+
      ' <span style="color:#903d62; font-size:20px">3. Welcome your new client and earn money</span>  <br><br>'+
      'Accept bookings and reservation from clients and send them a welcome message,'+'</div> ',
      buttons: ['OK'] 
    });

    await alert.present();
  }
  ngOnInit() {
  }

}
