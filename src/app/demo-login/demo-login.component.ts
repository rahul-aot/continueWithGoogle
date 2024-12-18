declare const google: any;

import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthService, SocialLoginModule } from '@abacritt/angularx-social-login';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-demo-login',
  imports: [ GoogleSigninButtonModule],
  templateUrl: './demo-login.component.html',
  styleUrl: './demo-login.component.scss'
})
export class DemoLoginComponent implements OnInit {

  private platformId = inject(PLATFORM_ID);
  private router= inject(Router)

  constructor(private authService: SocialAuthService) { }

  ngOnInit(): void {
    // Ensure this code only runs in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleScript().then(() => {
        google.accounts.id.initialize({
          client_id: '92038547519-re3sma2872pk5vouoetjh9psshe4vb2n.apps.googleusercontent.com',
          callback: (response: any) => {
            this.handleLogin(response);
          },
        });

        google.accounts.id.renderButton(document.getElementById('google-btn'), {
          theme: 'filled_white',
          size: 'large',
          shape: 'circular',
          type: 'standard',
          width: '300',
          text: 'Continue with Google',
        });
      });
    }
  }


  private loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined') {
        resolve();
      } else {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Google script failed to load.'));
        document.head.appendChild(script);
      }
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
