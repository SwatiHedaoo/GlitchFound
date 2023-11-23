import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketPageComponent } from './view-ticket-page.component';

describe('ViewTicketPageComponent', () => {
  let component: ViewTicketPageComponent;
  let fixture: ComponentFixture<ViewTicketPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTicketPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTicketPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
