const express = require('express');
const router = express.Router();
const { User, validate: validateUser } = require("../models/users.js");
const { matchDetails } = require("../models/matchDetails.js");
const { Interests } = require('../models/interests.js');


router.get('/', async (req,res) => {

    /**
     * Current User Data
     */
    const currentUser = await User.findOne({_id : req.query.userId});

    /**
     * Current's User interests/ match preferences 
     */
    const currentUserInterests = await matchDetails.findOne({user : currentUser._id});


    /**
     * Users except the current user data information
     */
    const usersExceptTheCurrentUser = await User.find({_id : {$ne : req.query.userId}});


    /**
     * Potential matches interests / match preferences
     */
    const potentialMatchInterests = await matchDetails.find({ 
        $and : [
            // gender needs to be changed according to current user preference
            { gender : currentUserInterests.preference},
            { user : {$ne : currentUser._id}}
        ]
    
    })
    .populate("user");      

    console.log("-----------   CurrentUser Interests ---------------");
    //console.log(currentUserInterests);

    console.log("-----------   Potential Interests ---------------");
    //console.log(potentialMatchInterests);

    //console.log(potentialMatchInterests.length);
    return res.json(potentialMatchInterests);


    /**
     * Working on the ranking stuff at the moment
     */

    // for(let i = 0; i < potentialMatchInterests.length; i++) {
    //     potentialMatchInterests[0].points = 0;
    //     for(interest in currentUserInterests.interests) {
    //         if(potentialMatchInterests[0].interests.includes(interest) ) {
    //             potentialMatchInterests[0].points++;
    //         }
    //     }
    // }
    
    // console.log("------------- Ranking -----------------------");

    // for(let i = 0; i < potentialMatchInterests.length; i++) {
    //     console.log(potentialMatchInterests[0].points);
    // }


    // for(interest in currentUserInterests.interests){
    //     for()
    //     if(interest in potentialMatchInterests[0].interests){
    //         potentialMatchInterests[0].points++;

    //     }
    // }


})


module.exports = router;


