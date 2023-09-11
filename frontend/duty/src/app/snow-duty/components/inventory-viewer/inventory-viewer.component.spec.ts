import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryViewerComponent } from './inventory-viewer.component';

describe('InventoryViewerComponent', () => {
  let component: InventoryViewerComponent;
  let fixture: ComponentFixture<InventoryViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
