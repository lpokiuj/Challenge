const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../index");

chai.should();

chai.use(chaiHttp);

// Take User model
const User = require('../src/models/user.model');
// Take Post model
const Post = require('../src/models/post.model');

describe("Testing API", () => {
    it("Register - Login - Post - Update Email", (done) => {
        chai
        .request(server)
        .post("/api/auth/register")
        .send({
            name: "Michael",
            email: "michael@gmail.com",
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
                email: "michael@gmail.com",
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
                    title: "Title 1",
                    description: "Description of title 1",
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property("post");
                    chai
                    .request(server)
                    .put("/api/user/" + id)
                    .set("auth-token", token)
                    .send({
                        email: "michael@yahoo.com",
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
    afterEach('Cleanup dummy data', (done) => {
        User.deleteOne({ name: 'Michael' });
        Post.deleteOne({ title: 'Title 1' });
        done();
    });
});