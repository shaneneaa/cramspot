import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { WorkspaceService } from '../../services/workspace.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-workspace',
  templateUrl: './list-workspace.page.html',
  styleUrls: ['./list-workspace.page.scss'],
})
export class ListWorkspacePage implements OnInit {

  private chosenImage;
  private previewImage;

  constructor(
    private alertController: AlertController,
    private workspaceService: WorkspaceService,
    private router: Router
    ) { }

  ngOnInit() {
    this.previewImage = "assets/icon/upload.png";
  }

  async postAlert() {
    const alert = await this.alertController.create({
      header: 'Success',
      subHeader: 'Your post is uploading',
      message: 'Wait for admin to verify your workspace.',
      buttons: [
        {
          text: 'Okay',
          handler: () => {
            this.router.navigateByUrl('/home');
          }
        }
      ]
    });

    await alert.present();
  }


  onChangeImage(event){
    this.chosenImage = event.target.files[0];
    this.previewImage = URL.createObjectURL(event.target.files[0]);
  }

  post(f:NgForm){
    //attach form value to form data
    let formData = new FormData();
    Object.keys(f.value).forEach(e=>{
      formData.append(e,f.value[e]);
    });
    //append image to form data
    formData.append('workspace_image',this.chosenImage);

    this.workspaceService.postWorkspace(formData)
      .subscribe(data=>{
        this.postAlert();
      });
  }

  
}
