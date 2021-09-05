import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeltaDetailsCardComponent } from './delta-details-card.component';

describe('DeltaDetailsCardComponent', () => {
  let component: DeltaDetailsCardComponent;
  let fixture: ComponentFixture<DeltaDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeltaDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeltaDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
