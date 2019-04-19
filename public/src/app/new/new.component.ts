import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  newPet = {name: "", type: "", desc: "", skill1: "", skill2: "", skill3: ""};
  errMsgs = [];
  constructor(private _httpService: HttpService, private router: Router) { }

  ngOnInit() {
    
  }

  createNewPet(): void{
    this.errMsgs = [];
    let observable = this._httpService.postNewPet(this.newPet);
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
        this.router.navigate(['/pets']);
      }
    });
  }
}