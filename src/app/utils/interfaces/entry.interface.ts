export interface Entry {
  name: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
  servingMeasurement: "oz" | "g" | "one";
  servingSize: number;
}
