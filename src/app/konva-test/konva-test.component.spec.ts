import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KonvaTestComponent } from './konva-test.component';

describe('KonvaTestComponent', () => {
  let component: KonvaTestComponent;
  let fixture: ComponentFixture<KonvaTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KonvaTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KonvaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
