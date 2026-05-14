import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { IonContent, IonHeader, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonInput, IonButton } from '@ionic/angular/standalone';
import { DatabaseService } from '../Services/database';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.page.html',
  styleUrls: ['./entry.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonSegment, IonSegmentButton, IonLabel, IonList, IonItem, IonInput, IonButton]
})
export class EntryPage implements OnInit {

  isSignUp : boolean = true;
  entry_mode : any = "sign-up";
  top_message : string = "Sign Up";

  first_name : any = "";
  last_name : any = "";
  username : any = "";
  password : any = "";
  recipe_book : any;

  chef : any = {};

  constructor(private storage:Storage, private database:DatabaseService) { }

  async ngOnInit() {
    await this.storage.create();
  }

  async get_guest_recipe_book() : Promise<any> {
    let recipe_book  : any = await this.storage.get('guest_recipe_book') 
    return recipe_book
  }

  segment_change(event:Event) {
    this.entry_mode = (event.target as HTMLIonSegmentElement).value 
    console.log(this.entry_mode) 
    
    if(this.entry_mode === "sign-up") {
      this.isSignUp = true;
      this.top_message = "Sign Up"
    }
    else { 
      this.isSignUp = false;
      this.top_message = "Sign In"
    }
    
  }

  async ConfirmClick() {
    if (this.entry_mode === "sign-up") {
      console.log("Signing up")
      this.recipe_book = this.get_guest_recipe_book
      let user = {
        fname:this.first_name,
        lname:this.last_name,
        uname:this.username,
        pass:this.password,
        rb: this.recipe_book
      }
      this.database.sign_up(user).subscribe(async (data) => {
        await this.storage.set('chef', data.chef)
      })
    }

    else if (this.entry_mode === "sign-in") {
      console.log("Signing in")
      let user = {
        uname:this.username,
        pass:this.password
      }
      this.database.sign_in(user).subscribe(async (data) => {
        await this.storage.set('chef', data.chef)
        let signed_in_chef = await this.storage.get('chef')
        // console.log(signed_in_chef)
        this.top_message = `Welcome back ${signed_in_chef.fname} ${signed_in_chef.lname} (@${signed_in_chef.uname})\nYou have ${signed_in_chef.recipe_book.length} Collections!`
        window.location.href = 'http://localhost:8100/account'
      })
    }

  }

  FirstNameInput(event:Event) {
    this.first_name = (event.target as HTMLIonInputElement).value
  }
  LastNameInput(event:Event) {
    this.last_name = (event.target as HTMLIonInputElement).value
  }
  UserNameInput(event:Event) {
    this.username = (event.target as HTMLIonInputElement).value
  }
  PasswordInput(event:Event) {
    this.password = (event.target as HTMLIonInputElement).value
  }

}
