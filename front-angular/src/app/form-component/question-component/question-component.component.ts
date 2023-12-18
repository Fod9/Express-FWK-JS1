import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {PropositionComponentComponent} from "./proposition-component/proposition-component.component";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";


interface proposition {
    id: number
}

@Component({
    selector: 'app-question-component',
    standalone: true,
    imports: [
        NgForOf,
        PropositionComponentComponent,
        ReactiveFormsModule
    ],
    templateUrl: './question-component.component.html',
    styleUrl: './question-component.component.scss'
})

export class QuestionComponentComponent {

    @Input() question!: FormGroup;
    @Input() index!: number;

    @Output() removeQuestion = new EventEmitter<number>();
    @Output() addProposition = new EventEmitter<number>();
    @Output() removeProposition = new EventEmitter<number>();

    removeQuestionEvent() {
        this.removeQuestion.emit(this.index);
    }

    addPropositionEvent() {
        this.addProposition.emit(this.index);
    }

    removePropositionEvent(index: number) {
        this.removeProposition.emit(index);
    }

    get propositions(): FormArray {
        return this.question?.get('propositions') as FormArray;
    }

    getProposition(index: number): FormGroup {
        return this.propositions.at(index) as FormGroup;
    }






}
