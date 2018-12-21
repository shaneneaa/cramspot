import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit(f:NgForm){
    this.auth.signUp(f.value).subscribe(data => {
      localStorage.setItem('token',data['token']);
      this.router.navigateByUrl('/tabs/(home:home)');
    });
  }

}
