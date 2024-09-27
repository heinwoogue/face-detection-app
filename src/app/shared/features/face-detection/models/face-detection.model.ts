export interface FaceDetectionResults {
  results: FaceDetectionResult[];
}

export interface FaceDetectionResult {
  rectangle: FaceDetectionRectangle;
  confidence: number;
  age: number;
  gender: string;
}

export interface FaceDetectionRectangle {
  left: number;
  top: number;
  right: number;
  bottom: number;
}