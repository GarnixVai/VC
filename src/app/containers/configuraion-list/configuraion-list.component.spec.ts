import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguraionListComponent } from './configuraion-list.component';

describe('ConfiguraionListComponent', () => {
  let component: ConfiguraionListComponent;
  let fixture: ComponentFixture<ConfiguraionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguraionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguraionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
