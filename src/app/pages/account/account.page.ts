import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActionSheetController } from '@ionic/angular';
import { ScrollDetail } from '@ionic/core';
import { WorkspaceService } from 'src/app/services/workspace.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  workspaces:any[];
  showToolbar = false;
  showList = true;
  showBook = false;

  constructor(
    private auth: AuthenticationService,
    public actionSheetController: ActionSheetController,
    private workspaceService:WorkspaceService
    ) { }



  
  ngOnInit() {
    this.workspaceService.getWorkspaceByUserId(this.auth.getDecodedToken().user_id)
    .subscribe(data=>{
      this.workspaces = data;
    });
  }

    segmentChanged(ev: any) {
      console.log(this.showList, this.showBook)
    this.showBook=!this.showBook;
    this.showList=!this.showList;
  }
     
  onScroll($event: CustomEvent<ScrollDetail>) {
    if ($event && $event.detail && $event.detail.scrollTop) {
      const scrollTop = $event.detail.scrollTop;
      this.showToolbar = scrollTop >=70;
    }
  }
  logout(){
    this.auth.logout();
  }
  async setting() {
    const actionSheet = await this.actionSheetController.create({
      header: 'More',
      buttons: [{
        text: 'Account Settings',
        icon: 'person',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Edit Profile',
        icon: 'create',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Logout',
        icon: 'power',
        handler: () => {
          this.logout();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async more() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Option',
      buttons: [{
        text: 'Edit',
        icon: 'create',
        handler: () => {
        }
      }, {
        text: 'Delete',
        role: 'destructive',
        icon: 'Trash',
        handler: () => {
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
        }
      }]
    });
    await actionSheet.present();
  }

}
