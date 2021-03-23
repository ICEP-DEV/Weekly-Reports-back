const express = require('express');
const router = express.Router();
const connection = require('../config/config')


router.get('/lectureDashboard/:lecId', function (req, res, next) {
    //const params = req.body;

    connection.query(`select deptName, s.subjCode, subjName, ls.lecSubId as lecSubId, l.lecNum, title, lecName, lecSurname, email
                        from lecture l, department d, subject s, lecture_subject ls
                        where l.lecNum = ls.lecNum
                        and ls.subjCode = s.subjCode
                        and s.depCode = d.depCode
                        and l.lecNum =?`,req.params.lecId, function (error, results) {
        if (error) throw error

        if (results.length > 0) {
            console.log(results)
            res.send(results)
        }
        else{
            console.log('cannot')
        }
    })
})

router.get('/selectedModule/:id', function (req, res, next) {

    connection.query(`select title,lecName,lecSurname, deptName, s.subjCode, subjName,ls.lecSubId
                        from lecture l, department d, subject s, lecture_subject ls
                        where l.lecNum = ls.lecNum
                        and ls.subjCode = s.subjCode
                        and s.depCode = d.depCode
                        and ls.lecSubId =?`,req.params.id, function (error, results) {
        if (error) throw error

        if (results.length > 0) {
            console.log(results)
            res.send(results)
        }
        else{
            console.log(req.params.id)
        }
    })
})

router.get('/getModules/:id', function (req, res, next) {
    console.log('get')

    connection.query(`select upper(lecName) as lecName, upper(lecSurname) as lecSurname, upper(deptName) as deptName, upper(s.subjCode) as subjCode, upper(subjName) as subjName
                        from lecture l, department d, subject s, lecture_subject ls
                        where l.lecNum = ls.lecNum
                        and ls.subjCode = s.subjCode
                        and s.depCode = d.depCode
                        and ls.lecSubId =?`, req.params.id, function (error, results) {
        if (error) throw error

        if (results.length > 0) {
            console.log(results)
            res.send(results)
        }
        else{console.log('not', req.params.id)}
    })
})

router.post('/report', function (req, res, next) {

    const params = req.body;

    //console.log(params);
    connection.query(`SELECT reportNum, numStudents, date, topicsCovered, teachMode, presentMode, resource, attendAvg, activities, assess, challRecomm, l.lecSubId
                        FROM reports r, lecture_subject l
                        where l.lecSubId = r.lecSubId
                        and week(CURRENT_DATE) = week(date)
                        and l.lecSubId = ?`, [params.lecSubId], function (error, results) {

        if (error) throw error

        if (results.length > 0) {
            
            var reportNum = results[0].reportNum
            //var numStudents = results[0].numStudents
            var topicsCovered =  results[0].topicsCovered
            var teachMode = results[0].teachMode
            var presentMode = results[0].presentMode
            var resource = results[0].resource
            var activities = results[0].activities
            var assess = results[0].assess
            var challRecomm = results[0].challRecomm
        /*
           if(topicsCovered.includes(params.topicsCovered)){
                console.log('yes it contain ',params.topicsCovered)
                params.topicsCovered = '';
            }

            if(teachMode.includes(params.teachMode)){
                console.log('yes it contain ',params.teachMode)
                params.teachMode = '';
            }

            if(presentMode.includes(params.presentMode)){
                console.log('yes it contain ',params.presentMode)
                params.presentMode = '';
            }

            if(resource.includes(params.resource)){
                console.log('yes it contain ',params.resource)
                params.resource = '';
            }

            if(activities.includes(params.activities)){
                console.log('yes it contain ',params.activities)
                params.activities = '';
            }

            if(assess.includes(params.assess)){
                console.log('yes it contain ',params.assess)
                params.assess = '';
            }
            var replace;

            if(assess.includes('N/A') && params.assess != undefined){
                //JSON.parse(JSON.stringify(assess).replace("N/A",""));
                replace = assess.replace('N/A','',1);
                //assess.replace("N/A","")
                console.log('replace ', replace)
                assess = replace;
            }*/
            //------------------------------------- REMOVE N/A-----------------------

            /*if(params.assess != ''){
                if(assess.includes('N/A')){
                    assess.replace('N/A','',1);
                }

                if(assess.includes(params.assess)){
                console.log('yes it contain ',params.assess)
                params.assess = '';
                }     
            }*/

            //-----------------------------------------  END ---------------------------

            if(challRecomm.includes(params.challRecomm)){
                console.log('yes it contain ',params.challRecomm)
                params.challRecomm = '';
            }
            
            topicsCovered = (topicsCovered +'\n'+ params.topicsCovered).trim()
            teachMode = (teachMode +'\n'+ params.teachMode).trim()
            presentMode = (presentMode +'\n'+ params.presentMode).trim()
            resource = (resource +'\n'+ params.resource).trim()
            activities = (activities +'\n'+ params.activities).trim()
            assess = (assess +'\n'+ params.assess).trim()
            challRecomm = (challRecomm +'\n'+ params.challRecomm).trim()

    
            connection.query(`update reports
                                set topicsCovered =?,
                                teachMode =?,
                                presentMode =?,
                                resource =?,
                                activities =?,
                                assess =?,
                                challRecomm =?
                                where reportNum =?`,[topicsCovered,teachMode,presentMode,resource,activities,assess,challRecomm,reportNum], function(error,rows){
                                    if(error){throw error}

                                    console.log(rows)

                                    res.send(rows)
                                })

        }
        else {
            if(params.assess==''){
                params.assess="N/A";
            }

            const date_ob = new Date();

            const date = ("0" + date_ob.getDate()).slice(-2); /// day
            const month = ("0" + (date_ob.getMonth() + 1)).slice(-2); /// month
            const year = date_ob.getFullYear(); /// year
             const fullDate = year + "-" + month + "-" + date;
            params.date = fullDate
            
           // res.send(params)
            console.log('No report for this week')
            connection.query('insert into reports set ?',params,function(error,rows){
                if(error) throw error

                console.log(rows)
                return res.send({error: true, message:rows});
            })
        }

    })

});

router.get('/myReports/:lectNum', function (req, res, next) {
    var sql = `select s.subjCode, subjName, reportNum
                from lecture_subject ls, subject s, lecture l,reports r
                where l.lecNum = ls.lecNum
                and ls.subjCode = s.subjCode
                and ls.lecSubId = r.lecSubId
                and week(date) = week(CURRENT_DATE)
                and l.lecNum =?`
    connection.query(sql, [req.params.lectNum], function (error, results) {
        if (error) console.log(error)

        if (results) {
            console.log(results)
            res.send(results)
        }
    })
})


router.get('/reportDetails/:reportId', function (req, res, next) {

    var sql = `select *
                from reports
                where reportNum =?`
    connection.query(sql,[req.params.reportId], function(error,results){
        if(error) console.log(error)

        if(results){
            console.log(results)
            res.send(results)
            
        }
    })
})



module.exports = router