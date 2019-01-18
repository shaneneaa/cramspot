import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NgForm } from '@angular/forms';
import { Api } from '../../entities/api.class';
import { tokenKey } from '@angular/core/src/view';
import { Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  logosrc:string = "assets/cramspotlogo.png";
  user;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private menuController: MenuController,
    private alertController: AlertController
    ) { }

  ngOnInit() {
    this.menuController.enable(false);
  }
  async requiredAlert() {
    const alert = await this.alertController.create({
      header: 'Attention',
      message: `Email is required`,
      buttons: ['OK']
    });

    await alert.present();
  }

  onSubmit(f:NgForm){
    this.user=f.value;
    if(this.user.email==""){
      this.requiredAlert();
    }
    this.auth.login(f.value).subscribe(data=>{
      localStorage.setItem('token',data['token']);
      this.router.navigateByUrl('/home');
    });
  }

}
