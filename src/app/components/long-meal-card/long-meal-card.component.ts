import { Component, input, OnInit } from '@angular/core';
import { IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-long-meal-card',
  templateUrl: './long-meal-card.component.html',
  styleUrls: ['./long-meal-card.component.scss'],
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle],
})
export class LongMealCardComponent  implements OnInit {

  meal_name = input<string>();
  meal_image = input<string>();
  meal_area = input<string>();
  meal_category = input<string>();
  
  constructor() { }

  ngOnInit() {}

}
