import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBlockRawUnitComponent } from './view-block-raw-unit.component';

describe('ViewBlockRawUnitComponent', () => {
  let component: ViewBlockRawUnitComponent;
  let fixture: ComponentFixture<ViewBlockRawUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBlockRawUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBlockRawUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
