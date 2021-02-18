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
    token = jwtCreator(1);
    const contactsRepository = ContactsRepositoryFactory.getRepository();
    await contactsRepository.delete({ name: "[contacts::list] name" });
    await contactsRepository.create({ name: "[contacts::list] name", email: "email1@emailcom", });
    await contactsRepository.create({ name: "[contacts::list] name", email: "email2@emailcom", });
    await contactsRepository.create({ name: "[contacts::list] name", email: "email3@emailcom", });
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
        expect(res.body.data.length).toBeGreaterThanOrEqual(3);
        expect(res.body.pagination.page).toEqual(1);
        expect(res.body.pagination.perPage).toEqual(10);
        done();
    });

    it("should get the filtered list of contacts by email.", async (done) => {
      const res = await requester
        .get("/api/contacts?email=email1@emailcom")
        .set("Authorization", `Bearer ${token}`);
        expect(res.status).toEqual(202);
        expect(typeof res.body).toEqual("object");
        expect(res.body.data.length).toBe(1);
        expect(res.body.pagination.page).toEqual(1);
        expect(res.body.pagination.perPage).toEqual(10);
        done();
    });
  });
});