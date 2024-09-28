import { FaceDetectionHistoryDto, FaceDetectionInputDto } from "../dtos/face-detection.dto";

export interface FaceDetectionState {
  histories: FaceDetectionHistoryDto[];
  selectedHistory: FaceDetectionHistoryDto | null;
  faceInput: FaceDetectionInputDto | null;
  scanErrorMsg: string | null;
  scanSuccessMsg: string | null;
  loading: boolean;
}