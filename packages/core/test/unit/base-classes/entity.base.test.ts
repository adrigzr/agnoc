import { describe, it } from "mocha";
import { expect } from "chai";
import { Entity } from "@agnoc/core/base-classes/entity.base";
import { ID } from "@agnoc/core/value-objects/id.value-object";
import { ArgumentInvalidException } from "@agnoc/core/exceptions/argument-invalid.exception";
import { ArgumentNotProvidedException } from "@agnoc/core/exceptions/argument-not-provided.exception";

describe("entity.base", () => {
  it("throws an error when does not have props", () => {
    type EntityProps = { id: ID };

    class A extends Entity<EntityProps> {}

    expect(() => {
      // @ts-expect-error expected argument
      new A();
    }).to.throw(ArgumentInvalidException);
  });

  it("throws an error when does not have an id", () => {
    type EntityProps = { id: ID };

    class A extends Entity<EntityProps> {}

    expect(() => {
      // @ts-expect-error argument invalid
      new A({ foo: "bar" });
    }).to.throw(ArgumentNotProvidedException);
  });

  it("throws an error when has an invalid id", () => {
    type EntityProps = { id: ID };

    class A extends Entity<EntityProps> {}

    expect(() => {
      // @ts-expect-error argument invalid
      new A({ id: 123 });
    }).to.throw(ArgumentInvalidException);
  });

  it("has id property", () => {
    type EntityProps = { id: ID };

    class A extends Entity<EntityProps> {}

    const id = ID.generate();
    const a = new A({ id });

    expect(a.id.equals(id)).to.be.true;
  });

  it("has identity equality", () => {
    type EntityProps = { id: ID };

    class A extends Entity<EntityProps> {}

    const a = new A({ id: new ID(1) });
    const b = new A({ id: new ID(1) });
    const c = new A({ id: new ID(2) });

    expect(a.equals(a), "a equals a").to.be.true;
    expect(a.equals(b), "a equals b").to.be.true;
    expect(a.equals(c), "a not equals c").to.be.false;
    expect(a.equals(), "a not equals null").to.be.false;
    // @ts-expect-error argument not assignable
    expect(a.equals("foo"), "a not equals a non-entity").to.be.false;
  });

  it("is an entity", () => {
    type EntityProps = { id: ID };

    class A extends Entity<EntityProps> {}

    const a = new A({ id: ID.generate() });

    expect(Entity.isEntity(a)).to.be.true;
  });

  it("returns a frozen copy of its props", () => {
    type EntityProps = { id: ID; foo: string };

    class A extends Entity<EntityProps> {}

    const id = ID.generate();
    const a = new A({ id, foo: "bar" });
    const props = a.getPropsCopy();

    expect(props).to.be.deep.equal({
      id,
      foo: "bar",
    });

    expect(() => {
      props.id = ID.generate();
    }).to.throw(TypeError);
  });

  it("returns a copy of its props as a frozen object", () => {
    type EntityProps = { id: ID; foo: string };

    class A extends Entity<EntityProps> {}

    const a = new A({ id: new ID(1), foo: "bar" });

    expect(a.toJSON()).to.be.deep.equal({
      id: 1,
      foo: "bar",
    });
  });

  it("returns a copy of its props as a string", () => {
    type EntityProps = { id: ID; foo: string };

    class A extends Entity<EntityProps> {}

    const a = new A({ id: new ID(1), foo: "bar" });

    expect(a.toString()).to.be.deep.equal('{"id":1,"foo":"bar"}');
  });
});
