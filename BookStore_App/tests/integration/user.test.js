import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../../src/index';

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

  describe('Registration Api', () => {
    it('GivenRegistrationDetails_WhenProper_shouldReturnSuccess', (done) => {
      const register = {
        firstName: 'Mandeep',
        lastName: 'singh',
        email: 'mandeepsingh1996@gmail.com',
        password: 'Password@123'
      };
      chai
        .request(app)
        .post('/api/v1/users/admin')
        .send(register)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').eql('Registered Successfully');
          done();
        });
    });
    it('GivenRegistrationDetails_WhenNotProper_shouldReturn_Email_Already_Exist', (done) => {
      const register = {
        firstName: 'Mandeep',
        lastName: 'singh',
        email: 'mandeepsingh1996@gmail.com',
        password: 'Password@123'
      };
      chai
        .request(app)
        .post('/api/v1/users/admin')
        .send(register)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('message').eql('User Already Registered');
          done();
        });
    });
    it('GivenRegistrationDetails_WhenNotProper_shouldReturn_firstName_Required"', (done) => {
      const register = {
        lastName: 'mandeep',
        email: 'mandeep@gmail.com',
        password: 'Password@123'
      };
      chai
        .request(app)
        .post('/api/v1/users/admin')
        .send(register)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('GivenRegistrationDetails_WhenNotProper_shouldReturn_firstName_length_must_be_at_least_2_characters"', (done) => {
      const register = {
        firstName: 'm',
        lastName: 'singh',
        email: 'mandeep@gmail.com',
        password: 'Password@123'
      };
      chai
        .request(app)
        .post('/api/v1/users/admin')
        .send(register)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('GivenRegistrationDetails_WhenNotProper_shouldReturn_Email_fails_to_match_the_Required"', (done) => {
      const register = {
        firstName: 'mandeep',
        lastName: 'mandeep',
        email: 'mandeepgmail.com',
        password: 'Password@123'
      };
      chai
        .request(app)
        .post('/api/v1/users/admin')
        .send(register)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe('Login Api', () => {
    it('GivenLoginDetails_WhenProper_shouldReturnSuccess', (done) => {
      const login = {
        email: 'mandeepsingh1996@gmail.com',
        password: 'Password@123'
      };
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send(login)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Login Successfully');
          done();
        });
    });
    it('GivenLoginDetails_WhenNotProper_shouldReturn_Wrong_Password', (done) => {
      const login = {
        email: 'mandeepsingh1996@gmail.com',
        password: 'Password@12'
      };
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send(login)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property('message').eql('Wrong Password');
          done();
        });
    });
    it('GivenLoginDetails_WhenNotProper_shouldReturn_password_not_allowed_tobe_empty', (done) => {
      const login = {
        email: 'mandeepsingh1996@gmail.com',
        password: ''
      };
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send(login)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('GivenLoginDetails_WhenNotProper_shouldReturn_Email_Not_Register', (done) => {
      const login = {
        email: 'mandeepsingh19961@gmail.com',
        password: 'Password@123'
      };
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send(login)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('User Not Register');
          done();
        });
    });
    it('GivenLoginDetails_WhenNotProper_shouldReturn_Email_fails_to_match_the_Required"', (done) => {
      const login = {
        email: 'mandeepsingh1996gmail.com',
        password: 'Password@123'
      };
      chai
        .request(app)
        .post('/api/v1/users/login')
        .send(login)
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
