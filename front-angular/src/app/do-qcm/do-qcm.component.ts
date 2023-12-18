import {Component, Input} from '@angular/core';
import {Qcm, Question} from "../qcm";
import {BackendService} from "../backend.service";
import {ActivatedRoute} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";


@Component({
    selector: 'app-do-qcm',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        ReactiveFormsModule
    ],
    templateUrl: './do-qcm.component.html',
    styleUrl: './do-qcm.component.scss',
    providers: [BackendService]
})
export class DoQcmComponent {

    qcm!: Qcm;
    idQcm: number = Number(this.route.snapshot.paramMap.get('id'));
    form = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        nbpoints: new FormControl(''),
        subject: new FormControl(''),
        questions: new FormArray([
            new FormGroup({
                id: new FormControl(''),
                question: new FormControl(''),
                answers: new FormArray([
                    new FormGroup({
                        id: new FormControl(''),
                        name: new FormControl(''),
                        isCorrect: new FormControl(false)
                    })
                ])
            })
        ])
    });

    score?: number;
    popup: boolean = false;

    constructor(private backendService: BackendService, private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.idQcm = Number(this.route.snapshot.paramMap.get('id'));

        this.backendService.getQcm(this.idQcm).then((qcm) => {
            this.qcm = qcm;
            this.form.patchValue({
                id: qcm.id,
                name: qcm.name,
                nbpoints: qcm.nbpoints,
                subject: qcm.subject
            });
            this.questionsFormArray.clear();
            qcm.questions.forEach((question: Question) => {
                this.questionsFormArray.push(new FormGroup({
                    id: new FormControl(question.id),
                    question: new FormControl(question.question),
                    answers: new FormArray([])
                }));
            });
            qcm.questions.forEach((question: Question, questionIndex: number) => {
                question.answers.forEach((answer: any) => {
                    this.questionAnswersFormArray(questionIndex).push(new FormGroup({
                        id: new FormControl(answer.id),
                        name: new FormControl(answer.name),
                        isCorrect: new FormControl(false)
                    }));
                });
            });

        });


    }

    get questionsFormArray(): FormArray {
        return this.form.get('questions') as FormArray;
    }

    questionAnswersFormArray(questionIndex: number): FormArray {
        return this.questionsFormArray.at(questionIndex).get('answers') as FormArray;
    }


    envoyerDonnees() {
        console.log(this.form.value);
        this.backendService.envoyerDonnees(this.form.value, this.idQcm).then(score => {
            this.score = score.score;
            this.popup = true;
        }).catch(error => {
            console.error('Une erreur est survenue lors de l’envoi des données', error);
        });
    }

}
