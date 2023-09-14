import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  Database,
  set,
  ref,
  onValue,
  remove,
  get,
  DataSnapshot,
  child,
  DatabaseReference,
} from '@angular/fire/database';
import { Entry } from '@interfaces';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  constructor() {}

  private db: Database = inject(Database);

  public entriesURL: string = 'foods/entries';
  public entriesRef: DatabaseReference = ref(this.db, this.entriesURL);

  public foodEntries: WritableSignal<Entry[]> = signal([]);

  public getEntries(): void {
    onValue(this.entriesRef, (snapshot: DataSnapshot) => {
      const foods = snapshot.val();
      this.foodEntries.set(foods);
    });
  }

  public async addEntryToDB(food: Entry): Promise<void> {
    const entry: DataSnapshot = await get(
      child(ref(this.db), `foods/entries/${food.name}`)
    );
    if (entry.exists()) {
      const userResponse: boolean = confirm(
        'Name already exists, do you want to override it?'
      );
      if (!userResponse) return;
    }

    const foodListRef: DatabaseReference = ref(this.db);
    set(child(foodListRef, `${this.entriesURL}/${food.name}`), food);
  }

  async updateEntryToDB(updatedEntry: Entry): Promise<void> {
    const reference: DatabaseReference = ref(
      this.db,
      `${this.entriesRef}/${updatedEntry.name}`
    );
    set(reference, { ...updatedEntry });
  }

  public deleteEntryFromDB(entryName: string): void {
    const document = ref(this.db, `${this.entriesURL}/${entryName}`);
    remove(document);
  }
}
