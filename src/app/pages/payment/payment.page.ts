import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import { DatePipe } from '@angular/common';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  notification_id: number;
  notification:any;

  constructor(
    private alertController: AlertController,
    private notificationService: NotificationService,
    private datePipe: DatePipe,
    private workspaceService: WorkspaceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthenticationService
    ) { 
    this.notification_id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  }


   ngOnInit() {
    this.notificationService.getNotificationById(this.notification_id).subscribe(data=>{
    
      this.notification = data;  
    });
  }
   async alertConfirm() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message:`Are you sure you really want to book this workspace? This can't be undone`,
      
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Proceed',
          handler: () => {
            let temp = {
              space_id: this.notification.workspace_id,
              user_id:  this.auth.getDecodedToken().to_user,
              date_time: this.notification.date_time,
              host_id: this.notification.from_user,
            };
            this.workspaceService.postBookedWorkspace(temp).subscribe(
              ()=>{
                this.notificationService.deleteNotification(this.notification).subscribe()

              }

              );
           
            this.router.navigateByUrl('/reservation-details');
            
            
          }
        }
      ]
    });

    await alert.present();
  }

}
