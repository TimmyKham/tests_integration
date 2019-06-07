const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const should = chai.should()
const expect = chai.expect;

chai.use(chaiHttp)

const newValues = []
const colorKey = 'NEW_COLOR_'
let nextCursor = 0;
const payloadColor = () => {
  const nextColor = `${colorKey}${nextCursor}`
  newValues.push(nextColor)
  nextCursor++;
  return { 'color': nextColor }
}
const getCurrentCulor = () => {
  return nextCursor > 0 ? `${colorKey}${nextCursor - 1}` : `${colorKey}O`
}

describe('colors', () => {
  describe('/GET colors', () => {
    it('​should return all colors', (done) => {
      chai.request(app).get('/colors').end((err, res) => {
        expect(res).to.have.status(200);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.results.should.be.a('array');
        res.body.results.should.include.members(["RED","GREEN","BLUE"]);
        done();
      });
    });
  });
  describe('/GET color', () => {
    it('should return Bad Request​', (done) => {
      chai.request(app).get('/color').end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
    });
  });
  describe('/POST colors', () => {
    it('should add new color​', (done) => {
      const param = payloadColor();
      chai.request(app).post('/colors').send(param).end((err, res) => {
        expect(res).to.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.results.should.be.a('array');
        res.body.results.should.include.members([getCurrentColor()]);
        done();
      });
    });
  });
  describe('/GET colors', () => {
    it('​​should return new color list Request', (done) => {
      chai.request(app).get('/colors').end((err, res) => {
        expect(res).to.have.status(200);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.results.should.be.a('array');
        res.body.results.should.include.members("RED","GREEN","BLUE",getCurrentColor());
        done();
      });
    });
  });
});

