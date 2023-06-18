import express from "express";
import User from '../module/user.js'
const router = express.Router();

router.get('/', (req, res) => {
    res.send('jai hind')
})
// Register 
router.post("/register", (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(422).json({ error: 'please add all fields..' })
    } else {
        User.findOne({ title: title })
            .then((savedTask) => {
                if (savedTask) {
                    res.status(422).json({ error: 'Already Exist' })
                } else {
                    const user = new User({
                        title,
                        description
                    })
                    user.save()
                        .then(user => {
                            res.status(200).json({ msg: 'Added Susessfully' })
                        })
                }
            })
    }
})

// get data
router.get("/getdata", async (req, res) => {
    try {
        const userdata = await User.find()
        res.status(200).json(userdata)
    } catch (error) {
        res.status(422).json(error)

    }
})

//get indivisual user
router.get("/getuser/:title", async (req, res) => {
    try {
        const { title } = (req.params);
        const userindividual = await User.findOne({ title: title })
        res.status(200).json(userindividual)
    } catch (error) {
        res.status(422).json(error)
    }
})
// get info by id 
router.get("/edituser/:id", async (req, res) => {
    try {
        const { id } = (req.params);
        const userindividual = await User.findById({ _id: id })
        res.status(200).json(userindividual)
    } catch (error) {
        res.status(422).json(error)
    }
})
//update info
router.patch("/updateuser/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateduser = await User.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.status(200).json(updateduser)
    } catch (error) {
        res.status(422).json(error)
    }
})

// delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const { id } = req.params;
        const deleteduser = await User.findByIdAndDelete({_id:id})
        res.status(200).json(deleteduser)
    } catch (error) {
        res.status(422).json(error)
    }
})


export default router;