import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pagexperienciascomponent } from './pagexperienciascomponent';

describe('Pagexperienciascomponent', () => {
  let component: Pagexperienciascomponent;
  let fixture: ComponentFixture<Pagexperienciascomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Pagexperienciascomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Pagexperienciascomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
