declare const google: any;

import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialLoginModule } from '@abacritt/angularx-social-login';
import { Component, inject, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'app-demo-login',
  imports: [ GoogleSigninButtonModule],
  templateUrl: './demo-login.component.html',
  styleUrl: './demo-login.component.scss'
})
export class DemoLoginComponent implements OnInit {

  private router= inject(Router)

  constructor(private authService: SocialAuthService) { }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '92038547519-re3sma2872pk5vouoetjh9psshe4vb2n.apps.googleusercontent.com',
      callback: (response: any) => {
        this.handleLogin(response);
      }});
      google.accounts.id.renderButton(document.getElementById('google-btn'),{
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      type: 'standard',
      width: '300',
      text: 'Login with Google'
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if(response) {
      //decoding for now 
      const payLoad = this.decodeToken(response.credential);
      sessionStorage.setItem('loggedInUser', JSON.stringify(payLoad));
      this.router.navigate(['home']);
  }

}

}
