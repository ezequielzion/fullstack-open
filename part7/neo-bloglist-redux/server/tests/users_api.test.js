const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

test('creation fails with 400 when no username is sent', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        name: "test",
        username: "",
        password: "password"
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('creation fails with 400 when no password is sent', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        name: "test",
        username: "username",
        password: ""
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

afterAll(() => {
    mongoose.connection.close()
})