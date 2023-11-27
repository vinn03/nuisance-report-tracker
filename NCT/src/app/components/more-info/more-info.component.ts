import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VillainService } from '../../services/villain.service';
import { Villain } from '../../models/villain.model';
import { StorageService } from '../../services/storage.service';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrl: './more-info.component.css'
})

export class MoreInfoComponent {

  selectedVillain:Villain;

  constructor(private villainService: VillainService, private http: HttpClient, private storageService: StorageService) { 
    this.selectedVillain = this.villainService.getSelection();
  }

  changeStatus(): void {

    if (this.selectedVillain.status === "RESOLVED") {
      alert("This report has already been resolved!");
      return;
    }

    var password:string | null = prompt("Enter password: ");

    if (password === '' || password === null) {
      alert("Please enter a password!");
      return;
    }

    this.http.get<Object>(`https://api.hashify.net/hash/MD5/hex?value=${password}`).pipe(
      tap((hash: any) => {
        const hashString = JSON.stringify(hash);
        const digestStartIndex = hashString.indexOf("Digest:") + 12;
        const digestEndIndex = hashString.indexOf("\"", digestStartIndex);
        const digest = hashString.substring(digestStartIndex, digestEndIndex);

        if (digest === 'fcab0453879a2b2281bc5073e3f5fe54') {
          this.selectedVillain.status = "RESOLVED";
          this.storageService.saveVillainsToStorage(this.villainService.getVillains()).pipe(
            tap(() => console.log("Saved villains to storage")),
            catchError((error) => {
              console.log("Error saving villains to storage: ", error);
              return of(null);
            })
          ).subscribe();
        }
        else {
          alert("Incorrect password!");
        }
      }),
      catchError((error) => {
        console.log("Error hashing password: ", error);
        return of(null);
      })
    ).subscribe();
  }
}
