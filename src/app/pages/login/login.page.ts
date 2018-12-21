import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NgForm } from '@angular/forms';
import { Api } from '../../entities/api.class';
import { tokenKey } from '@angular/core/src/view';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  logosrc:string = "assets/cramspotlogo.png";

  constructor(
    private auth: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {

  }

  onSubmit(f:NgForm){
    this.auth.login(f.value).subscribe(data=>{
      localStorage.setItem('token',data['token']);
      this.router.navigateByUrl('/home');
    });
  }

}
