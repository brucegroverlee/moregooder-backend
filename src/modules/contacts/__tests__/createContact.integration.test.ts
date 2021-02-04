import dotenv from "dotenv";
import path from "path";

if (process?.env?.NODE_ENV==="test.local") {
  dotenv.config({
    path: path.resolve(process.cwd(), ".env.test"),
  });
} else {
  dotenv.config();
}

import chai from "chai";
import chaiHttp from "chai-http";
import { ExpressApp } from "../../../frameworks/express/ExpressApp";
import { jwtCreator } from "../../shared/__mocks__/jwtCreator";
import { ContactsRepositoryFactory } from "../adapter/gateways/ContactsRepositoryFactory";

chai.use(chaiHttp);

describe("Create a new contact integration test suit", () => {
  let requester: ChaiHttp.Agent;
  const server = new ExpressApp();
  let token: string;
  server.Start();

  beforeAll( async (done) => {
    requester = chai.request(server.app).keepOpen();
    token = jwtCreator("1");
    const contactsRepository = ContactsRepositoryFactory.getRepository();
    await contactsRepository.delete({ name: "[contacts::create] name" });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("POST /contacts", () => {
    it("should create a new contact.", async (done) => {
      const res = await requester
        .post("/api/contacts")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "[contacts::create] name",
          email: "contacts.create@email.com",
          country: "Fake country",
        });
        expect(res.status).toEqual(201);
        expect(typeof res.body).toEqual("object");
        expect(res.body.name).toEqual("[contacts::create] name");
        done();
    });
  });
});