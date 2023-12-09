import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewerComponent } from './user-viewer.component';

describe('UserViewerComponent', () => {
  let component: UserViewerComponent;
  let fixture: ComponentFixture<UserViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserViewerComponent]
    });
    fixture = TestBed.createComponent(UserViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
