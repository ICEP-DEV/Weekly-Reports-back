const express = require('express');
const router = express.Router();
const connection = require('../config/config')

const bodyParser = require('body-parser');
const cors = require('cors');

//HOD Login
router.get('/hodLogin', function(req, res) {

    var Password1 = req.body.password;
    var hodNum = req.body.headNum;

    connection.query(`SELECT h.headNum, h.password
                        FROM hod h, department d
                        WHERE h.depCode = d.depCode 
                        AND h.headNum = ?`, hodNum, function (error, results) {

        if (error) 
        {
            console.log(error)
        }

        if (results.length > 0) 
        {
            if (results[0].headNum == hodNum)
            {
                if(results[0].password == Password1)
                {
                    console.log('Successfully logged in.');
                    console.log(results);
                    res.send(results);
                }
                else
                {
                    console.log('Incorrect password entered.')
                }
            }
        }
        else
        {
            console.log('Incorrect HOD ID entered.')
        }
        
    });
});

//Lecturer Login
router.get('/lecturerLogin', function(req, res) {

    var Password = req.body.password;
    var lecturerNum = req.body.lecNum;

    connection.query(`SELECT lecNum, password
                        FROM lecture
                        WHERE lecNum = ?`, lecturerNum, function (error, results) {

        if (error) 
        {
            console.log(error)
        }

        if (results.length > 0) 
        {
            if (results[0].lecNum == lecturerNum)
            {
                if(results[0].password == Password)
                {
                    console.log('Successfully logged in.');
                    console.log(results);
                    res.send(results);
                }
                else
                {
                    console.log('Incorrect password entered.')
                }
            }
        }
        else
        {
            console.log('Incorrect lecturer ID entered.')
        }
        
    });
});
module.exports = router