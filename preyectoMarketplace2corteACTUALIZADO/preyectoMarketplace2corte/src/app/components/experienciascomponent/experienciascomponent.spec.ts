import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Experienciascomponent } from './experienciascomponent';

describe('Experienciascomponent', () => {
  let component: Experienciascomponent;
  let fixture: ComponentFixture<Experienciascomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Experienciascomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Experienciascomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
