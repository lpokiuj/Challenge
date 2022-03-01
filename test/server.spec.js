const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../index");

chai.should();

chai.use(chaiHttp);

describe("Testing API", () => {
  it("Register - Login - Post - Update Email", (done) => {
    chai
      .request(server)
      .post("/api/auth/register")
      .send({
        name: "Made",
        email: "made@gmail.com",
        password: "janganliat",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("id");
        const id = res.body.id;
        chai
          .request(server)
          .post("/api/auth/login")
          .send({
            email: "made@gmail.com",
            password: "janganliat",
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("token");
            const token = res.body.token;
            chai
              .request(server)
              .post("/api/post/")
              .set("auth-token", token)
              .send({
                title: "Title 2",
                description: "Description of title 2",
              })
              .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property("post");
                chai
                  .request(server)
                  .put("/api/user/" + id)
                  .set("auth-token", token)
                  .send({
                    email: "made@yahoo.com",
                  })
                  .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property("id");
                    done();
                  });
              });
          });
      });
  });
});