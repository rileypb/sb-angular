import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBacklogTopLevelComponent } from './product-backlog-top-level.component';

describe('ProductBacklogTopLevelComponent', () => {
  let component: ProductBacklogTopLevelComponent;
  let fixture: ComponentFixture<ProductBacklogTopLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBacklogTopLevelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBacklogTopLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
