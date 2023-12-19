// importer la classe Qcm
const {Qcm, Question} = require('./qcm');

// remplacer les simples chaines de caracteres par des instances de la classe Qcm
const qcms = [
    new Qcm({
        id: 0,
        name: 'Introduction Vanilla JS',
        nbpoints: 20,
        subject: 'Javascript',
        questions: [
            new Question(
                {
                    id: 0,
                    question: 'Qu\'est-ce que Javascript ?',
                    answers: [
                        {id: 1, name: 'Un langage de programmation', isCorrect: true},
                        {id: 2, name: 'Une sauce pour les frites', isCorrect: false},
                        {id: 3, name: 'Une marque de café', isCorrect: false},
                        {id: 4, name: 'Un ancien dieu égyptien', isCorrect: false}
                    ],
                }),
            new Question(
                {
                    id: 1,
                    question: 'A quoi sert Javascript ?',
                    answers: [
                        {id: 1, name: 'A faire des sites web dynamiques (côté client)', isCorrect: true},
                        {id: 2, name: 'A interagir avec des API', isCorrect: true},
                        {id: 3, name: 'A faire des sites web statiques, dynamiques et des frites', isCorrect: false}
                    ],
                }),

        ],
    }),
];


const addQcm = (rawObject) => {
    let maxId = 0;
    //recupere l'id le plus grand
    qcms.forEach((qcm) => {
        if (maxId < qcm.Id) {
            maxId = qcm.id;
        }
    });

    questions = rawObject.questions;

    // creation du QCM avec l id max
    const qcm = new Qcm(
        {
            id: maxId + 1,
            name: rawObject.name,
            subject: rawObject.subject,
            nbpoints: Number(rawObject.nbpoints),
            questions: questions.map((question, index) => {
                return new Question(
                    {
                        id: index,
                        question: question.question,
                        answers: question.answers,
                    }
                );
            })
        });

    qcms.push(qcm);
}

module.exports = {qcms, addQcm};