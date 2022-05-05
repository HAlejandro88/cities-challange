const request = require('supertest')

const {app} = require('../app')

const {getUri, connect, closeDb} = require('../db/db')


beforeAll(async () => {
    const uri = await getUri()
    await connect({uri})
})

afterAll(async () => {
    await closeDb()
})

describe('return test for cities data', () => {
    test('should return code 200', async () => {
        const response = await request(app)
            .get('/api/v1/search')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
    })

    test('should response body in property data is array', async () => {
      const response = await request(app)
          .get('/api/v1/search?q=Londo')
          .set('Accept', 'application/json')

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true)

    });

    test('should return tru i property success in body response', async () => {
        const response = await request(app)
            .get('/api/v1/search?q=Londo&latitude=43.70011&longitude=-79.4163')
            .set('Accept', 'application/json')

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true)
    })

    test('if not have match with any parameter return message Nothing was found with that search', async() => {
        const response = await request(app)
            .get('/api/v1/search?q=xxx')
            .set('Accept', 'application/json')

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Nothing was found with that search')
    })

    test('response error server if api is down', async() => {
        const response = await request(app)
            .get('/api/v1/search/Londo')
            .set('Accept', 'application/json')

        expect(response.status).toBe(404);

    })
})