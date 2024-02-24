import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerViewerComponent } from './worker-viewer.component';

describe('WorkerViewerComponent', () => {
  let component: WorkerViewerComponent;
  let fixture: ComponentFixture<WorkerViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
