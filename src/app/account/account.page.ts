import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Storage } from '@ionic/storage-angular';
import { ChefCollectionComponent } from "../components/chef-collection/chef-collection.component";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ChefCollectionComponent]
})
export class AccountPage implements OnInit {

  user_collections:any[] = [
    {name : "Favourites", amount: "10"},
    {name : "Want to Cook", amount: "20"},
    {name: "Irish Dishes", amount: "4"},
    {name: "American Dishes", amount: "6"},
    {name: "Italian Dishes", amount: "12"}
  ]
  
  user_info:any = {
    account_username: "Anonymous",
    account_fullname: "John Doe",
    account_pfp: "https://i.pinimg.com/736x/92/62/4b/92624b77b81f47cf24e9bde3b5ab7464.jpg"
  }

  constructor() { }

  ngOnInit() {
    
  }

}
