const Activity = require("../modals/Activity");

exports.createActivity = async(req,res)=> {
    try{
        const activity = await Activity.create(req.body);
        res.status(201).json({message: "Activity created successfully", data: activity});
    }
    catch(error) {
        console.log(error)
        return res.status(500).json({
          success:false,
          message:'activity can not be created/ internal error'
        })
    }
}

exports.getAllActivity = async(req,res)=>{
    try{
        const activities = await Activity.find()

        return res.status(200).json({
            message:"found all activities",
            data:activities
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
          success:false,
          message:'could not get all activities/ internal error'
        })
    }
}