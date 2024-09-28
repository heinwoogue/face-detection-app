import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Store } from "@ngrx/store";
import { tap } from "rxjs/operators";
import { clearScanMsgs, clearSelectedHistory, loadFaceInput } from "../../stores/face-detection.actions";
import { selectCurrentHistory } from "../../stores/face-detection.selectors";
import { FaceDetectionState } from "../../stores/face-detection.state";

@UntilDestroy()
@Component({
  selector: 'app-face-detection-upload',
  standalone: true,
  templateUrl: './face-detection-upload.component.html',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaceDetectionUploadComponent implements AfterViewInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  private cdr = inject(ChangeDetectorRef);
  private store = inject(Store<FaceDetectionState>);

  ngAfterViewInit(): void {
    this.store.select(selectCurrentHistory).pipe(
      tap(
        (currentHistory) => {
          if (currentHistory) {
            this.fileInput.nativeElement.value = "";
          }
        }
      ),
      untilDestroyed(this),
    ).subscribe();
  }

  onFileSelected(event: Event): void {
    this.store.dispatch(clearSelectedHistory());
    this.store.dispatch(clearScanMsgs())

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const faceInput = {
          fileName: file.name,
          base64Image: reader.result as string
        };

        this.store.dispatch(loadFaceInput({ faceInput }))

        this.cdr.markForCheck();
      };

      reader.readAsDataURL(file);
    }
  }
}