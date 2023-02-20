import SliderModel from '../../Models/Slider'
// import UserModel from '../../Models/User'
import {Request, Response} from 'express'
import BaseController from './BaseController'



class SliderController extends BaseController {
    constructor(){
        super(SliderModel)   

   }

// @desc Get all notes 
// @route GET /notes
// @access public
 public selectAll = async (req:Request, res:Response) => {
    // Get all notes from MongoDB
    const slider = await SliderModel.find().lean()

    // If no notes 
    if (!slider?.length) {
        return res.status(400).json({ message: 'No slider found' })
    }

    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    // const sliderWithUser = await Promise.all(slider.map(async (slider) => {
    //     const user = await User.findById(SliderModel.user).lean().exec()
    //     return { ...slider, username: user.username }
    // }))

    res.json(slider)
}

// @desc Create new slider
// @route POST /slider
// @access authorized user
 public create = async (req:Request, res:Response) => {
    const { title, description, body, image } = req.body

    // Confirm data
    if (!body || !title || !image) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await SliderModel.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate slider title' })
    }

    // Create and store the new user 
    const slider = await SliderModel.create({ title,description,body,image })

    if (slider) { // Created 
        return res.status(201).json({ message: 'New slider created' })
    } else {
        return res.status(400).json({ message: 'Invalid slider data received' })
    }

}

// @desc Update a slider
// @route PATCH /slider
// @access authorized user
public update = async (req:Request, res:Response) => {
    const {title, description,_id,status,body,image } = req.body

    // Confirm data
    if (!title || !description) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm slider exists to update
    const slider = await SliderModel.findById({_id}).exec()

    if (!slider) {
        return res.status(400).json({ message: 'slider not found' })
    }

    // Check for duplicate title
    const duplicate = await SliderModel.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== _id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    slider.body = body
    slider.title = title
    slider.image = image
    slider.description = description
    slider.status = status

    const updatedSlider = await slider.save()

    res.json(`'${updatedSlider.title}' updated`)
}

// @desc Delete a faq
// @route DELETE /slider
// @access authorized user
public delete = async (req:Request, res:Response) => {
    const { _id } = req.body

    // Confirm data
    if (!_id) {
        return res.status(400).json({ message: 'Faq ID required' })
    }

    // Confirm faq exists to delete 
    const faq = await SliderModel.findById(_id).exec()

    if (!faq) {
        return res.status(400).json({ message: 'slider not found' })
    }

    const result = await SliderModel.deleteOne()

    res.json({success:true})
}

}

export default new SliderController();