const express = require('express');
const router = express.Router();
const connection = require('../config/config');
const jwt = require('jsonwebtoken');

router.get('/department', function (req, res, next) {
    connection.query(`select * 
                        from department`, function (error, results) {
            if (error) console.log(error)

            if (results.length > 0) {
                console.log(results)
                res.send(results)
            }
        })
})

router.get('/deptModules/:dpCode', function (req, res, next) {
    
    connection.query(`select * 
                        from subject
                        where depCode =?`, req.params.dpCode, function (error, results) {
            if (error) console.log(error)

            if (results.length > 0) {
                console.log(results)
                res.send(results)
            }
            else {
                console.log('this deaprtment does not contain modules')
            }
        })
})



/*
router.get('/foundationModules', function (req, res, next) {
    connection.query(`select * 
                        from subject
                        where subjCode = "NDITF1"`, function (error, results) {
            if (error) console.log(error)

            if (results.length > 0) {
                console.log(results)
            }
        })
})

router.get('/informaticsModules', function (req, res, next) {
    connection.query(`select * 
                        from subject
                        where subjCode = "NDIT12"`, function (error, results) {
            if (error) console.log(error)

            if (results.length > 0) {
                console.log(results)
            }
        })
})*/

//*************************    REGISTER LECTURE   **************************/

router.post('/lecture', function (req, res, next) {
    //const params = req.body;
    console.log(req.body);
    const {lecNum, lecName, lecSurname, email, title, password, subjCode } = req.body;
    
    connection.query('SELECT * FROM lecture WHERE lecNum =?', [lecNum], function (error, results) {
            if (error) console.log(error)

            if (results.length > 0) {
                console.log('this lecture exist')
                console.log(results)

            }
            else {
                connection.query('INSERT INTO lecture(lecNum,lecName,lecSurname,email,title,password) VALUES(?,?,?,?,?,?)', [lecNum, lecName, lecSurname, email, title, password], function (error, rows) {
                        if (error) console.log(error)
                        for (var k = 0; k < subjCode.length; k++) {
                            connection.query(
                                'INSERT INTO lecture_subject(subjCode,lecNum) VALUES(?,?)', [subjCode[k], lecNum], function (err) {
                                });
                        }

                        console.log(rows);
                        return res.send(rows);

                    })
            }
        });

});




//*************************    REGISTER HOD   **************************/

router.post('/hod', function (req, res, next) {
    //const params = req.body;
    console.log(req.body);
    const {headNum, headName, headSurname, email, title, password, subjCode, depCode } = req.body;
    
    connection.query('SELECT * FROM hod WHERE headNum =?', [headNum], function (error, results) {
            if (error) console.log(error)

            if (results.length > 0) {
                console.log('this hod exist')
                console.log(results)

            }
            else {
                console.log(headNum, headName, headSurname, email, title, password, depCode)
                console.log('not yet registered')
                console.log(subjCode)
                connection.query('INSERT INTO hod(headNum, headName, headSurname, email, title, password, depCode) VALUES(?,?,?,?,?,?,?)', [headNum, headName, headSurname, email, title, password, depCode], function (error, rows) {
                        if (error) console.log(error)
                        console.log(rows)
                        return res.send(rows)

                    })
            }
        });

});



module.exports = router