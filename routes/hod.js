const express = require('express');
const router = express.Router();
const connection = require('../config/config')
//const https = require('https');
//const fs = require('fs');
const app = require('express')();
const bodyParser = require('body-parser');
//const cors = require('cors');

//const url = "C:/Users/ICEP-INTERN/Desktop/Anele/Weekly-Reports-back/Database/lectureReport.pdf";

/*https.get(url, function(res){
    const fileStream = fs.createWriteStream("C:/Users/ICEP-INTERN/Desktop/Anele/Weekly-Reports-back/Database/LecturerReport.pdf");
    res.pipe(fileStream);
    fileStream.on("finish", function(){
        fileStream.close();
    });
});*/

router.get('/hodreport', function (req, res, next) {

    const params = req.body

    connection.query(`SELECT DISTINCT r.reportNum, r.activities, r.assess, r.challRecomm, r.date as start_date, date(r.date + 5) as end_date, s.subjCode, d.deptName 
                        FROM reports r, lecture_subject ls, subject s, lecture l, department d, hod h 
                        WHERE r.lecSubId = ls.lecSubId 
                        AND ls.subjCode = s.subjCode 
                        AND ls.lecNum = l.lecNum 
                        AND d.depCode = h.depCode 
                        AND week(date) = week(CURRENT_DATE) 
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