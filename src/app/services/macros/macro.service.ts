import { Injectable, Signal, computed, inject, signal } from "@angular/core";
import { Entry, Macros } from "@interfaces";
import { EntryService } from "../entry/entry-service.service";
import { Utils } from "src/app/utils/utils";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MacroService {
  private readonly url: string = environment["apiUrl"];
  hasLandedOnPage = signal<boolean>(false);

  private http = inject<HttpClient>(HttpClient);
  private entryService = inject<EntryService>(EntryService);

  private calories = signal<number>(0);
  private fat = signal<number>(0);
  private carbs = signal<number>(0);
  private protein = signal<number>(0);
  private date = signal<string>("");

  public macrosLoading = signal<boolean>(false);

  public readonly totalNutrition: Signal<Macros> = computed<Macros>(() => ({
    calories: this.calories(),
    fat: this.fat(),
    carbs: this.carbs(),
    protein: this.protein(),
    date: this.date(),
  }));

  public getMacrosFromDB(date: string) {
    return this.http.get(`${this.url}/macros/date`, { params: { date } }).pipe(
      tap((data: any) => {
        if (!data?.data) {
          this.calories.set(0);
          this.fat.set(0);
          this.carbs.set(0);
          this.protein.set(0);
          return;
        }
        const { calories, carbs, protein, fat, date } = data.data;
        console.log(data.data);
        this.calories.set(calories);
        this.fat.set(fat);
        this.carbs.set(carbs);
        this.protein.set(protein);
        this.date.set(date);
      })
    );
  }

  public updateMacros(weight: number, foodName: string, date: string) {
    const food: Entry | undefined = this.entryService
      .foodEntries()
      .find((entry) => entry.name === foodName);
    if (!food) {
      return;
    }

    const calculatedMacros: Partial<Macros> =
      food["servingMeasurement"] === "one"
        ? Utils.calculateMacros(1, food)
        : Utils.calculateMacros(weight, food);
    return this.updateMacrosToDB({
      ...calculatedMacros,
      date,
    } as Macros);
  }

  // change this into a put instead of a post
  private updateMacrosToDB(macros: Macros) {
    return this.http.put(`${this.url}/macros`, macros).pipe(
      tap(({ data }: any) => {
        this.calories.set(data.calories);
        this.fat.set(data.fat);
        this.carbs.set(data.carbs);
        this.protein.set(data.protein);
      })
    );
  }
}
