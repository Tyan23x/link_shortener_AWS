import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLinkShortener } from './form-link-shortener';

describe('FormLinkShortener', () => {
  let component: FormLinkShortener;
  let fixture: ComponentFixture<FormLinkShortener>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormLinkShortener]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormLinkShortener);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
