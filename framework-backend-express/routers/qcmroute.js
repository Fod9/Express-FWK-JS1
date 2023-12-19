const express = require('express');
const router = express.Router();



const {
    displayQcms,
    displayFormQcm,
    createNewForm,
    displayQcmJson,
    displayQcmDetailed,
    DoQCM
} = require('../controllers/qcms');


// DEFINITION DES ROUTES

// router.get('/', displayQcms);


router.get('/json', displayQcmJson);

// router.get('/new', displayFormQcm);

router.post('/new', createNewForm);

router.get('/:qcmid/json', displayQcmDetailed)

router.post('/:qcmid', DoQCM)


//FIN DES ROUTES


module.exports = router;