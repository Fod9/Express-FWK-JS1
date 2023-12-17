

export interface Qcm {

    id: number;
    name: string;
    theme: string;
    subject: string;
    author: string;
    nbpoints: number;
    questions: Array<Question>;
}

export interface Question {
  id: number;
  question: string;
  answers: Array<string>;
  goodanswer: number;
}
