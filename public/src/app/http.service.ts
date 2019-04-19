import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAllPets() {
    return this._http.get('/allpets');
  }

  findPet(authId) {
    return this._http.get('/allpets/'+ authId);
  }

  postNewPet(newPet) {
    return this._http.post('/allpets', newPet);
  }

  editPet(editedPet) {
    console.log("Edited Task:", editedPet);
    return this._http.put('/allpets/'+ editedPet["_id"], editedPet);
  }

  deletePet(delPet) {
    return this._http.delete('/allpets/'+ delPet["_id"]);
  }
}