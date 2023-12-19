// id, name, theme, subject, author, nbpoints, questions

class Qcm {

    #id;
    #name;
    #theme;
    #subject;
    #author;
    #nbpoints;
    #questions;

    constructor(qcmToCreate) {
        this.#id = qcmToCreate.id;
        this.#name = qcmToCreate.name;
        this.#theme = qcmToCreate.theme;
        this.#subject = qcmToCreate.subject;
        this.#author = qcmToCreate.author;
        this.#nbpoints = qcmToCreate.nbpoints;
        this.#questions = qcmToCreate.questions;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get theme() {
        return this.#theme;
    }

    get subject() {
        return this.#subject;
    }

    get author() {
        return this.#author;
    }

    get nbpoints() {
        return this.#nbpoints;
    }

    get questions() {
        return this.#questions;
    }

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            theme: this.#theme,
            subject: this.#subject,
            author: this.#author,
            nbpoints: this.#nbpoints,
            questions: this.#questions
        };
    }
}

// id, question, answers, goodanswer

class Question {

    #id;
    #question;
    #answers;
    #goodanswer;

    constructor(questionToCreate) {
        this.#id = questionToCreate.id;
        this.#question = questionToCreate.question;
        this.#answers = questionToCreate.answers;
    }

    get id() {
        return this.#id;
    }

    get question() {
        return this.#question;
    }

    get answers() {
        return this.#answers;
    }

    get goodanswer() {
        return this.#goodanswer;
    }

    toJSON() {
        return {id: this.#id, question: this.#question, answers: this.#answers};
    }
}

module.exports = {Qcm, Question};