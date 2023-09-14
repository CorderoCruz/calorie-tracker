import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Entry, Macros } from '@interfaces';
import { EntryService } from '../entry-service/entry-service.service';
import { Utils } from 'src/app/utils/utils';
import {
  DataSnapshot,
  Database,
  DatabaseReference,
  child,
  get,
  onValue,
  ref,
  set,
} from '@angular/fire/database';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MacroService {
  constructor() {}

  private db: Database = inject(Database);
  private entryService: EntryService = inject(EntryService);

  public macrosURL: string = 'foods/macros-today';
  public macroTodayRef: DatabaseReference = ref(this.db, this.macrosURL);

  private calories: WritableSignal<number> = signal(0);
  private fat: WritableSignal<number> = signal(0);
  private carbs: WritableSignal<number> = signal(0);
  private protein: WritableSignal<number> = signal(0);

  public totalNutrition: Signal<Macros> = computed<Macros>(() => ({
    calories: this.calories(),
    fat: this.fat(),
    carbs: this.carbs(),
    protein: this.protein(),
  }));

  async checkForDateMacros(date: string): Promise<DataSnapshot> {
    const data: DataSnapshot = await get(
      child(ref(this.db), `${this.macrosURL}/${date}`)
    );
    return data;
  }

  public async getTodaysTotal(): Promise<void> {
    const today: string = Utils.getTodaysDate();
    const todayExists: DataSnapshot = await this.checkForDateMacros(today);
    if (!todayExists.val()) return;
    onValue(this.macroTodayRef, (snapshot: DataSnapshot) => {
      const { calories, carbs, fat, protein }: Macros = snapshot.val()[today];
      this.calories.set(calories);
      this.fat.set(fat);
      this.carbs.set(carbs);
      this.protein.set(protein);
    });
  }

  public updateMacros(grams: number, foodName: string, date: string): void {
    const food: Entry = this.entryService.foodEntries()[foodName];
    const { calories, fat, carbs, protein } = Utils.calculateMacros(
      grams,
      food
    );

    this.calories.update((val) => val + calories);
    this.fat.update((val) => val + fat);
    this.carbs.update((val) => val + carbs);
    this.protein.update((val) => val + protein);
    this.updateTodaysMacrosToDB(date);
  }

  // change this into a put instead of a post
  async updateTodaysMacrosToDB(date: string): Promise<void> {
    const reference: DatabaseReference = ref(
      this.db,
      `${this.macrosURL}/${date}`
    );
    set(reference, { ...this.totalNutrition(), date });
  }

  public async updateFutureMacros(
    grams: number,
    foodName: string,
    date: string
  ): Promise<void> {
    const futureMacros: DataSnapshot = await this.checkForDateMacros(date);

    //if the date exist then we get the
    if (futureMacros.exists()) {
      const food: Entry = this.entryService.foodEntries()[foodName];

      const calculateMacros: Macros = Utils.calculateMacros(grams, food);
      console.log(calculateMacros);

      const totalMacros: Macros = {
        calories: calculateMacros.calories + futureMacros.val().calories,
        fat: calculateMacros.fat + futureMacros.val().fat,
        carbs: calculateMacros.carbs + futureMacros.val().carbs,
        protein: calculateMacros.protein + futureMacros.val().protein,
      };

      const reference: DatabaseReference = ref(
        this.db,
        `${this.macrosURL}/${date}`
      );

      set(reference, { ...totalMacros, date });
    }
  }
}
