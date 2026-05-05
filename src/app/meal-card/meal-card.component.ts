import { Component, OnInit } from '@angular/core';
import { MealTagComponent } from '../meal-tag/meal-tag.component';
import { IonCard, IonHeader, IonCardTitle, IonCardSubtitle, IonContent, IonCardContent, IonCardHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
  imports: [MealTagComponent, IonCard, IonHeader, IonCardTitle, IonCardSubtitle, IonContent, IonCardContent, IonCardHeader]
})
export class MealCardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  meal_info = {
    meal_name:  "meal name",
    meal_image: "https://www.themealdb.com/images/media/meals/sutysw1468247559.jpg",
    meal_category: "meal category",
    meal_area: "meal area"
  }

}
