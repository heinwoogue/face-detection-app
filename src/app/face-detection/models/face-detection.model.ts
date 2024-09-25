export interface Results {
  results: Result[];
}

export interface Result {
  rectangle: Rectangle;
  confidence: number;
  age: number;
  gender: string;
}

export interface Rectangle {
  left: number;
  top: number;
  right: number;
  bottom: number;
}