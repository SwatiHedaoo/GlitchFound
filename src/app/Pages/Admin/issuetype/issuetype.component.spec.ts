import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuetypeComponent } from './issuetype.component';

describe('IssuetypeComponent', () => {
  let component: IssuetypeComponent;
  let fixture: ComponentFixture<IssuetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuetypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
