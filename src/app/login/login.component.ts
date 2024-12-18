import { Component } from '@angular/core';
import { DemoLoginComponent } from "../demo-login/demo-login.component";

@Component({
  selector: 'app-login',
  imports: [DemoLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // handleCredentialResponse(response: any): void {
  //   debugger
  //   try {
  //     // Decode the JWT token
  //     console.log(response);
  //     const responsePayload = JSON.parse(atob(response.credential.split('.')[1]));
      
  //     // Store user information in session storage
  //     sessionStorage.setItem('loggedInUser', JSON.stringify(responsePayload));
      
  //     // Redirect or perform further actions
  //     // window.location.href = '/dashboard';
  //   } catch (error) {
  //     console.error('Error decoding JWT token:', error);
  //   }
  // }
}
