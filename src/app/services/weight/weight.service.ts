import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class WeightService {
  private readonly url: string = environment['apiUrl'];

  private httpClient = inject<HttpClient>(HttpClient);

  public weights = signal<{ date: string; weight: number }[]>([]);

  public displayWeights = computed(() => [...this.weights()]);

  public getWeight(): Observable<unknown> {
    const limit = new Date().getDay();
    return this.httpClient.get(`${this.url}/weight`, { headers: { limit: JSON.stringify(limit) } }).pipe(
      tap((weight) => {
        this.weights.set(weight as { date: string; weight: number }[]);
      })
    );
  }

  public addWeight(date: string, weight: number) {
    const existingWeight = this.weights().findIndex((weights) => weights.date === date);

    if (existingWeight >= 0) {
      if (!confirm('Weight input for this date already exists, do you want to override it?')) {
        return of(undefined);
      } else {
        return this.editWeight(date, weight);
      }
    }
    return this.httpClient.post(`${this.url}/weight`, { date, weight }).pipe(
      tap({
        next: ({ data: { weight, date } }: any) => {
          this.weights.update((weights) => [...weights, { date, weight }]);
        },
        error: (err) => {
          alert(err.message);
        },
      })
    );
  }

  public editWeight(date: string, weight: number) {
    return this.httpClient.put(`${this.url}/weight`, { date, weight }).pipe(
      tap({
        next: ({ data: { weight, date } }: any) => {
          const index = this.weights().findIndex((dateIn) => dateIn.date === date);

          this.weights.update((weights) => {
            weights.splice(index, 1, { date, weight });
            return weights;
          });
        },
        error: (err) => {
          alert(err.message);
        },
      })
    );
  }
}
