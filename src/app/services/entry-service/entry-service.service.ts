import { HttpClient } from "@angular/common/http";
import { Injectable, inject, signal } from "@angular/core";
import { Entry } from "@interfaces";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class EntryService {
  private readonly url: string = environment["apiUrl"];
  private http = inject<HttpClient>(HttpClient);

  public foodEntries = signal<Entry[]>([]);

  public getEntriesFromDB(): Observable<any> {
    return this.http
      .get<Entry[]>(`${this.url}/entry`)
      .pipe(tap((data) => this.foodEntries.set(data)));
  }

  public addEntryToDB(food: Entry) {
    return this.http
      .post<Observable<Entry[]>>(`${this.url}/entry/create`, food)
      .pipe(tap(() => this.foodEntries.update((val) => [...val, food])))
      .subscribe()
      .unsubscribe();
  }

  public deleteEntryFromDB(entryName: string) {
    return this.http
      .delete(`${this.url}/api/v1/entry/delete`, {
        body: { name: entryName },
      })
      .subscribe()
      .unsubscribe();
  }
}
