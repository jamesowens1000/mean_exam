import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pets = [];
  constructor(private _httpService: HttpService, private router: Router) { }

  ngOnInit() {
    let observable = this._httpService.getAllPets();
    observable.subscribe(data => {
      console.log(data);
      this.pets = data['pets'];
    });
  }

  showOnePet(pet: Object): void {
    this.router.navigate(['/pets/'+pet["_id"]]);
  }

  editAPet(pet: Object): void {
    this.router.navigate(['/pets/'+pet["_id"]+'/edit']);
  }
}