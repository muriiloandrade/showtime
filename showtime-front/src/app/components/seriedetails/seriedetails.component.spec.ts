import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriedetailsComponent } from './seriedetails.component';

describe('SeriedetailsComponent', () => {
  let component: SeriedetailsComponent;
  let fixture: ComponentFixture<SeriedetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeriedetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
