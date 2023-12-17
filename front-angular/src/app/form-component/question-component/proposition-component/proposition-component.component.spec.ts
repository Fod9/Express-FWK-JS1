import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropositionComponentComponent } from './proposition-component.component';

describe('PropositionComponentComponent', () => {
  let component: PropositionComponentComponent;
  let fixture: ComponentFixture<PropositionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropositionComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropositionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
