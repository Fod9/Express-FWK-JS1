

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
  answers: Array<Answer>;
}

export interface Answer {
  id: number;
  name: string;
  isCorrect: boolean;
}
