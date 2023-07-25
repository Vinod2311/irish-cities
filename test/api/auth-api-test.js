import { assert } from "chai";
import { universityService } from "./university-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { maggie, maggieCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    universityService.clearAuth();
    await universityService.createUser(maggie);
    await universityService.authenticate(maggieCredentials);
    await universityService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const returnedUser = await universityService.createUser(maggie);
    const response = await universityService.authenticate(maggieCredentials);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async () => {
    const returnedUser = await universityService.createUser(maggie);
    const response = await universityService.authenticate(maggieCredentials);

    const userInfo = decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test("check Unauthorized", async () => {
    universityService.clearAuth();
    try {
      await universityService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});