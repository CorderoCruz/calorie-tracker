import { Entry, Macros } from "@interfaces";

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

  public static date: Date = new Date();

  public static getTodaysDate(): string {
    const date: Date = new Date();
    const day: string = this.formatDate(date.getDate().toString());
    const month: string = this.formatDate((date.getMonth() + 1).toString());
    const year: number = date.getFullYear();
    return `${month}-${day}-${year}`;
  }

  public static formatDate(date: string): string {
    return date.toString().startsWith("0")
      ? date.toString().split("")[1]
      : date.toString();
  }

  //input the date and format it ""THATS IT!
  public static formatInputDate(date: string): string {
    let monthAndDay: Array<string> = date.split("-");
    for (let i: number = 0; i < monthAndDay.length; i++) {
      if (monthAndDay[i].startsWith("0")) {
        monthAndDay[i] = monthAndDay[i].slice(1);
      }
    }

    const year: Array<string> = monthAndDay.splice(0, 1);
    return this.formatDate(monthAndDay.concat(year).join("-"));
  }
}
