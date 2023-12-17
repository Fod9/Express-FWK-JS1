import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PropositionComponentComponent} from "./proposition-component/proposition-component.component";


interface proposition {
    id: number
}

@Component({
    selector: 'app-question-component',
    standalone: true,
    imports: [
        NgForOf,
        PropositionComponentComponent
    ],
    templateUrl: './question-component.component.html',
    styleUrl: './question-component.component.scss'
})

export class QuestionComponentComponent {

    @Input() QuestionId: number = 1;
    @Input() PropositionId: number = 1;
    propositions: Array<proposition> = new Array(this.PropositionId).fill({id: 1});
    @Output() removeQuestionEvent: EventEmitter<number> = new EventEmitter<number>();


    addProposition() {
        const newId = this.generateUniqueId();
        this.propositions.push({id: newId});
    }

    generateUniqueId(): number {
        return this.propositions.length > 0
            ? Math.max(...this.propositions.map(q => q.id)) + 1
            : 1;
    }


    removeProposition(index: number) {
        this.propositions.splice(index, 1);
    }

    removeQuestion(index: number) {
        this.removeQuestionEvent.emit(index);
    }
}
