const express = require('express');
const router = express.Router();
const connection = require('../config/config')


router.post('/report', function (req, res, next) {

    const params = req.body;
    if(params.assess==''){
        params.assess="N/A";
    }
    //console.log(params);
    connection.query(`SELECT reportNum, numStudents, date, topicsCovered, teachMode, presentMode, resource, attendAvg, activities, assess, challRecomm, l.lecSubId
                        FROM reports r, lecture_subject l
                        where l.lecSubId = r.lecSubId
                        and week(CURRENT_DATE) = week(date)
                        and l.lecSubId = ?`, [params.lecSubId], function (error, results) {

        if (error) throw error

        if (results.length > 0) {
            
            var repNo = results[0].reportNum
            var NoStud = results[0].numStudents
            var topics =  results[0].topicsCovered //+'\n'+ params.topicsCovered.trim()
            var teachMode = results[0].teachMode
            var presentMode = results[0].presentMode //+'\n'+ params.presentMode.trim()
            var resource = results[0].resource //+'\n'+ params.resource.trim()
            var activities = results[0].activities //+'\n'+ params.activities.trim()
            var assess = results[0].assess //+'\n'+ params.assess.trim()
            var challRecomm = results[0].challRecomm //+'\n'+ params.challRecomm.trim()

           if(topics.includes(params.topicsCovered)){
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
            }
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
            
            topics = (topics +'\n'+ params.topicsCovered).trim()
            teachMode = (teachMode +'\n'+ params.teachMode).trim()
            presentMode = (presentMode +'\n'+ params.presentMode).trim()
            resource = (resource +'\n'+ params.resource).trim()
            activities = (activities +'\n'+ params.activities).trim()
            assess = (assess +'\n'+ params.assess).trim()
            challRecomm = (challRecomm +'\n'+ params.challRecomm).trim()

            
            /*const repNo = results[0].reportNum
            const NoStud = results[0].numStudents
            const topics = results[0].topicsCovered +'\n'+ params.topicsCovered.trim()
            const teachMode = results[0].teachMode
            const presentMode = results[0].presentMode +'\n'+ params.presentMode.trim()
            const resource = results[0].resource +'\n'+ params.resource.trim()
            const activities = results[0].activities +'\n'+ params.activities.trim()
            const assess = results[0].assess +'\n'+ params.assess.trim()
            const challRecomm = results[0].challRecomm +'\n'+ params.challRecomm.trim()*/




            //console.log(topics,'*******\n',teachMode,'**********\n',presentMode,'*********\n',resource,'***********\n',activities,'***********\n',assess,'***********\n',challRecomm);
            //res.send(challRecomm)
            connection.query(`update reports
                                set topicsCovered =?,
                                teachMode =?,
                                presentMode =?,
                                resource =?,
                                activities =?,
                                assess =?,
                                challRecomm =?
                                where reportNum =?`,[topics,teachMode,presentMode,resource,activities,assess,challRecomm,repNo], function(error,rows){
                                    if(error){throw error}

                                    console.log(rows)

                                    res.send(rows)
                                })
            //console.log(results);

        }
        else {
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


module.exports = router