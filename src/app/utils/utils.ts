import { Entry, Macros } from '@interfaces';

export class Utils {
  public static calculateMacros(grams: number, food: Entry): Macros {
    const gramsCal: number = grams / food.gramsPerServing;

    const macros: Macros = {
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    };
    for (const macro in macros) {
      macros[macro] = Math.ceil(food[macro] * gramsCal);
    }
    return macros;
  }

  public static getTodaysDate(): string {
    const date: Date = new Date();
    const day: string = this.formatDate(date.getDate());
    const month: string = this.formatDate(date.getMonth() + 1);
    const year: number = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  public static formatDate(date: number): string {
    return date.toString().startsWith('0')
      ? date.toString().split('')[1]
      : date.toString();
  }
}
