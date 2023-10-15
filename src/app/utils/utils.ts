import { Entry, Macros } from "@interfaces";

export class Utils {
  public static calculateMacros(weight: number, food: Entry): Partial<Macros> {
    const macros: Partial<Macros> = {
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    };

    const weightCal: number = weight / food.servingSize;

    for (const macro in macros) {
      macros[macro] = Math.ceil(food[macro] * weightCal);
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

  public static formatInputDateMaterial(date: Array<string>): string {
    let returnedDate: string = "";
    switch (date[1]) {
      case "Jan":
        returnedDate = "1";
        break;
      case "Feb":
        returnedDate = "2";
        break;
      case "Mar":
        returnedDate = "3";
        break;
      case "Apr":
        returnedDate = "4";
        break;
      case "May":
        returnedDate = "5";
        break;
      case "Jun":
        returnedDate = "6";
        break;
      case "Jul":
        returnedDate = "7";
        break;
      case "Aug":
        returnedDate = "8";
        break;
      case "Sep":
        returnedDate = "9";
        break;
      case "Oct":
        returnedDate = "10";
        break;
      case "Nov":
        returnedDate = "11";
        break;
      case "Dec":
        returnedDate = "12";
        break;
    }

    return `${returnedDate}-${date[2]}-${date[3]}`;
  }
}
