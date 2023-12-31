import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OutHomePage } from './out-home.page';

describe('OutHomePage', () => {
  let component: OutHomePage;
  let fixture: ComponentFixture<OutHomePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OutHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
