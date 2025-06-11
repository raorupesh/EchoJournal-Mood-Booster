const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const BASE_URL = 'https://echojournal-crgagzdufjfqgwbf.westus-01.azurewebsites.net';

describe('Emotion Entry POST API Tests', function () {
    let testUserId = "113352457463047835007";

    it('Should create a new emotion entry with valid data', function (done) {
        chai.request(BASE_URL)
            .post('/api/v1/emotion')
            .send({
                userId: testUserId,
                moodScore: 2,
                feelings: ['sad', 'stressed'],
                people: ['home'],
                place: ['cafe']
            })
            .end(function (err, res) {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.include.keys('id', 'userId', 'moodScore', 'feelings', 'people', 'place');
                done();
            });
    });

    it('Should return with http staus as 500 for missing required fields', function (done) {
        chai.request(BASE_URL)
            .post('/api/v1/emotion')
            .send({ userId: testUserId }) // missing moodScore, feelings, etc.
            .end(function (err, res) {
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('success', false);
                done();
            });
    });

    it('Should return 500 for invalid data types', function (done) {
        chai.request(BASE_URL)
            .post('/api/v1/emotion')
            .send({
                userId: "not-a-number",
                moodScore: "high",      
                feelings: "happy",      
                people: "friend",      
                place: "park"           
            })
            .end(function (err, res) {
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('success', false);
                done();
            });
    });
});