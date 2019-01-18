import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
 user;
 pass2: string;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private alertController: AlertController
    ) { }

  ngOnInit() {
  }

  async requiredAlert(field) {
    const alert = await this.alertController.create({
      header: 'Attention',
      message: `${field} is required`,
      buttons: ['OK']
    });

    await alert.present();
  }
  async passwordAlert() {
    const alert = await this.alertController.create({
      header: 'Attention',
      message: `Password didn't match.`,
      buttons: ['OK']
    });

    await alert.present();
  }
  onSubmit(f:NgForm){
    

  this.user=f.value;
  console.log(this.user);
  
   if(this.user.firstname==""){
    this.requiredAlert("Firstname");
   }
   else if(this.user.lastname==""){
    this.requiredAlert("Lastname");

   }
   else if(this.user.contactnum==""){
    this.requiredAlert("Contact Number should be number and");

   }
   else if(this.user.email==""){
    this.requiredAlert("Email");

   }
   else if(this.user.password==""){
    this.requiredAlert("Password");

   }
   else if(this.user.password!=this.pass2){
    this.passwordAlert();

   }
    else{
      this.auth.signUp(f.value).subscribe(data => {
        localStorage.setItem('token',data['token']);
        this.router.navigateByUrl('/home');
      });

    }
  }

}
