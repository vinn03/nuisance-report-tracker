import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Villain } from '../models/villain.model';
import { VillainLocation } from '../models/location.model';
import { key } from '../../../key.json';

@Injectable({
    providedIn:'root'
})

export class StorageService {   
    private apiURL = key;

    constructor(private http: HttpClient) { }

    loadLocationsFromStorage(): Observable<any> {
        const locations : Observable<Object> = this.http.get(this.apiURL + "locations/");
        console.log("Retrieved locations");
        return locations;
    }

    loadVillainsFromStorage(): Observable<any> {
        const villains : Observable<Object> = this.http.get(this.apiURL + "villains/");
        console.log("Retrieved villains");
        return villains;
    }

    saveLocationsToStorage(locations: VillainLocation[]): Observable<any> {
        console.log("Saving locations: ", locations);

        const locationsData = {
            "key": "locations",
            "data": locations
        }
        return this.http.put(this.apiURL + "locations/", locationsData);
    }

    saveVillainsToStorage(villains: Villain[]): Observable<any> {
        console.log("Saving villains: ", villains);

        const villainsData = {
            "key": "villains",
            "data": villains
        }
        return this.http.put(this.apiURL + "villains/", villainsData);
    }
    

}