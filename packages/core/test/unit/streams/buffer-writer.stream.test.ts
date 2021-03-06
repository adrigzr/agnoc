import { describe, it } from "mocha";
import { expect } from "chai";
import { BufferWriter } from "@agnoc/core/streams/buffer-writer.stream";

describe("buffer-writer.stream", () => {
  it("creates an empty writable stream", () => {
    const stream = new BufferWriter();

    expect(stream.buffer).to.be.empty;

    stream.write(Buffer.from("hello", "utf8"));

    expect(stream.buffer.toString("utf8")).to.be.equal("hello");
  });

  it("creates a writable stream from a buffer", () => {
    const stream = new BufferWriter(Buffer.from("hello", "utf8"));

    expect(stream.buffer.toString("utf8")).to.be.equal("hello");

    stream.write(Buffer.from("world", "utf8"));

    expect(stream.buffer.toString("utf8")).to.be.equal("helloworld");
  });
});
