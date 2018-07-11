const express = require('express')
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()
const logic = require('logic')
const jwt = require('jsonwebtoken')
const jwtValidation = require('./utils/jwt-validation')

const { env: { TOKEN_SECRET, TOKEN_EXP } } = process

const jwtValidator = jwtValidation(TOKEN_SECRET)

const router = express.Router()

router.post('/registeruser/:apartmentId', jsonBodyParser, (req,res) =>{

    const { params: { apartmentId }, body: { name, surname, phone, dni, password } } = req
    
    return logic.registerUser(name, surname, phone, dni, password, apartmentId)
    .then(()=>{
        res.status(201)
        res.json({status:'OK'})
    })
    .catch(({message})=>{
        res.status(400)
        res.json({status:'KO', error: message})
    })
})

router.post('/auth', jsonBodyParser, (req, res) => {

    const { body: { dni, password } } = req

    logic.authenticateUser(dni, password)
        .then(user=> {
            
            const userId = user.id;
            const apartmentId = user.apartmentId;
            const token = jwt.sign({ id: userId, apartmentId }, TOKEN_SECRET, { expiresIn: TOKEN_EXP })

            res.status(200)
            res.json({ status: 'OK', data: { user, token  } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.get('/users/:userId',jwtValidator, (req, res) => {
    const { params: { userId } } = req

    return logic.retrieveUser(userId)
        .then(user => {
            res.status(200)
            res.json({ status: 'OK', data: user })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })

})
router.patch('/users/:userId', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { userId }, body: { name, surname, phone, dni, password, newPassword } } = req

    logic.updateUser(userId, name, surname, phone, dni, password, newPassword)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.get('/list/:apartmentId',jwtValidator, (req, res) => {
    const{ params: {apartmentId} } =req
    
    return logic.listUsers(apartmentId)
        .then(users => {
            res.status(200)
            res.json({ status: 'OK', data: users })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })

})
router.delete('/users/:userId', jwtValidator, (req, res) => {
    const { params: { userId } } = req

    logic.unregisterUser(userId)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.post('/register', jsonBodyParser, (req,res) =>{

    const { body: { name, address, phone } } = req

    return logic.registerApartment(name, address, phone)
    .then(apartId=>{
        
        res.status(201)
        res.json({status:'OK', data: apartId})
    })
    .catch(({message})=>{
        res.status(400)
        res.json({status:'KO', error: message})
    })
})

router.get('/listapartment/:apartmentId', jwtValidator, (req, res) => {
    const{ params: {apartmentId} } =req
    return logic.listApartment(apartmentId)
        .then(apartments => {
            res.status(200)
            res.json({ status: 'OK', data: apartments })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.patch('/updateapartment/:apartmentId', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { apartmentId }, body: { name, address, phone, owner, realState} } = req

    logic.updateApartment(apartmentId, name, address, phone, owner, realState)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.get('/apartment/:apartmentId', (req, res) => {
    const { params: { apartmentId } } = req;
    return logic.apartmentExists(apartmentId)
        .then(apartment => {
            res.status(200)
            res.json({ status: 'OK', data: apartment})
        })
                .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.delete('/listapartment/:apartmentId', jwtValidator, (req, res) => {
    const { params: { apartmentId }} = req

    return logic.deleteApartment(apartmentId)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.post('/task/:apartmentId', [jwtValidator, jsonBodyParser], (req,res) =>{

    const { params: { apartmentId }, body: { name} } = req
    
    return logic.addTasks(name, apartmentId)
    .then(taskId=>{
        res.status(201)
        res.json({status:'OK', data: taskId})
    })
    .catch(({message})=>{
        res.status(400)
        res.json({status:'KO', error: message})
    })
})
router.get('/task/:apartmentId', jwtValidator, (req, res) => {
    const{ params: {apartmentId} } =req
    return logic.listTasks(apartmentId)
        .then(tasks => {

            res.status(200)
            res.json({ status: 'OK', data: tasks })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.patch('/task/:apartmentId', jwtValidator, (req, res) => {
    const{ params: {apartmentId} } =req
    return logic.rotateUsersTasks(apartmentId)
        .then(tasks => {

            res.status(200)
            res.json({ status: 'OK', data: tasks })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.patch('/user/:userId/task/:taskId', jwtValidator, (req, res) => {
    const{ params: {userId, taskId} } =req
    return logic.relateUserTask(userId, taskId)
        .then(user => {
            res.status(200)
            res.json({ status: 'OK', data: user })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.delete('/task/:taskId', jwtValidator, (req, res) => {
    const { params: { taskId }} = req

    return logic.deleteTask(taskId)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.post('/market/:apartmentId', [jwtValidator, jsonBodyParser], (req,res) =>{

    const { params: { apartmentId }, body: { name} } = req
    
    return logic.addMarket(name, apartmentId)
    .then(marketId=>{
        res.status(201)
        res.json({status:'OK', data: marketId})
    })
    .catch(({message})=>{
        res.status(400)
        res.json({status:'KO', error: message})
    })
})
router.get('/market/:apartmentId', jwtValidator, (req, res) => {
    const{ params: {apartmentId} } =req
    return logic.listMarket(apartmentId)
        .then(market => {
            res.status(200)
            res.json({ status: 'OK', data: market })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.delete('/market/:marketId', jwtValidator, (req, res) => {
    const { params: { marketId }} = req

    return logic.deleteMarket(marketId)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.post('/note/:apartmentId', [jwtValidator, jsonBodyParser], (req,res) =>{

    const { params: { apartmentId }, body: { name} } = req
    
    return logic.addNotes(name, apartmentId)
    .then(noteId=>{
        res.status(201)
        res.json({status:'OK', data: noteId})
    })
    .catch(({message})=>{
        res.status(400)
        res.json({status:'KO', error: message})
    })
})
router.get('/note/:apartmentId', jwtValidator, (req, res) => {
    const{ params: {apartmentId} } =req
    return logic.listNotes(apartmentId)
        .then(market => {
            res.status(200)
            res.json({ status: 'OK', data: market })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})
router.delete('/note/:noteId', jwtValidator, (req, res) => {
    const { params: { noteId }} = req

    return logic.deleteNote(noteId)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})


module.exports = router