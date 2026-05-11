import { Component, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar } from '@ionic/angular/standalone';
import { FoodService } from '../Services/food';
import { LongMealCardComponent } from "../components/long-meal-card/long-meal-card.component";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSearchbar, LongMealCardComponent]
})
export class SearchPage implements OnInit {

  constructor(private foodservice:FoodService) { }

  ngOnInit() {
  }

  search_results : any[] = []

  input_event(event:Event) {
    // get input from the search bar 
    let search : string = (event.target as HTMLIonSearchbarElement).value as string
    if (search.length > 0) {
      this.search_results = []
      this.foodservice.search_food(search).subscribe((data) => {
        // console.log(data.meals)
        for (let x of data.meals) {

          // create meal object to hold required attributes 
          let meal : any = {
            meal_name : x.strMeal,
            meal_image : x.strMealThumb,
            meal_area : x.strArea,
            meal_category : x.strCategory,
            meal_id : x.idMeal
          }

          // add the meal to the search results array
          this.search_results.push(meal)
        }
        console.log(this.search_results)
      })
    }
  }

}
