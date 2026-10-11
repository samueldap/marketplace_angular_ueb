import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paghoteleriacomponent } from './paghoteleriacomponent';

describe('Paghoteleriacomponent', () => {
  let component: Paghoteleriacomponent;
  let fixture: ComponentFixture<Paghoteleriacomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Paghoteleriacomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Paghoteleriacomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
