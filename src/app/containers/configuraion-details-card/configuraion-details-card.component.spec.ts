import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguraionDetailsCardComponent } from './configuraion-details-card.component';

describe('ConfiguraionDetailsCardComponent', () => {
  let component: ConfiguraionDetailsCardComponent;
  let fixture: ComponentFixture<ConfiguraionDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguraionDetailsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguraionDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
