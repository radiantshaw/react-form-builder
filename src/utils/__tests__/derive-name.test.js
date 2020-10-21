import deriveName from "../derive-name";

describe("deriveName()", function() {
  it("returns empty string on empty input array", function() {
    expect(deriveName([])).toBeUndefined();
  });

  it("returns first element if array consists of one element", function() {
    expect(deriveName(["only"])).toEqual("only");
  });

  it("returns hash like name for two elements", function() {
    expect(deriveName(["first", "second"])).toEqual("first[second]");
  });

  it("returns hash like name for more than one elements", function() {
    expect(deriveName([
      "first", "second", "third"
    ])).toEqual("first[second][third]");
  });

  it("surrounds with empty square brackets for null elements", function() {
    expect(deriveName([
      "first", "second", null, "third"
    ])).toEqual("first[second][][third]");
  });
});
