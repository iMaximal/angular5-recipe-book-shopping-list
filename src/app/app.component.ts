import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { API_KEY, AUTH_DOMAIN } from './keys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
