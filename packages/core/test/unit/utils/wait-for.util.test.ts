import { describe, it } from "mocha";
import { expect } from "chai";
import { waitFor } from "@agnoc/core/utils/wait-for.util";
import { DomainException } from "@agnoc/core/exceptions/domain.exception";
import sinon, { SinonFakeTimers } from "sinon";

describe("waitFor", () => {
  let timer: SinonFakeTimers;

  beforeEach(function () {
    timer = sinon.useFakeTimers();
  });

  afterEach(function () {
    timer.restore();
  });

  it("resolves when condition is met", async () => {
    let check = false,
      called = false;
    const promise = waitFor(() => check);

    void promise.then(() => {
      called = true;
    });

    expect(called).to.be.false;

    check = true;

    await timer.tickAsync(1);

    expect(called).to.be.true;
  });

  it("rejects when condition is not met and timeout triggers", async () => {
    let called = false;
    const check = false;
    const promise = waitFor(() => check, { timeout: 100 });

    void promise.catch((e) => {
      expect(e).to.be.instanceof(DomainException);
      called = true;
    });

    await timer.tickAsync(50);

    expect(called).to.be.false;

    await timer.tickAsync(50);

    expect(called).to.be.true;
  });
});
