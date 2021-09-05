import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewConfigurationUnitComponent } from './view-configuration-unit.component';

describe('ViewConfigurationUnitComponent', () => {
  let component: ViewConfigurationUnitComponent;
  let fixture: ComponentFixture<ViewConfigurationUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewConfigurationUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewConfigurationUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
