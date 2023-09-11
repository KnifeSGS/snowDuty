import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEditorComponent } from './inventory-editor.component';

describe('InventoryEditorComponent', () => {
  let component: InventoryEditorComponent;
  let fixture: ComponentFixture<InventoryEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
