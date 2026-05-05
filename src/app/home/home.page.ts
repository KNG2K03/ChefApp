import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { MealCardComponent } from '../meal-card/meal-card.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MealTagComponent } from '../meal-tag/meal-tag.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, MealCardComponent, MealTagComponent],
})
export class HomePage {
  constructor() {}
}
