import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, AlertController } from '@ionic/angular';
import { WorkspaceService } from '../../services/workspace.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-feed-modal',
  templateUrl: './feed-modal.page.html',
  styleUrls: ['./feed-modal.page.scss'],
})

export class FeedModalPage implements OnInit {

  workspaces:any[];

  constructor(
    private modalController:ModalController,
    private workspaceService:WorkspaceService,
    private auth:AuthenticationService,
    private params: NavParams,
    private notificationService: NotificationService,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    this.workspaceService.getWorkspaceByUserId(this.auth.getDecodedToken().user_id)
    .subscribe(data=>{
      this.workspaces = data;
    });
  }
  
  onSuggest(workspace){

    let notification = {
      to_user: this.params.data.feed.user_id,
      from_user: this.auth.getDecodedToken().user_id,
      type: 3,
      workspace_id : workspace.space_id
    };

    this.notificationService.postNotification(notification)
      .subscribe(data=>{
        
        console.log(data);
      });
      this.presentAlert();
      
    
  }

  dismissss(){
    this.modalController.dismiss();
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Your workspace suggestion has been sent.',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
           this.dismissss();
          }
        }
      ]
    });

    await alert.present();
  }

}
