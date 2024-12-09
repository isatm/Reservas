import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPruebaComponent } from './menu-prueba.component';

describe('MenuPruebaComponent', () => {
  let component: MenuPruebaComponent;
  let fixture: ComponentFixture<MenuPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuPruebaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
