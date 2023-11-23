import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAssingmentComponent } from './user-assingment.component';

describe('UserAssingmentComponent', () => {
  let component: UserAssingmentComponent;
  let fixture: ComponentFixture<UserAssingmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAssingmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAssingmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
