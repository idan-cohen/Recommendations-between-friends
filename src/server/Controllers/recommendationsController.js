const Recommendation = require('../models/Recommendation_model'),
    User = require('../models/User_model'),
    catchAsync = require('../utils/catchAsync'),
    AppError = require('../utils/appError');

const recommendation_update = async req => {
    const { placeId, userName, comment, rate } = req.body;
    let user = await User.findOne({ userName });
    let recommend = await Recommendation.findOneAndUpdate(
        { placeId, userName: user },
        { comment, rate, date:Date.now() },
        { new: true, runValidators: true }
    );
    return {recommend,user};
}

const send_data = (res,data,results,statusCode) =>  res.status(statusCode).json({
    status: "success",
    results,
    data
});

const convert_recommendations = async (res,recs,statusCode) =>{
    let recommendations = []
    for (i = 0; i < recs.length; i++) {
        const user = await User.findById(recs[i].userName);
        let user_name = user.userName;
        recommendations.push({
            placeId:recs[i].placeId,
            userName:user_name,
            comment:recs[i].comment,
            date:recs[i].date,
            rate:recs[i].rate,
        })
    }
    // return recs
    send_data(res,recommendations,recs.length,statusCode);
}

module.exports = {
            //Change the userName from the user id to user name
    getRecommendations : catchAsync(async (req, res,next) => {
        const recs = await Recommendation.find().sort('placeId userName');
        await convert_recommendations(res,recs,200)
    }),

    
    create_recommendation: catchAsync(async (req, res,next) => {
        let {recommend,user} = await recommendation_update(req);
        
        if (recommend) return await convert_recommendations(res,[recommend],201)
            // return send_data(res,recommend,1,201)

                //a new recommendation, if none is existed
        recommend = await Recommendation.create({
            placeId : req.body.placeId,
            userName: user,
            comment: req.body.comment,
            rate: req.body.rate,
        });

                //Add the recommendation to the user's list
        user.recommendationsList.push(recommend);
        await user.save();

        await convert_recommendations(res,[recommend],201)
    }),


    update_recommendation: catchAsync(async(req, res,next) => {
        const {recommend,user} = await recommendation_update(req);
                //If the recommendation does not exist
        if(!recommend)
            return next(new AppError('recommendation was not found',404));
        
        await convert_recommendations(res,[recommend],201)
    }),

    
    delete_recommendation: catchAsync(async(req, res,next) => {
        const { placeId, userName } = req.body;
        let user = await User.findOne({ userName });
        if(!user)
            return next(new AppError('User was not found',404));
     
        const recommend = await Recommendation.findOneAndDelete({placeId,userName:user});
        if(!recommend)
            return next(new AppError('Recommendation was not found',404));

        await User.findOneAndUpdate({ userName: req.body.userName, }, {
            $pull: { recommendationsList: recommend._id }
        });

        send_data(res,null,0,204);
    }),
};