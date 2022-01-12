import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityDrivenComponent } from './community-driven.component';

describe('CommunityDrivenComponent', () => {
  let component: CommunityDrivenComponent;
  let fixture: ComponentFixture<CommunityDrivenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommunityDrivenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
