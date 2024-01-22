import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsViewerComponent } from './cars-viewer.component';

describe('CarsViewerComponent', () => {
  let component: CarsViewerComponent;
  let fixture: ComponentFixture<CarsViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
