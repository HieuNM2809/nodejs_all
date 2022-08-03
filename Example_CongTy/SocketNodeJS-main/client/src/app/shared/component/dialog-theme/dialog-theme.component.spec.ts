import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogThemeComponent } from './dialog-theme.component';

describe('DialogThemeComponent', () => {
  let component: DialogThemeComponent;
  let fixture: ComponentFixture<DialogThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogThemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
