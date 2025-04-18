import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreContextComponent } from './core-context.component';

describe('CoreContextComponent', () => {
  let component: CoreContextComponent;
  let fixture: ComponentFixture<CoreContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreContextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
