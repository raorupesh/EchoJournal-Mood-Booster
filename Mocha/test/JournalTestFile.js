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
        let response;
        let journalEntry;

        before(function (done) {
            chai.request(BASE_URL)
                .get(`/api/v1/journal/${testEntryId}`)
                .end(function (err, res) {
                    response = res;
                    journalEntry = res.body.data;
                    done();
                });
        });

        it('Should return a journal entry object with status 200 and expected structure', function () {
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('success', true);
            expect(response.body).to.have.property('data').that.is.an('object');
            expect(journalEntry).to.include.keys('_id', 'id', 'userId', 'content', 'feelings', 'date', 'createdAt', 'updatedAt', '__v');
        });

        it('Should have correct property values for the created entry', function () {
            expect(journalEntry.content).to.equal('I did this Test journal entry');
            expect(journalEntry.feelings).to.deep.equal(['happy', 'excited']);
            expect(journalEntry.userId).to.equal(testUserId);
        });

        it('Should have all expected properties with correct types', function () {
            expect(journalEntry).to.have.property('_id').that.is.a('string');
            expect(journalEntry).to.have.property('id').that.is.a('string');
            expect(journalEntry).to.have.property('userId').that.is.a('number');
            expect(journalEntry).to.have.property('content').that.is.a('string');
            expect(journalEntry).to.have.property('feelings').that.is.an('array');
            expect(journalEntry).to.have.property('date').that.is.a('string');
            expect(journalEntry).to.have.property('createdAt').that.is.a('string');
            expect(journalEntry).to.have.property('updatedAt').that.is.a('string');
            // __v may be missing for legacy entries, so check if present
            if ('__v' in journalEntry) {
                expect(journalEntry).to.have.property('__v');
            }
        });
    });

    describe('GET /api/v1/journal/all', function () {
        let response;
        let requestResult;

        before(function (done) {
            chai.request(BASE_URL)
                .get('/api/v1/journal/all')
                .end(function (err, res) {
                    response = res;
                    requestResult = res.body.entries;
                    done();
                });
        });

        it('Should return an array object with more than 2 objects', function () {
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('entries').that.is.an('array');
            expect(response.body.entries.length).to.be.above(2);
            expect(response).to.have.header('content-type');
        });

        it('The first entry in the array has known properties', function () {
            if (requestResult.length > 0) {
                expect(requestResult[0]).to.include.keys('_id', 'id', 'userId', 'content', 'feelings', 'date', 'createdAt', 'updatedAt', '__v');
                expect(requestResult[0]).to.have.property('_id');
                expect(requestResult[0]).to.have.property('userId');
                expect(response.body.entries).to.not.be.a('string');
            }
        });

        it('The elements in the array have the expected properties', function () {
            expect(response.body.entries).to.be.an('array');
            response.body.entries.forEach(entry => {
                expect(entry).to.have.property('_id');
                expect(entry).to.have.property('id');
                expect(entry).to.have.property('userId');
                expect(entry).to.have.property('content');
                expect(entry).to.have.property('feelings');
                expect(entry).to.have.property('date');
                expect(entry).to.have.property('createdAt');
                expect(entry).to.have.property('updatedAt');
            });
        });
    });

    // Add cleanup after all tests
    after(function(done) {
        chai.request(BASE_URL)
            .delete(`/api/v1/journal/${testEntryId}`)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('success', true);
                expect(res.body).to.have.property('message', 'Journal entry deleted successfully');
                done();
            });
    });
});