import { FaceDetectionResult } from "../models/face-detection.model";

export interface FaceDetectionHistoryDto {
  name: string,
  base64Image: string,
  faceDetectionResult: FaceDetectionResult
};

export interface FaceDetectionInputDto {
  fileName: string;
  base64Image: string;
}
