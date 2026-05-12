import { Component, input, OnInit } from '@angular/core';
import { IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader } from "@ionic/angular/standalone";


@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
  imports: [IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader]
})
export class MealCardComponent implements OnInit {

  meal_name = input<string>();
  meal_image = input<string>();
  meal_area = input<string>();
  meal_category = input<string>();

  constructor() { }

  ngOnInit() { }

  

}
