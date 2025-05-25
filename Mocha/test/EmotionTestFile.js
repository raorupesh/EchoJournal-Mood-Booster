const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

const BASE_URL = 'http://localhost:8080';

describe('Emotion Entry Tests', function () {
    let testUserId = 1;
    let testEmotionId;

    before(function (done) {
        chai.request(BASE_URL)
            .post('/api/v1/emotion')
            .send({
                userId: testUserId,
                moodScore: 3,
                feelings: ['motivated'],
                people: ['family'],
                place: ['cafe']
            })
            .end(function (err, res) {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('data');
                testEmotionId =  res.body.data.id;
                done();
            });
    });

    describe('GET /api/v1/emotion/:id', function () {
    it('Should return a single emotion entry by ID', function (done) {
        chai.request(BASE_URL)
            .get(`/api/v1/emotion/${testEmotionId}`)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('success', true);
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.include.keys(
                'id', 'moodScore', 'feelings', 'people', 'place', 'date');
                expect(res.body.data.id).to.equal(testEmotionId);
                done();
            });
        });
    });


    describe('GET /api/v1/emotion/all', function () {
        let response;
        let entries;

        before(function (done) {
            chai.request(BASE_URL)
                .get('/api/v1/emotion/all')
                .end(function (err, res) {
                    response = res;
                    entries = res.body.entries || res.body.data;
                    done();
                });
        });

        it('Should return an array of emotion entries', function () {
            expect(response).to.have.status(200);
            expect(entries).to.be.an('array');
            expect(entries.length).to.be.at.least(1);
        });

        it('First entry should have expected properties', function () {
            if (entries.length > 0) {
                expect(entries[0]).to.include.keys('id', 'moodScore', 'feelings', 'people', 'place');
            }
        });

        it('All entries should have correct types', function () {
            entries.forEach(entry => {
                expect(entry).to.have.property('moodScore').that.is.a('number');
                expect(entry).to.have.property('feelings').that.is.an('array');
                expect(entry).to.have.property('people').that.is.an('array');
                expect(entry).to.have.property('place').that.is.an('array');
            });
        });
    });

    describe('GET /api/v1/emotion/monthly', function () {
        it('Should return monthly emotion data', function (done) {
            chai.request(BASE_URL)
                .get('/api/v1/emotion/monthly')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body).to.have.property('data');
                    done();
                });
        });
    });

    describe('Error Handling', function () {
        it('Should return 404 for non-existent emotion entry', function (done) {
            chai.request(BASE_URL)
                .get('/api/v1/emotion/000000000000000000000000')
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    done();
            });
        });
    });

    describe('Delete Emotion Entry Operation', function () {
        it('Should delete an emotion entry', function (done) {
            chai.request(BASE_URL)
                .delete(`/api/v1/emotion/${testEmotionId}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});