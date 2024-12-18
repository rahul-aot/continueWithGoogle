declare const google: any;

import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialLoginModule } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


@Component({
  selector: 'app-demo-login',
  imports: [ GoogleSigninButtonModule],
  templateUrl: './demo-login.component.html',
  styleUrl: './demo-login.component.scss'
})
export class DemoLoginComponent implements OnInit {

  constructor(private authService: SocialAuthService) { }

  ngOnInit(): void {
    console.log('DemoLoginComponent initialized');
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID)
      .then(() => console.log('Token refreshed successfully'))
      .catch(err => console.error('Error refreshing token', err));
  }

}
