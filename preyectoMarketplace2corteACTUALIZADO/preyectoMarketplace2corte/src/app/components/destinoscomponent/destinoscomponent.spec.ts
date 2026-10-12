import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Destinoscomponent } from './destinoscomponent';

describe('Destinoscomponent', () => {
  let component: Destinoscomponent;
  let fixture: ComponentFixture<Destinoscomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Destinoscomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Destinoscomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
