const connection = require('../config/config')
const bodyParser = require('body-parser');
const cors = require('cors');
const { param } = require('express-validator');
const express = require('express');
const router = express.Router();


//Summary reports for the whole department
router.get('/hodReport/:depCode', function(req, res, next) {

    /// const params = req.body;


    connection.query(`SELECT DISTINCT r.reportNum, r.activities, r.assess, r.challRecomm, r.date as start_date, date(r.date + 5) as end_date, Upper(s.subjCode) as subjCode, d.deptName 
                        FROM reports r, lecture_subject ls, subject s, lecture l, department d, hod h 
                        WHERE r.lecSubId = ls.lecSubId 
                        AND ls.subjCode = s.subjCode 
                        AND ls.lecNum = l.lecNum
                        AND s.depCode = d.depCode
                        AND d.depCode = h.depCode 
                        AND week(CURRENT_DATE) = week(date)
                        AND d.depCode = ?`, [req.params.depCode], function(error, results) {

        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            console.log(results);
            res.send(results)
            console.log('Successfully selected.')

        } else {
            console.log('Nothing was selected.')
            console.log(params.depCode)
        }
    });
});

//Summary reports based on lecturer
router.get('/lecturerID/:lecID', function(req, res, next) {

    const params = req.body;

    connection.query(`SELECT DISTINCT r.reportNum, r.activities, r.assess, r.challRecomm, r.date as start_date, date(r.date + 5) as end_date, s.subjCode, d.deptName 
                        FROM reports r, lecture_subject ls, subject s, lecture l, department d, hod h 
                        WHERE r.lecSubId = ls.lecSubId 
                        AND ls.subjCode = s.subjCode 
                        AND ls.lecNum = l.lecNum 
                        AND s.depCode = d.depCode
                        AND h.depCode = d.depCode 
                        AND week(date) = week(CURRENT_DATE)
                        AND l.lecNum = ?`, [req.params.lecID], function(error, results) {

        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            console.log(results);
            res.send(results)
        } else {
            console.log('Nothing was selected.')
            console.log(req.params.deptCode)
        }

    });
});

//Summary reports based on module
router.get('/subjectCode/:subCode', function(req, res, next) {

    const params = req.body;

    connection.query(`SELECT DISTINCT r.reportNum, r.activities, r.assess, r.challRecomm, r.date as start_date, date(r.date + 5) as end_date, s.subjCode, d.deptName 
                        FROM reports r, lecture_subject ls, subject s, lecture l, department d, hod h 
                        WHERE r.lecSubId = ls.lecSubId 
                        AND ls.subjCode = s.subjCode 
                        AND ls.lecNum = l.lecNum 
                        AND s.depCode = d.depCode
                        AND h.depCode = d.depCode 
                        AND week(date) = week(CURRENT_DATE)
                        AND s.depCode = ?`, [req.params.subCode], function(error, results) {

        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            console.log(results);
            res.send(results)
        } else {
            console.log('Nothing was selected.')
            console.log(params.subjCode)
        }

    });
});
console.log('So far so good!')
module.exports = router

//HOD Dashboard
router.get('/hodDashboard/:deptCode', function(req, res, next) {

    const params = req.body;

    connection.query(`SELECT DISTINCT h.title, h.headName, h.headSurname, h.email
                        FROM subject s, department d, hod h
                        WHERE d.depCode = s.depCode
                        AND d.depCode = h.depCode
                        AND d.depCode = ?`, [req.params.deptCode], function(error, results) {

        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            console.log(results);
            res.send(results);
            console.log('Successfully selected.')
        } else {
            console.log('Nothing was selected.')
            console.log(params.depCode)
        }
    });
});

//HOD Dashboard Modules
router.get('/deptModules', function(req, res, next) {

    const params = req.body;

    connection.query(`SELECT DISTINCT s.subjCode
                        FROM subject s, department d, hod h 
                        WHERE d.depCode = s.depCode
                        AND d.depCode = h.depCode`, function(error, results) {

        if (error) {
            console.log(error)
        }
        if (results.length > 0) {
            console.log(results);
            res.send(results);
            console.log('Successfully selected.')
        } else {
            console.log('Nothing was selected.')
            console.log(params.depCode)
        }
    });
});

module.exports = router