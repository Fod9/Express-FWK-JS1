import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoQcmComponent } from './do-qcm.component';

describe('DoQcmComponent', () => {
  let component: DoQcmComponent;
  let fixture: ComponentFixture<DoQcmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoQcmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoQcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
