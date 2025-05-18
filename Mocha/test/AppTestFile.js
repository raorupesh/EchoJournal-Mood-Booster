const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;
chai.use(chaiHttp);

const BASE_URL = 'http://localhost:8080';

describe('Journal Entry API Tests', function () {
    let testUserId = 1;
    let testEntryId;

    before(function (done) {
        chai.request(BASE_URL)
            .post('/api/v1/journal/')
            .send({
                userId: testUserId,
                content: 'I did this Test journal entry',
                feelings: ['happy', 'excited'],
                date: new Date().toISOString()
            })
            .end(function (err, res) {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('data');
                testEntryId = res.body.data.id;
                done();
            });
    });

    describe('GET /api/v1/journal/:id', function () {
        it('Should return a journal entry with expected properties for entry id', function (done) {
            chai.request(BASE_URL)
                .get(`/api/v1/journal/${testEntryId}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body).to.have.property('data');
                    expect(res.body.data).to.include.keys('_id', 'id', 'userId', 'content', 'feelings', 'date', 'createdAt', 'updatedAt', '__v');
                    expect(res.body.data.content).to.equal('I did this Test journal entry');
                    expect(res.body.data.feelings).to.deep.equal(['happy', 'excited']);
                    expect(res.body.data.userId).to.equal(testUserId);
                    done();
                });
        });

        it('Should return 404 for non-existent id', function (done) {
            chai.request(BASE_URL)
                .get(`/api/v1/journal/000000000000000000000000`)
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('success', false);
                    done();
                });
        });

        it('Should return 404 for invalid id format', function (done) {
            chai.request(BASE_URL)
                .get(`/api/v1/journal/123456678`)
                .end(function (err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('success', false);
                    expect(res.body).to.have.property('message', 'Journal entry not found');
                    done();
                });
        });
    });

    describe('GET /api/v1/journal/all', function () {
        it('Should return an array of journal entries for valid userId', function (done) {
            chai.request(BASE_URL)
                .get(`/api/v1/journal/all?userId=${testUserId}`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body).to.have.property('entries');
                    expect(res.body.entries).to.be.an('array');
                    if (res.body.entries.length > 0) {
                        expect(res.body.entries[0]).to.include.keys(
                            '_id', 'id', 'userId', 'content', 'feelings', 'date', 'createdAt', 'updatedAt', '__v'
                        );
                    }
                    done();
                });
        });

        it('Should support pagination with page and limit query', function (done) {
            chai.request(BASE_URL)
                .get(`/api/v1/journal/all?userId=${testUserId}&page=1&limit=1`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body).to.have.property('entries');
                    expect(res.body.entries).to.be.an('array');
                    expect(res.body.entries.length).to.be.at.most(1);
                    done();
                });
        });

        it('Should return empty array for userId with no entries', function (done) {
            chai.request(BASE_URL)
                .get(`/api/v1/journal/all?userId=999999`)
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('success', true);
                    expect(res.body).to.have.property('entries');
                    expect(res.body.entries).to.be.an('array');
                    expect(res.body.entries.length).to.equal(0);
                    done();
                });
        });
    });
});