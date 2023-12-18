import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
    selector: 'app-proposition-component',
    standalone: true,
    templateUrl: './proposition-component.component.html',
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
    styleUrls: ['./proposition-component.component.scss']
})
export class PropositionComponentComponent {
    @Input() QuestionId: number = 1;
    @Output() removePropositionEvent: EventEmitter<number> = new EventEmitter<number>();
    @Input() index: number = 0;
    @Input() proposition!: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.proposition = this.formBuilder.group({
            id: [0],
            questionId: [0],
            name: ['', Validators.required],
            isCorrect: [false]
        });
    }



    removeProposition(index: number) {
        this.removePropositionEvent.emit(index);
    }

}
