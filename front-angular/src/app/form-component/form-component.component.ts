import {Component, Input} from '@angular/core';
import {QuestionComponentComponent} from "./question-component/question-component.component";
import {NgForOf, NgIf} from "@angular/common";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {BackendService} from "../backend.service";
import {Router} from "@angular/router";
import {routes} from "../app.routes";

interface question {
    id: number
}

@Component({
    selector: 'app-form-component',
    standalone: true,
    templateUrl: './form-component.component.html',
    imports: [
        QuestionComponentComponent,
        NgForOf,
        ReactiveFormsModule,
        NgIf
    ],
    styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent {
    @Input() name: string = '';
    QuestionId: number = 1;
    form!: FormGroup;
    PropositionId: number = 1;

    constructor(private backendService: BackendService, private router: Router) {
        this.form = new FormGroup({
            title: new FormControl('', Validators.required),
            subject: new FormControl('', Validators.required),
            nbpoints: new FormControl(0, Validators.required),
            questions: new FormArray([
                new FormGroup({
                    id: new FormControl(this.QuestionId, Validators.required),
                    label: new FormControl('', Validators.required),
                    propositions: new FormArray([
                        new FormGroup({
                            id: new FormControl(this.PropositionId, Validators.required),
                            name: new FormControl('', Validators.required),
                            isCorrect: new FormControl(false, Validators.required)
                        })
                    ])
                })
            ])
        });
    }

    // form validation

    get questions(): FormArray {
        return this.form.get('questions') as FormArray;
    }

    getQuestion(index: number): FormGroup {
        return this.questions.at(index) as FormGroup;
    }


    addQuestion() {
        this.QuestionId++;
        const questions = this.form.get('questions') as FormArray;
        questions.push(new FormGroup({
            id: new FormControl(this.QuestionId),
            label: new FormControl(''),
            propositions: new FormArray([
                new FormGroup({
                    id: new FormControl(this.PropositionId),
                    name: new FormControl(''),
                    isCorrect: new FormControl(false)
                })
            ]) // Initialize an empty array for propositions
        }));
    }

    removeQuestion(index: number) {
        const questions = this.form.get('questions') as FormArray;
        questions.removeAt(index);
    }

    addProposition(questionIndex: number) {
        this.PropositionId++;
        const question = this.getQuestion(questionIndex);
        const propositions = question.get('propositions') as FormArray;
        propositions.push(new FormGroup({
            id: new FormControl(this.PropositionId),
            name: new FormControl(''),
            isCorrect: new FormControl(false)
        }));
    }

    removeProposition(questionIndex: number, propositionIndex: number) {
        const question = this.getQuestion(questionIndex - 1);
        const propositions = question.get('propositions') as FormArray;
        propositions.removeAt(propositionIndex);
    }

    SubmitForm(e: Event) {
        e.preventDefault();

        if (this.form.invalid) {
            return;
        }else {
            this.backendService.createQcm(this.form.value);
        }
    }

}
