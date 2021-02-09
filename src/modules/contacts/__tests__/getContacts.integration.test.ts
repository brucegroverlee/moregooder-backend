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
    await contactsRepository.delete({ country: "[contacts::list] country" });
    await contactsRepository.create({ name: "name 1", email: "email1@emailcom", country: "[contacts::list] country", });
    await contactsRepository.create({ name: "name 2", email: "email2@emailcom", country: "[contacts::list] country", });
    await contactsRepository.create({ name: "name 3", email: "email3@emailcom", country: "[contacts::list] country", });
    done();
  });

  afterAll(done => {
    requester.close(done);
  });

  describe("GET /contacts", () => {
    it("should get the list of contacts.", async (done) => {
      const res = await requester
        .get("/api/contacts")
        .set("Authorization", `Bearer ${token}`);
        expect(res.status).toEqual(202);
        expect(typeof res.body).toEqual("object");
        expect(res.body.data.length).toEqual(3);
        expect(res.body.data[0].country).toEqual("[contacts::list] country");
        done();
    });
  });
});