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
  workspace;
  a=false;
  b=true;
  c=true;
  d=true;
  e=true;
  fa=true;
  g=true;
  h=true;
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

  next(next){
    if(next=='b'){
      this.a=true; this.b=false;
    }
    if(next=='c'){
      this.b=true; this.c=false;
    }
    if(next=='d'){
      this.c=true; this.d=false;
    }
    if(next=='e'){
      this.d=true; this.e=false;
    }
    if(next=='fa'){
      this.e=true; this.fa=false;
    }
    if(next=='g'){
      this.fa=true; this.g=false;
    }
    if(next=='h'){
      this.g=true; this.h=false;
    }
  }
  prev(prev){
    if(prev=='a'){
      this.h=true; this.b=true; this.a=false;
    }
    if(prev=='b'){
      this.c=true; this.h=true; this.b=false;
    }
    if(prev=='c'){
      this.d=true; this.c=false; this.h=true;
    }
    if(prev=='d'){
      this.e=true; this.d=false; this.h=true;
    }
    if(prev=='e'){
      this.fa=true; this.d=false; this.h=true;
    }
    if(prev=='fa'){
      this.g=true; this.fa=false; this.h=true;
    }
    if(prev=='g'){
      this.h=true; this.g=false; this.h=true;
    }
  }

  async alertBack() {
    const alert = await this.alertController.create({
      header: `You haven't post your workspace yet`,
      message: 'Are you sure you want to go back to home?',
      buttons: [
        {
          text: 'Cancel'
        },
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

  async requiredAlert(field,position ) {
    const alert = await this.alertController.create({
      header: 'Attention',
      message: `${field} is required`,
      buttons: [
        {
          text: 'Okay',
          handler: () => {
           this.prev(position);
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
     this.workspace= f.value;
     console.log(this.workspace);
     if(this.workspace.title==""){
      this.requiredAlert("Title","a");

    }
    else if(this.workspace.description==""){
      this.requiredAlert("Description","a");
    }
    else if(this.workspace.type==""){
      this.requiredAlert("Type of workspace","b");
    }
    else if(this.workspace.rate==""){
      this.requiredAlert("Rate","d");
    }
    else if(this.workspace.rate_type==""){
      this.requiredAlert("Type of rate","d");
    }
    else if(this.workspace.desk_quantity==""){
      this.requiredAlert("Number of desk","c");
    }
    else if(this.workspace.capacity==""){
     this.requiredAlert("Capacity","c");
   }
    else if(this.workspace.amenities==""){
      this.requiredAlert("Amenities","e");
    }
    else if(this.workspace.location_no==""){
      this.requiredAlert("Unit#","f");
    }
    else if(this.workspace.location_street==""){
      this.requiredAlert("Street","f");
    }
    else if(this.workspace.location_barangay==""){
      this.requiredAlert("Barangay","f");
    }
    else if(this.workspace.location_city==""){
      this.requiredAlert("City","f");
    }
    else if(this.workspace.location_province==""){
      this.requiredAlert("Province","f");
    }
    
    else{
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

  
}
