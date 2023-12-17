import {Component, Input} from '@angular/core';
import {QuestionComponentComponent} from "./question-component/question-component.component";
import {NgForOf} from "@angular/common";

interface question {
    id: number
}
@Component({
  selector: 'app-form-component',
  standalone: true,
  templateUrl: './form-component.component.html',
  imports: [
    QuestionComponentComponent,
    NgForOf
  ],
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent {
    @Input() name: string = '';
    QuestionId: number = 1;

    questions: Array<question> = new Array(this.QuestionId).fill({id: 1});


    SubmitForm(e: Event) {
        e.preventDefault();
        console.log('SubmitForm');
    }

    generateUniqueId(): number {
        return this.questions.length > 0
            ? Math.max(...this.questions.map(q => q.id)) + 1
            : 1;
    }

    addQuestion() {
        const newId = this.generateUniqueId();
        this.questions.push({id: newId});
    }

    removeQuestion(index: number) {
        this.questions.splice(index, 1);
    }

}
