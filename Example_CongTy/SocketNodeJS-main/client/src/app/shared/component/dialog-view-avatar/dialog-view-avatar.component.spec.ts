import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogViewAvatarComponent } from './dialog-view-avatar.component';

describe('DialogViewAvatarComponent', () => {
  let component: DialogViewAvatarComponent;
  let fixture: ComponentFixture<DialogViewAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogViewAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogViewAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
