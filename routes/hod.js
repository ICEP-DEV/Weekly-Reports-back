const express = require('express');
const router = express.Router();
const connection = require('../config/config')
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');



router.get('/hodReport', function (req, res, next) {

    const params = req.body;


    connection.query(`SELECT DISTINCT r.reportNum, r.activities, r.assess, r.challRecomm, r.date as start_date, date(r.date + 5) as end_date, Upper(s.subjCode) as subjCode, d.deptName 
     FROM reports r, lecture_subject ls, subject s, lecture l, department d, hod h 
                        WHERE r.lecSubId = ls.lecSubId 
                        AND ls.subjCode = s.subjCode 
                        AND ls.lecNum = l.lecNum
                        AND d.depCode = h.depCode 
                        and week(CURRENT_DATE) = week(date)`, function (error, results){

        if (error) 
        {
            console.log(error)
        }
        if (results.length > 0) 
        {
            console.log(results);
            res.send(results)
            console.log('success')

        }

        else
        {

            console.log('Nothing was selected.',params.depCode)

            res.send('Nothing was selected.')

            console.log(params.depCode)
        }
    
    });
}); 

router.get('/lecturerID', function(req, res, next) {

    const params = req.body;

    connection.query(`SELECT DISTINCT r.reportNum, r.activities, r.assess, r.challRecomm, r.date as start_date, date(r.date + 5) as end_date, s.subjCode, d.deptName 
                        FROM reports r, lecture_subject ls, subject s, lecture l, department d, hod h 
                        WHERE r.lecSubId = ls.lecSubId 
                        AND ls.subjCode = s.subjCode 
                        AND ls.lecNum = l.lecNum 
                        AND s.depCode = d.depCode
                        week(date) = week(CURRENT_DATE)
                        AND d.depCode = h.depCode`, function (error, results) {

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
            console.log(params.lecNum)
        }
    
    });
});

router.get('/subjectCode', function(req, res, next) {

    const params = req.body;

    connection.query(`SELECT DISTINCT r.reportNum, r.activities, r.assess, r.challRecomm, r.date as start_date, date(r.date + 5) as end_date, s.subjCode, d.deptName 
                        FROM reports r, lecture_subject ls, subject s, lecture l, department d, hod h 
                        WHERE r.lecSubId = ls.lecSubId 
                        AND ls.subjCode = s.subjCode 
                        AND ls.lecNum = l.lecNum 
                        AND s.depCode = d.depCode
                        AND h.depCode = d.depCode 
                        AND week(date) = week(CURRENT_WEEK)
                        AND h.depCode = d.depCode 
                        AND ls.subjCode = ?`, [params.subjCode], function (error, results) {

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
            console.log(params.subjCode)
        }
    
    });
});
console.log('So far so good!')
module.exports = router