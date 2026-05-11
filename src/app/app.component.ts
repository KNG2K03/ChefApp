import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonTabs, IonTab, IonHeader, IonToolbar, IonTitle, IonContent, IonTabBar, IonTabButton, IonIcon } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { home, search, person } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonTabs, IonTab, IonHeader, IonToolbar, IonTitle, IonContent, IonTabBar, IonTabButton, IonIcon],
})
export class AppComponent {
  constructor() {
    addIcons({ home, search, person });
  }
}
