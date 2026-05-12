import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chef-collection',
  templateUrl: './chef-collection.component.html',
  styleUrls: ['./chef-collection.component.scss'],
})
export class ChefCollectionComponent  implements OnInit {

  collection_name = input<string>();
  amount_of_meals = input<string>();
  

  constructor() { }

  ngOnInit() {}

}
