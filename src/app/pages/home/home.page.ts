import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HomeModalPage } from "../home-modal/home-modal.page";
import { WorkspaceService } from '../../services/workspace.service';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  workspaces;

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private workspaceService: WorkspaceService,
    private notificationService: NotificationService
    ){ }

  ngOnInit(){
    this.loadWorkspace(); 
  }

  loadWorkspace(){
    this.workspaceService.getWorkspace().subscribe(data=>{
      this.workspaces = data;
    });
  }

  async success() {
    const alert = await this.alertController.create({
      header: 'Check Availability',
      subHeader: 'Request Sent',
      message: 'Wait for User Response before check in. Thank you!',
      buttons: ['OK']
    });

    await alert.present();

  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: HomeModalPage,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
  async checkAvailability(user_id:number, space_id:number) {
    
    const alert = await this.alertController.create({
      header: 'Check Availability',
      subHeader:'Set date and duration',
      inputs: [
        
        {
          name: 'date',
          type: 'date',
          min: '2018-12-01'
 
        },
        {
          name: 'time',
          type: 'time'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {

            let notification = {
              to_user: user_id,
              date_time:  data.date+'T'+data.time,
              type: 1,
              workspace_id: space_id
            };

            this.notificationService.postNotification(notification)
              .subscribe(data=>{
                this.success();
              });
          }
        }
      ]
    });
    await alert.present();
    }



}