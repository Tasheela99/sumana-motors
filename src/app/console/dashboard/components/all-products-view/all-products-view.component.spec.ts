import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsViewComponent } from './all-products-view.component';

describe('AllProductsViewComponent', () => {
  let component: AllProductsViewComponent;
  let fixture: ComponentFixture<AllProductsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProductsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProductsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
