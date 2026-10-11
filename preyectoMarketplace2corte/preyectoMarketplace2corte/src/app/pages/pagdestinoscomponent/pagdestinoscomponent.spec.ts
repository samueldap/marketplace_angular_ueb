import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pagdestinoscomponent } from './pagdestinoscomponent';

describe('Pagdestinoscomponent', () => {
  let component: Pagdestinoscomponent;
  let fixture: ComponentFixture<Pagdestinoscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Pagdestinoscomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Pagdestinoscomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
