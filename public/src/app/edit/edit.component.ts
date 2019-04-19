import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  editPet = {_id: "", name: "", type: "", desc: "", skill1: "", skill2: "", skill3: "", likes: 0};
  errMsgs = [];
  rte = "";
  constructor(private _httpService: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.editPet["_id"] = params['id'];
    });
    this.rte = "['/pets/"+this.editPet["_id"]+ "']";
    // this.rte = "/pets/"+this.editPet["_id"];
    let observable = this._httpService.findPet(this.editPet["_id"]);
    observable.subscribe(data => {
      console.log(data);
      this.editPet["name"] = data['pet']["name"];
      this.editPet["type"] = data['pet']["type"];
      this.editPet["desc"] = data['pet']["desc"];
      this.editPet["skill1"] = data['pet']["skill1"];
      this.editPet["skill2"] = data['pet']["skill2"];
      this.editPet["skill3"] = data['pet']["skill3"];
      this.editPet["likes"] = data['pet']["likes"];
    });
  }

  editOnePet(): void {
    this.errMsgs = [];
    let observable = this._httpService.editPet(this.editPet);
    observable.subscribe(data => {
      if (data["error"] != null){
        console.log(data);
        if (data["error"]["errors"]["name"] != null){
          if (data["error"]["errors"]["name"]["kind"] == "unique"){
            this.errMsgs.push("Pet Name must be unique!");
          } else {
            this.errMsgs.push(data["error"]["errors"]["name"]["message"]);
          }
        }
        if (data["error"]["errors"]["type"] != null){
          this.errMsgs.push(data["error"]["errors"]["type"]["message"]);
        }
        if (data["error"]["errors"]["desc"] != null){
          this.errMsgs.push(data["error"]["errors"]["desc"]["message"]);
        }
      } else {
        this.router.navigate(['/pets/'+this.editPet["_id"]]);
      }
    });
  }

  showOnePet(): void {
    this.router.navigate(['/pets/'+this.editPet["_id"]]);
  }
}