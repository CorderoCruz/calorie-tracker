import { Injectable, WritableSignal, inject, signal } from "@angular/core";
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
} from "@angular/fire/database";
import { Entry } from "@interfaces";

@Injectable({
  providedIn: "root",
})
export class EntryService {
  private readonly db = inject<Database>(Database);

  public readonly entriesURL: string = "foods/entries";
  public readonly entriesRef: DatabaseReference = ref(this.db, this.entriesURL);

  public foodEntries = signal<Entry[]>([]);

  public getEntries(): void {
    onValue(this.entriesRef, (snapshot: DataSnapshot) => {
      const foods = snapshot.val();
      this.foodEntries.set(foods);
    });
  }

  public async addEntryToDB(food: Entry): Promise<void> {
    const entry: DataSnapshot = await get(
      child(ref(this.db), `${this.entriesURL}/${food.name}`)
    );
    if (entry.exists()) {
      const userResponse: boolean = confirm(
        "Entry already exists, do you want to override it?"
      );
      if (!userResponse) return;
    }

    set(child(ref(this.db), `${this.entriesURL}/${food.name}`), food);
  }

  async updateEntryToDB(updatedEntry: Entry): Promise<void> {
    const reference: DatabaseReference = ref(
      this.db,
      `${this.entriesRef}/${updatedEntry.name.replaceAll(" ", "%20")}`
    );
    set(reference, { ...updatedEntry });
  }

  public deleteEntryFromDB(entryName: string): void {
    const document = ref(this.db, `${this.entriesURL}/${entryName}`);
    remove(document);
  }
}
