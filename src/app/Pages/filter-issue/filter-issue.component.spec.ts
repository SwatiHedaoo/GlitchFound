import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterIssueComponent } from './filter-issue.component';

describe('FilterIssueComponent', () => {
  let component: FilterIssueComponent;
  let fixture: ComponentFixture<FilterIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
