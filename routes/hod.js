const express = require('express');
const router = express.Router();
const connection = require('../config/config')
const bodyParser = require('body-parser');
const cors = require('cors');
const { param } = require('express-validator');

//Summary reports for the whole department
router.get('/hodReport', function (req, res, next) {

    const params = req.body;


    connection.query(`SELECT DISTINCT r.reportNum, r.activities, r.assess, r.challRecomm, r.date as start_date, date(r.date + 5) as end_date, Upper(s.subjCode) as subjCode, d.deptName, l.lecName, l.lecSurname, l.title 
                        FROM reports r, lecture_subject ls, subject s, lecture l, department d, hod h 
                        WHERE r.lecSubId = ls.lecSubId 
                        AND ls.subjCode = s.subjCode 
                        AND ls.lecNum = l.lecNum
                        AND s.depCode = d.depCode
                        AND d.depCode = h.depCode 
                        AND week(CURRENT_DATE) = week(date)
                        AND d.depCode = ?`,params.depCode, function (error, results){

        if (error) 
        {
            console.log("There's a server error");
        }
        else if (results.length > 0) 
        {
            console.log(results);
            res.send(results)
            console.log('Successfully selected.');

        }
        else
        {
            console.log('Nothing was selected for:' )
            console.log(params.depCode)
        }
    });
}); 

//Summary reports based on lecturer
router.get('/lecturerID', function(req, res, next) {

    const params = req.body;

    connection.query(`SELECT DISTINCT r.reportNum, r.activities, r.assess, r.challRecomm, r.date as start_date, date(r.date + 5) as end_date, s.subjCode, d.deptName, l.lecName, l.lecSurname, l.title 
                        FROM reports r, lecture_subject ls, subject s, lecture l, department d, hod h 
                        WHERE r.lecSubId = ls.lecSubId 
                        AND ls.subjCode = s.subjCode 
                        AND ls.lecNum = l.lecNum 
                        AND s.depCode = d.depCode
                        AND h.depCode = d.depCode 
                        AND week(date) = week(CURRENT_DATE)
                        AND l.lecNum = ?`,params.lecNum, function (error, results) {

        if (error) 
        {
            console.log("There's a server error")
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

//Summary reports based on module
router.get('/subjectCode', function(req, res, next) {

    const params = req.body;

    connection.query(`SELECT DISTINCT r.reportNum, r.activities, r.assess, r.challRecomm, r.date as start_date, date(r.date + 5) as end_date, s.subjCode, d.deptName, l.lecName, l.lecSurname, l.title
                        FROM reports r, lecture_subject ls, subject s, lecture l, department d, hod h 
                        WHERE r.lecSubId = ls.lecSubId 
                        AND ls.subjCode = s.subjCode 
                        AND ls.lecNum = l.lecNum 
                        AND s.depCode = d.depCode
                        AND h.depCode = d.depCode 
                        AND week(date) = week(CURRENT_DATE)
                        AND s.subjCode = ?`,params.subjCode, function (error, results) {

        if (error) 
        {
            console.log("There's a server error")
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

//HOD Dashboard
router.get('/hodDashboard/:departCode', function (req, res, next) {

    //const params = req.body;

    connection.query(`SELECT DISTINCT h.title, h.headName, h.headSurname, h.email, d.deptName, s.subjCode
                        FROM subject s, department d, hod h 
                        WHERE d.depCode = s.depCode
                        AND d.depCode = h.depCode
                        AND d.depCode = ?`,[req.params.departCode], function (error, results){

        if (error) 
        {
            console.log("There's a server error")
        }
        else if (results.length > 0) 
        {
            console.log(results);
            res.send(results);
            console.log('Successfully selected.')
        }
        else
        {
            console.log('Nothing was selected for: ')
            console.log(req.params.departCode)
        }
    });
}); 

//HOD Dashboard Modules
router.get('/deptModules/:departCode', function (req, res, next) {

    //const params = req.body;   

    connection.query(`SELECT DISTINCT s.subjCode
                        FROM subject s, department d, hod h 
                        WHERE d.depCode = s.depCode
                        AND d.depCode = h.depCode
                        AND d.depCode = ?`,[req.params.departCode], function (error, results){

        if (error) 
        {
            console.log("There's a server error")
        }
        else if (results.length > 0) 
        {
            console.log(results);
            res.send(results);
            console.log('Successfully selected.')
        }
        else
        {
            console.log('Nothing was selected for: ')
            console.log(req.params.departCode)
        }
    });
}); 
