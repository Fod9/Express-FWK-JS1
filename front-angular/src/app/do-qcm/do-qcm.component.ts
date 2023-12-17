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

    qcm?: Qcm;
    idQcm: number = Number(this.route.snapshot.paramMap.get('id'));
    form = new FormGroup({
        answers: new FormArray([])
    });
    score?: number;
    popup: boolean = false;

    constructor(private backendService: BackendService, private route: ActivatedRoute) {
        this.form = new FormGroup({
            answers: new FormArray([])
        });
    }

    ngOnInit() {
        this.idQcm = Number(this.route.snapshot.paramMap.get('id'));

        this.backendService.getQcm(this.idQcm).then((qcm) => {
            this.qcm = qcm;

            this.qcm?.questions.forEach((question, index) => {
                const array = new FormArray(question.answers.map(() => new FormControl(false)));
                (this.form.get('answers') as FormArray).push(array);
            });
        });
    }

    envoyerDonnees() {
        this.backendService.envoyerDonnees(this.form.value, this.idQcm).then(score => {
            this.score = score.score;
            this.popup = true;
        }).catch(error => {
            console.error('Une erreur est survenue lors de l’envoi des données', error);
        });
    }

}
