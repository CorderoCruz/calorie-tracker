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

@Injectable({
  providedIn: 'root',
})
export class MacroService {
  private db = inject<Database>(Database);
  private entryService = inject<EntryService>(EntryService);

  public readonly macrosURL: string = 'foods/macros-today';
  public readonly macroRef: DatabaseReference = ref(this.db, this.macrosURL);

  private calories = signal<number>(0);
  private fat = signal<number>(0);
  private carbs = signal<number>(0);
  private protein = signal<number>(0);

  public readonly macrosLoading = signal<boolean>(false);

  public readonly totalNutrition: Signal<Macros> = computed<Macros>(() => ({
    calories: this.calories(),
    fat: this.fat(),
    carbs: this.carbs(),
    protein: this.protein(),
  }));

  public async getMacros(date: string): Promise<void> {
    this.macrosLoading.set(true);
    onValue(this.macroRef, (snapshot: DataSnapshot) => {
      const macros: Macros = snapshot.val()[date];
      if (!macros) {
        alert('Macros do not exist for inputed date');
        return;
      }
      this.calories.set(macros.calories);
      this.fat.set(macros.fat);
      this.carbs.set(macros.carbs);
      this.protein.set(macros.protein);
    });

    this.macrosLoading.set(false);
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
    this.updateMacrosToDB(date);
  }

  // change this into a put instead of a post
  private async updateMacrosToDB(date: string): Promise<void> {
    const reference: DatabaseReference = ref(
      this.db,
      `${this.macrosURL}/${date}`
    );
    set(reference, { ...this.totalNutrition(), date });
  }
}
