import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WeightService {
  private readonly url: string = environment['apiUrl'];

  private httpClient = inject<HttpClient>(HttpClient);

  public weights = signal<{ date: string; weight: number }[]>([]);

  public displayWeights = computed(() => [...this.weights()]);

  public getWeight(): Observable<unknown> {
    return this.httpClient.get(`${this.url}/weight`).pipe(
      tap((weight) => {
        this.weights.set(weight as { date: string; weight: number }[]);
      })
    );
  }

  public addWeight(date: string, weight: number) {
    return this.httpClient.post(`${this.url}/weight`, { date, weight }).pipe(
      tap(() => {
        this.weights.update((val) => [...val, { date, weight }]);
      })
    );
  }
}
