import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DislogLeaveRoomComponent } from './dislog-leave-room.component';

describe('DislogLeaveRoomComponent', () => {
  let component: DislogLeaveRoomComponent;
  let fixture: ComponentFixture<DislogLeaveRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DislogLeaveRoomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DislogLeaveRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
