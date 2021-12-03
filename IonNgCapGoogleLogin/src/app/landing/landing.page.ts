import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Http } from '@capacitor-community/http';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  user: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      let data = this.router.getCurrentNavigation().extras.state;
      if (data.user) {
          this.user = data.user;
      }
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  signOut() {
    GoogleAuth.signOut().then(() => {
    this.router.navigate(['home']);
    });
  }

  async getUserProfileData(token) {
    const options = {
      url: `https://www.googleapis.com/oauth2/v2/userinfo?key=AIzaSyBuwtOANUtiCkknAo66yn5TCpUyc78LWRM&oauth_token=${token}`,
      headers:{'Content-Type': 'application/json'}
    };
    const response = await Http.request({ ...options, method: 'GET' });
    this.user = response.data;
  }
}
