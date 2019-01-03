import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { WorkspaceService } from '../../services/workspace.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notifications;

  constructor(
    private notificationService: NotificationService,
    private alertController: AlertController,
    private datePipe: DatePipe,
    private workspaceService: WorkspaceService,
    private router: Router
     ) {}

  ngOnInit(){
    this.loadData();
  }

  loadData(){
    this.notificationService.fetchNotification()
      .subscribe(data=>{

        data.map(notif=>{
          this.workspaceService.getWorkspaceById(notif.workspace_id)
            .subscribe(workspace=>{
              return notif['workspace'] = workspace;
            });
        });

        this.notifications = data;
        console.log(data);
      });
  }
  async alertConfirm(notification) {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to book this workspace? This cant be undone.',
      message: 'If you click confirm it means you read the privacy policy.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.notificationService.deleteNotification(notification)
                .subscribe(data=>{
                  this.loadData();
                  this.router.navigateByUrl('/payment');
                });
          }
        }
      ]
    });

    await alert.present();
  }

  alertAvailability(notification) {
    if(notification.type == 1){
      this.alertController.create({
        header: 'Notification Details',
        subHeader:'Confirm if available at '+this.datePipe.transform(notification.date_time,'short'),
        message: `<ion-img src="${notification.workspace.workspace_image}"></ion-img> <br>
        ${notification.workspace.type } <br> Capacity: ${notification.workspace.capacity } <br> 
        Rate: ${notification.workspace.rate }/ ${notification.workspace.rate_type }<br>
        ${notification.workspace.location_no } ${notification.workspace.location_street }
        ${notification.workspace.location_barangay } ${notification.workspace.location_city } ${notification.workspace.location_province }`,
        buttons: [
           {
            text: 'Deny',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              this.notificationService.confirmNotification(notification)
                .subscribe(data=>{
                  this.loadData();
                });
            }
          }
        ]
      }).then(alert=>{
        alert.present();
      });
    } else if(notification.type == 2){
      this.alertController.create({
        header: 'Notification Details',
        subHeader:' '+this.datePipe.transform(notification.date_time,'short'),
        message: `<ion-img src="${notification.workspace.workspace_image}"></ion-img> <br>
        ${notification.workspace.type } <br> Capacity: ${notification.workspace.capacity } <br> 
        Rate: ${notification.workspace.rate }/ ${notification.workspace.rate_type }<br>
        ${notification.workspace.location_no } ${notification.workspace.location_street }
        ${notification.workspace.location_barangay } ${notification.workspace.location_city } ${notification.workspace.location_province }`,
        buttons: [
           {
            text: 'Book later',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          },
          {
            text: 'Book',
            handler: () => {
              this.alertConfirm(notification);
            }
          }
        ]
      }).then(alert=>{
        alert.present();
      });
    } else if (notification.type == 3){
      this.alertController.create({
        header: 'Suggested Cramspot',
        subHeader:'Workplace Details',
        message: `<ion-img src="${notification.workspace.workspace_image}"></ion-img> <br>
        ${notification.workspace.type } <br> Capacity: ${notification.workspace.capacity } <br> 
        Rate: ${notification.workspace.rate }/ ${notification.workspace.rate_type }<br>
        ${notification.workspace.location_no } ${notification.workspace.location_street }
        ${notification.workspace.location_barangay } ${notification.workspace.location_city } ${notification.workspace.location_province }`,
        buttons: [
           
          {
            text: 'Check Availability',
            handler: () => {
              this.checkAvailability(notification.from_user,notification.workspace_id);
            }
            
          }
        ]
      }).then(alert=>{
        alert.present();
      });
    }

    
  }
  async checkAvailability(user_id:number, space_id:number) {
    console.log(user_id,space_id);
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

    async success() {
      const alert = await this.alertController.create({
        header: 'Check Availability',
        subHeader: 'Request Sent',
        message: 'Wait for User Response before check in. Thank you!',
        buttons: ['OK']
      });
  
      await alert.present();

      await this.loadData();
    }
}

