import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paginiciocomponent } from './paginiciocomponent';

describe('Paginiciocomponent', () => {
  let component: Paginiciocomponent;
  let fixture: ComponentFixture<Paginiciocomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Paginiciocomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Paginiciocomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
