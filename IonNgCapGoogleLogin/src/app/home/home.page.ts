import { Component } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userInfo = null;
  loginData = {
    username: '',
    password: '',
  };
  showPassword: boolean = false;

  constructor(private router: Router) {}

  ionViewDidEnter() {
    GoogleAuth.init();
  }

  /**
   * Show or hide the password
   */
  showHide() {
    this.showPassword = !this.showPassword;
  }

  /**
   * Refresh
   */
  checkLoggedIn() {
    GoogleAuth.refresh()
      .then((data) => {
        if (data.accessToken) {
          let navigationExtras: NavigationExtras = {
            state: {
              user: {
                type: 'existing',
                accessToken: data.accessToken,
                idToken: data.idToken,
              },
            },
          };
          this.router.navigate(['landing'], navigationExtras);
        }
      })
      .catch((e) => {
        if (e.type === 'userLoggedOut') {
          this.doLogin();
        }
      });
  }

  /**
   * Login the user
   */
  async doLogin() {
    const user = await GoogleAuth.signIn();
    if (user) {
      this.goToHome(user);
    }
  }

  goToHome(user) {
    let navigationExtras: NavigationExtras = { state: { user: user } };
    this.router.navigate(['landing'], navigationExtras);
  }
}
