const {qcms, addQcm} = require('../models/inmemory');
const {Question} = require('../models/qcm');

const displayQcms = (req, res) => {
    res.render('qcms', {qcms: qcms});
};

const displayQcmDetailed = (req, res) => {
    const id = Number(req.params.qcmid);
    const qcm = qcms.find((element) => element.id === id);
    res.json(qcm);
}

const DoQCM = (req, res) => {
    const id = Number(req.params.qcmid);
    const qcm = qcms.find((element) => element.id === id);

    let score = 0;
    points_par_question = qcm.nbpoints / qcm.questions.length;

    for (let question of req.body.questions) {
        let q = qcm.questions.find((element) => element.id === question.id);
        for (let answer of question.answers) {
            let a = q.answers.find((element) => element.id === answer.id);
            score_question = 0;
            nbBonnesReponses = q.answers.filter((element) => element.isCorrect).length;

            if (a.isCorrect && answer.isCorrect) {
                score_question += 1;
            }else if (!a.isCorrect && answer.isCorrect) {
                score_question += 0.5;
            }else {
                score_question += 0;
            }

            score += score_question / nbBonnesReponses * points_par_question;
        }
        if (score < 0) score = 0;

    }

    res.json({score: score});

}

const displayQcmJson = (req, res) => {
    res.json(qcms);
}

const displayFormQcm = (req, res) => {
    res.render('newqcm');
};

const createNewForm = (req, res) => {
    try {
        let questions = [];

        for (let i = 0; i < req.body.questions.length; i++) {
            let question = req.body.questions[i];
            let propositions = req.body.questions[i].propositions;


            questions.push(new Question({
                id: i,
                question: question.label,
                answers: propositions,
            }));

        }


        addQcm({
            id: qcms.length + 1,
            name: req.body.title,
            subject: req.body.subject,
            nbpoints: req.body.nbpoints,
            questions: questions
        });
    } catch (e) {
        res.status(400);
    }

    res.status(200).json({message: "QCM added"});
};

module.exports = {displayQcms, displayFormQcm, createNewForm, displayQcmJson, displayQcmDetailed, DoQCM};