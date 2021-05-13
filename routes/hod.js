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

router.get('/modules/list/:depId', function(req, res, next){
	let depId = req.params.depId;
	connection.query('SELECT DISTINCT lecture_subject.subjCode FROM ((reports INNER JOIN lecture_subject ON (reports.lecSubId = lecture_subject.lecSubId)) INNER JOIN subject ON (subject.subjCode = lecture_subject.subjCode) INNER JOIN hod ON (hod.depCode = subject.depCode)) WHERE hod.depCode=?',depId, function(error, results, fields){
	
			if(error) throw error;
			let message = "";
	
			if(results.length == 0 || results === undefined){
				 message = "Modules table is empty";
			}else{
				 message = "Retrieve modules";
			}
			
			res.send(results);
		         console.log(results);
			
	
	});	
});

// Get reports by module
router.get('/reports/reportById/:moduleCode/:depId', function(req, res){
	let moduleCode = req.params.moduleCode;
	let depId = req.params.depId;
	if(!moduleCode || !depId){
	  return res.status(400).send({error: true, message: "Id is required"})	
	}
	
	connection.query('SELECT lecture.lecName, lecture.lecSurname, lecture.title, lecture_subject.lecSubId, UPPER(lecture_subject.subjCode), reports.reportNum, reports.presentMode, reports.numStudents, reports.attendAvg, reports.date, reports.reportNum, reports.topicsCovered, reports.challRecomm, reports.assess FROM ((reports INNER JOIN lecture_subject ON (reports.lecSubId = lecture_subject.lecSubId)) INNER JOIN lecture ON (lecture_subject.lecNum = lecture.lecNum )) INNER JOIN subject ON (subject.subjCode = lecture_subject.subjCode) INNER JOIN hod ON (hod.depCode = subject.depCode) WHERE hod.depCode=? AND lecture_subject.subjCode = ?', [depId, moduleCode], function(error, results){
	if(error) throw error;
			let message = "";
	
			if(results.length == 0 || results === undefined){
				 message = "Report table is empty";
			}else{
				 message = "Retrieve reports";
			}
			
			 return res.send({error: false, data:results, message: message});
		         console.log(data);
			
	
	});	
});

// Get detailed report

router.get('/detailed/report/:reportId', function(req, res){
	let id = req.params.reportId;
	if(!id){
	  return res.status(400).send({error: true, message: "Id is required"})	
	}
	
	connection.query('SELECT lecture.lecName, lecture.lecSurname, lecture.title, lecture_subject.lecSubId, UPPER(lecture_subject.subjCode), reports.reportNum, reports.presentMode, reports.numStudents, reports.attendAvg, reports.date, reports.reportNum, reports.topicsCovered, reports.challRecomm, reports.assess FROM ((reports INNER JOIN lecture_subject ON (reports.lecSubId = lecture_subject.lecSubId)) INNER JOIN lecture ON (lecture_subject.lecNum = lecture.lecNum )) WHERE reports.reportNum=?', id, function(error, results, fields){
	
			if(error) throw error;
			let message = "";
	
			if(results.length == 0 || results === undefined){
				 message = "IReport table is empty";
			}else{
				 message = "Retrieve by Id reports";
			}
			
			 return res.send({error: false, data:results[0], message: message});
		         console.log(data);
			
	
	});	
});

// search for report using date and module code
router.get('/search/report/:reportDate/:moduleCode', function(req, res){
	let date = req.params.reportDate;
	let moduleCode = req.params.moduleCode;
	if(!date || !moduleCode){
	  return res.status(400).send({error: true, message: "search values is required"})	
	}
	
	connection.query('SELECT lecture.lecName, lecture.lecSurname, lecture.title, lecture_subject.lecSubId,UPPER(lecture_subject.subjCode), reports.reportNum, reports.presentMode, reports.numStudents, reports.attendAvg, reports.date, reports.reportNum, reports.topicsCovered, reports.challRecomm, reports.assess FROM ((reports LEFT JOIN lecture_subject ON (reports.lecSubId = lecture_subject.lecSubId)) INNER JOIN lecture ON (lecture_subject.lecNum = lecture.lecNum )) WHERE lecture_subject.subjCode=? AND reports.date =?', [moduleCode, date], function(error, results, fields){
	
			if(error) throw error;
			let message = "";
	
			if(results.length == 0 || results === undefined){
				 message = "Report table is empty";
			}else{
				 message = "Retrieve reports";
			}
			
			 return res.send({error: false, data:results, message: message});
		         console.log(data);
			
	
	});	
});
// fetch summary report
router.get('/reports/:depId', function(req, res){
	
	let depId = req.params.depId;
	
	connection.query('SELECT lecture.lecName, lecture.lecSurname, lecture.title, lecture_subject.lecSubId, UPPER(lecture_subject.subjCode), reports.reportNum, reports.presentMode, reports.numStudents, reports.attendAvg, reports.date, reports.reportNum, reports.topicsCovered, reports.challRecomm, reports.assess FROM ((reports INNER JOIN lecture_subject ON (reports.lecSubId = lecture_subject.lecSubId)) INNER JOIN lecture ON (lecture_subject.lecNum = lecture.lecNum )) INNER JOIN subject ON (subject.subjCode = lecture_subject.subjCode) INNER JOIN hod ON (hod.depCode = subject.depCode) WHERE hod.depCode=?', depId, function(error, results){
	
			if(error) throw error;
			let message = "";
	
			if(results.length == 0 || results === undefined){
				 message = "summary Report  table is empty";
			}else{
				 message = "Retrieve sumarry reports";
			}
			
			return res.send({error: false, data:results, message: message});
		    console.log(data);
			
	
	});	
});

router.get('/search/all/reports/:reportDate/:depId', function(req, res){
	let reportDate = req.params.reportDate;
	let depId = req.params.depId;
	
connection.query('SELECT lecture.lecName, lecture.lecSurname, lecture.title, lecture_subject.lecSubId, UPPER(lecture_subject.subjCode), reports.reportNum, reports.presentMode, reports.numStudents, reports.attendAvg, reports.date, reports.reportNum, reports.topicsCovered, reports.challRecomm, reports.assess FROM ((reports INNER JOIN lecture_subject ON (reports.lecSubId = lecture_subject.lecSubId)) INNER JOIN lecture ON (lecture_subject.lecNum = lecture.lecNum )) INNER JOIN subject ON (subject.subjCode = lecture_subject.subjCode) INNER JOIN hod ON (hod.depCode = subject.depCode) WHERE reports.date =? AND hod.depCode=?', [reportDate, depId], function(error, results){
	
			if(error) throw error;
			let message = "";
	
			if(results.length == 0 || results === undefined){
				 message = "Report table is empty";
			}else{
				 message = "Retrieve reports";
			}
			
			 return res.send({error: false, data:results, message: message});
		         console.log(data);
			
	
	});	
});

router.get('/search/report/:reportDate/:moduleCode/:depId', function(req, res){
	let reportDate = req.params.reportDate;
	let moduleCode = req.params.moduleCode;
	let depId = req.params.depId;
	
	console.log(reportDate);
	console.log(moduleCode);
	console.log(depId);
	if(!reportDate || !moduleCode || !depId){
	  return res.status(400).send({error: true, message: "search values is required"})	
	}
	
	connection.query('SELECT lecture.lecName, lecture.lecSurname, lecture.title, lecture_subject.lecSubId, UPPER(lecture_subject.subjCode), reports.reportNum, reports.presentMode, reports.numStudents, reports.attendAvg, reports.date, reports.reportNum, reports.topicsCovered, reports.challRecomm, reports.assess FROM ((reports INNER JOIN lecture_subject ON (reports.lecSubId = lecture_subject.lecSubId)) INNER JOIN lecture ON (lecture_subject.lecNum = lecture.lecNum )) INNER JOIN subject ON (subject.subjCode = lecture_subject.subjCode) INNER JOIN hod ON (hod.depCode = subject.depCode) WHERE lecture_subject.subjCode=? AND reports.date =? AND hod.depCode=?', [moduleCode, reportDate, depId], function(error, results){
	
			if(error) throw error;
			let message = "";
	
			if(results.length == 0 || results === undefined){
				 message = "Report table is empty";
			}else{
				 message = "Retrieve reports";
			}
			
			 return res.send({error: false, data:results, message: message});
		         console.log(data);
			
	
	});	
});
/*router.get('/deptModules', function(req, res, next) {

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
});*/

module.exports = router