import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../../src/index';
import bookDB from './book.test.json';
//import books from './book.test.json';
chai.should();

chai.use(chaiHttp);

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('Books Api', () => {
    it('GivenDetails_WhenProper_shouldReturnAddBook', (done) => {
      const token = bookDB.book.validToken;
      const addbook = {
        author: 'singh',
        title: 'new testing book',
        quantity: 100,
        price: 100,
        description: 'new testing books'
      };
      chai
        .request(app)
        .post('/api/v1/books/book')
        .set({ authorization: token })
        .send(addbook)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').eql('Book Inserted Successfully');
          done();
        });
    });
    it('GivenDetails_WhenProper_shouldReturnGetAllBook', (done) => {
      const token = bookDB.book.validToken;
      chai
        .request(app)
        .get('/api/v1/books/book')
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Geting All Book Successfully');
          done();
        });
    });
    it('GivenDetails_WhenProper_shouldReturnGetBookById', (done) => {
      const token = bookDB.book.validToken;
      chai
        .request(app)
        .get('/api/v1/books/book/61fbe6f4bd34582314e93390')
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Id Not Found');
          done();
        });
    });
    it('GivenDetails_WhenProper_shouldReturnUpdateBook', (done) => {
      const token = bookDB.book.validToken;
      const addbook = {
        author: 'singh',
        title: 'new test book',
        quantity: 100,
        price: 100,
        description: 'new testing books'
      };
      chai
        .request(app)
        .put('/api/v1/books/book/61fbe6f4bd34582314e93390')
        .set({ authorization: token })
        .send(addbook)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Book updated successfully');
          done();
        });
    });
    it('GivenDetails_WhenProper_shouldReturnDeleteBook', (done) => {
      const token = bookDB.book.validToken;
      chai
        .request(app)
        .delete('/api/v1/books/book/61fbe6f4bd34582314e93390')
        .set({ authorization: token })
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});
