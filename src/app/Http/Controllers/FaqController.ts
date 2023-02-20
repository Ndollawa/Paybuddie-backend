import FaqModel from '../../Models/Faq'
import UserModel from '../../Models/User'
import {Request,Response} from 'express'


class FaqController {
    // constructor() {
    // }

// @desc Get all notes 
// @route GET /notes
// @access public
 public selectAll = async (req:Request, res:Response) => {
    // Get all notes from MongoDB
    const faqs = await FaqModel.find().lean()
    res.json(faqs)
}

// @desc Create new faq
// @route POST /faqs
// @access public
 public create = async (req:Request, res:Response) => {
    const { status, response, question } = req.body

    // Confirm data
    if (!status || !question || !response) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate question
    const duplicate = await FaqModel.findOne({ question }).collation({ locale: 'en', strength: 2 }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate faq question' })
    }

    // Create and store the new user 
    const faq = await FaqModel.create({ question,response,status })

    if (faq) { // Created 
        return res.status(201).json({ message: 'New faq created' })
    } else {
        return res.status(400).json({ message: 'Invalid faq data received' })
    }

}

// @desc Update a faq
// @route PATCH /faq
// @access public
public update = async (req:Request, res:Response) => {
    const {question, response,_id,status } = req.body

    // Confirm data
    if (!question || !response || !status || !_id) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Confirm faq exists to update
    const faq = await FaqModel.findById(_id).exec()

    if (!faq) {
        return res.status(400).json({ message: 'Faq not found' })
    }

    // Check for duplicate title
    const duplicate = await FaqModel.findOne({ question }).collation({ locale: 'en', strength: 2 }).lean().exec()

    // Allow renaming of the original note 
    if (duplicate && duplicate?._id.toString() !== _id) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    // faq.user = user
    faq.question = question
    faq.response = response
    faq.status = status

    const updatedFaq = await faq.save()

    res.json(`'${updatedFaq.question}' updated`)
}

// @desc Delete a faq
// @route DELETE /faqs
// @access public
public delete = async (req:Request, res:Response) => {
    const { _id } = req.body

    // Confirm data
    if (!_id) {
        return res.status(400).json({ message: 'Faq ID required' })
    }

    // Confirm faq exists to delete 
    const faq = await FaqModel.findById(_id).exec()

    if (!faq) {
        return res.status(400).json({ message: 'Faq not found' })
    }

    const result = await FaqModel.deleteOne()

    res.json({success:true})
}

}

export default new FaqController();