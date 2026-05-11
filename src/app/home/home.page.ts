import { Component, input } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonTab, IonTabs, IonIcon, IonTabButton, IonTabBar } from '@ionic/angular/standalone';
import { MealCardComponent } from '../components/meal-card/meal-card.component';
import { FoodService } from '../Services/food';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, MealCardComponent, IonList, IonItem, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonTab, IonTabs, IonIcon, IonTabButton, IonTabBar],
})
export class HomePage {
  constructor(private foodService:FoodService) {
    // get 5 countries and add them to the featured countries array
    for (let i=0; i<=4; i++) {
      // get random number for featured country array 
      let random_country_number = this.get_random_whole_number(0, this.featured_country_list.length);
      
      // get a new random country if the random country is already in the featured country list
      while (this.featured_countries.includes(this.featured_country_list[random_country_number])) {
        random_country_number = this.get_random_whole_number(0, this.featured_country_list.length)
      }

      // append the index(i) with country name
      this.featured_countries[i] = this.featured_country_list[random_country_number]
    }
    
    this.getFood()
  }

  // a list of potential countries to be featured on the home page
  featured_country_list = [ "Ireland", "Italy", "China", "Kenya", "India", "United States", "France", "Spain", "Saudi Arabia", "Thailand", "United Kingdom", "Turkey", "Vietnam", "Portugal", "Philippines" ]
  
  // the list of countries to be featured on the home page 
  featured_countries : string[] = []
  
  // the list of countries and their meals to be featured on the home page
  featured_meals_info : any = []

  get_random_whole_number(min:number, max:number) : number {
    const min_ceil = Math.ceil(min)
    const max_floor = Math.floor(max)
    return Math.floor(Math.random()*(max_floor-min_ceil)+min_ceil)
  }

  getFood() {
    
    // iterate through country 
    this.featured_countries.forEach((country) => {
      this.foodService.search_by_country(country).subscribe((data) => {
        let amount_of_meals = 0
        // console.log(`${data.meals[0].strArea}\n${data.meals.length}`)
        
        // object holding data about country and it's meals 
        let country_meals = {
          name : data.meals[0].strArea,
          meals : []
        }
        
        // conditions to ensure the amount of meals per country is less than or equal to 10
        if (data.meals.length < 10) amount_of_meals = data.meals.length
        else amount_of_meals = 10

        for (let i = 0; i < amount_of_meals; i++) {
          // console.log(data.meals[i].strMeal+"\n"+data.meals[i].strArea)
          this.foodService.search_by_id(data.meals[i].idMeal).subscribe((data) => {
            // console.log(data)

            // an object to hold data about a specific meal 
            let meal = {
              meal_name: data.meals[0].strMeal,
              meal_image: data.meals[0].strMealThumb,
              meal_category: data.meals[0].strCategory,
              meal_area: data.meals[0].strArea
            }

            // add the meal to the countries' meals array
            country_meals.meals.push(meal as never)
          })
        }

        this.featured_meals_info.push(country_meals)
        // console.log(this.featured_meals_info)

      })
    })

  }
}
