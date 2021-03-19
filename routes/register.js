const express = require('express');
const router = express.Router();
const connection = require('../config/config')

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
    const params = req.body;

    connection.query(`select * 
                        from lecture 
                        where lecNum =?`, [params.lecNum], function (error, results) {
            if (error) console.log(error)

            if (results.length > 0) {
                console.log('this lecture exist')
                console.log(results)

            }
            else {
                connection.query(`INSERT INTO lecture(lecNum,lecName,lecSurname,email,title,password)
                            VALUES(?,?,?,?,?,?)`, [params.lecNum, params.lecName, params.lecSurname, params.email, params.title, params.password], function (error, rows) {
                        if (error) console.log(error)

                        for (var k = 0; k < params.subjCode.length; k++) {
                            connection.query(`insert into lecture_subject(subjCode,lecNum)
                                                VALUES(?,?)`, [params.subjCode[k], params.lecNum], function (err) {
                                })
                        }

                        console.log(rows)
                        return res.send(rows)

                    })
            }
        });

});




//*************************    REGISTER HOD   **************************/

router.post('/hod', function (req, res, next) {
    const params = req.body;

    connection.query(`select * 
                        from hod 
                        where headNum =?`, [params.headNum], function (error, results) {
            if (error) console.log(error)

            if (results.length > 0) {
                console.log('this hod exist')
                console.log(results)

            }
            else {
                console.log(params.headNum, params.headName, params.headSurname, params.email, params.title, params.password,params.depCode)
                console.log('not yet registered')
                console.log(params.subjCode)
                connection.query(`INSERT INTO hod(headNum,headName,headSurname,email,title,password,depCode)
                            VALUES(?,?,?,?,?,?,?)`, [params.headNum, params.headName, params.headSurname, params.email, params.title, params.password,params.depCode], function (error, rows) {
                        if (error) console.log(error)

                        console.log(rows)
                        return res.send(rows)

                    })
            }
        });

});



module.exports = router