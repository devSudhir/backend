

const express = require('express')
const User = require('../models/user.model')

const router = express.Router()
const { body, validationResult } = require('express-validator')


router.post('/',
    body("first_name").isLength({ min: 1 }).withMessage("first name is required"),
    body("last_name").isLength({ min: 1 }),
    body("email").isEmail(),
    body("gender").isLength({ min: 3 }),
    body("first_name").isLength({ min: 1 }),
    body("age").isLength({ min: 1 }),


    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ data: errors.array() })
        }
        const user = await User.create(req.body)

        res.status(201).json({ data: user })
    })

module.exports = router
