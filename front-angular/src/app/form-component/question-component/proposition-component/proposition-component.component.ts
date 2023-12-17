import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-proposition-component',
  standalone: true,
  imports: [],
  templateUrl: './proposition-component.component.html',
  styleUrl: './proposition-component.component.scss'
})

export class PropositionComponentComponent {

  @Input() QuestionId: number = 1;
  @Output() removePropositionEvent: EventEmitter<number> = new EventEmitter<number>();
  @Input() index: number = 0;


  removeProposition(index: number) {
    this.removePropositionEvent.emit(index);
  }

}
