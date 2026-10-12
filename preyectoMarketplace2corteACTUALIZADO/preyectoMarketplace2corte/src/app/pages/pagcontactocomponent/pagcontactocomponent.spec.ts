import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pagcontactocomponent } from './pagcontactocomponent';

describe('Pagcontactocomponent', () => {
  let component: Pagcontactocomponent;
  let fixture: ComponentFixture<Pagcontactocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Pagcontactocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Pagcontactocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
