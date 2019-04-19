import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  showPet = {_id: "", name: "", type: "", desc: "", skill1: "", skill2: "", skill3: "", likes: 0};
  skills = [];
  showLike = true;
  constructor(private _httpService: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.showPet["_id"] = params['id'];
    });
    let observable = this._httpService.findPet(this.showPet["_id"]);
    observable.subscribe(data => {
      this.showPet["name"] = data['pet']["name"];
      this.showPet["type"] = data['pet']["type"];
      this.showPet["desc"] = data['pet']["desc"];
      this.showPet["skill1"] = data['pet']["skill1"];
      this.showPet["skill2"] = data['pet']["skill2"];
      this.showPet["skill3"] = data['pet']["skill3"];
      this.showPet["likes"] = data['pet']["likes"];

      if (data['pet']["skill1"] != "" && data['pet']["skill1"] != null){
        this.skills.push(data['pet']["skill1"]);
      }
      if (data['pet']["skill2"] != "" && data['pet']["skill2"] != null){
        this.skills.push(data['pet']["skill2"]);
      }
      if (data['pet']["skill3"] != "" && data['pet']["skill3"] != null){
        this.skills.push(data['pet']["skill3"]);
      }
    });
  }

  likeAPet(){
    this.showPet["likes"] += 1;
    let observable = this._httpService.editPet(this.showPet);
    observable.subscribe(data => {
      this.showLike = false;
    });
  }

  adoptPet(){
    let observable = this._httpService.deletePet(this.showPet);
    observable.subscribe(data => {
      this.router.navigate(['/pets']);
    });
  }
}