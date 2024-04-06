require('dotenv').config()
const router = require('express').Router()
// const db = require('../model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../model/user');
const cors = require('cors')



router.post('/users/signup', async (req, res) => {
    try {
        const newUser = new User(req.body)
        await newUser.save()
        const token = createToken(newUser)
        res.json({token, newUser})
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if(!user) throw new Error(`Could not find this user in the database: User with username ${username}`)  
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) throw new Error(`The password credentials shared did not match the credentials for the user with username ${username}`)
        const token = createToken(user)
        res.json({ token, user })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
})

function createToken(user){
    return jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' })
 }

 function checkToken(req, res, next){
    let token = req.get('Authorization')
    if(token){
        token = token.split(' ')[1]
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            req.user = err ? null : decoded.user
            req.exp = err ? null : new Date(decoded.exp * 1000)
        })
        return next()
    } else {
        req.user = null 
        return next()
    }
}

function ensureLoggedIn(req, res, next ){
    if(req.user) return next()
    res.status('401').json({ msg: 'Unauthorized You Shall Not Pass'})
}

module.exports = router