const express = require('express');
const router = express.Router();
const connection = require('../config/config')

/*var subjCode = '';
var reportNo = '';
var numStudents = '';
var numAttended = '';
var weekTreachings = '';
var assess = '';
var challenges = '';
var departName = '';
var hodName = '';
var hodSurname = '';*/


router.get('/hodreport', function (req, res, next) {

    const params = req.body

    connection.query(`SELECT r.reportNum, r.numStudents, r.attendAvg, r.activities, r.assess, r.challRecomm, s.subjCode, d.deptName
                        FROM reports r, lecture_subject ls, subject s, lecture l, department d, hod h
                        WHERE ls.subjCode = s.subjCode 
                        AND ls.lecNum = l.lecNum
                        AND d.depCode = h.depCode
                        AND d.depCode = ?`, [params.depCode], function (error, results) {

        if (error) 
        {
            console.log(error)
        }
        if (results.length > 0) 
        {
            console.log(results);
            res.send(results)
        }
        else
        {
            console.log('Nothing was selected.')
            console.log(params.depCode)
        }
    
    });
}); 

//console.log('So far so good!')
module.exports = router