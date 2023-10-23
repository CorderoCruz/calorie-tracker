import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Entry } from '@interfaces';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private readonly url: string = environment['apiUrl'];
  private http = inject<HttpClient>(HttpClient);

  public foodEntries = signal<Entry[]>([]);

  public getEntriesFromDB(): Observable<any> {
    return this.http.get<Entry[]>(`${this.url}/entry`).pipe(tap((data) => this.foodEntries.set(data)));
  }

  public addEntryToDB(food: Entry): Observable<Entry> {
    return this.http.post<any>(`${this.url}/entry/create`, food).pipe(
      tap(() => {
        this.foodEntries.update((val) => [...val, food]);
      })
    );
  }

  public updateEntryToDB(entry: Entry, index: number): Observable<Entry> {
    return this.http.put<any>(`${this.url}/entry/edit`, entry).pipe(
      tap(() => {
        this.foodEntries.update((val: Entry[]) => {
          val[index] = entry;
          return val;
        });
      })
    );
  }

  public deleteEntryFromDB(entryName: string, index: number): Observable<any> {
    return this.http
      .delete(`${this.url}/entry/delete`, {
        body: { name: entryName },
      })
      .pipe(
        tap(() =>
          this.foodEntries.update((entries) => {
            entries.splice(index, 1);
            return entries;
          })
        )
      );
  }
}
