import BracketedName from '../bracketed-name';

describe("BracketedName", function() {
  describe("add()", function() {
    it("adds a key to the bracketed name", function() {
      let bracketedName = new BracketedName("first");

      bracketedName.add("second");

      expect(bracketedName.toString()).toEqual("first[second]");
    });

    it("adds multiple keys to the bracketed name", function() {
      let bracketedName = new BracketedName("first");

      bracketedName.add("second");
      bracketedName.add("third");
      bracketedName.add("fourth")

      expect(bracketedName.toString()).toEqual("first[second][third][fourth]");
    });
  });

  describe("collected()", function() {
    it("marks the attribute name as a collection", function() {
      let bracketedName = new BracketedName("first");

      bracketedName.collected();

      expect(bracketedName.toString()).toEqual("first[]");
    });

    it("marks the attribute name as a nested collection", function() {
      let bracketedName = new BracketedName("first");

      bracketedName.collected();
      bracketedName.collected();
      bracketedName.collected();

      expect(bracketedName.toString()).toEqual("first[][][]");
    });
  });

  describe("toString()", function() {
    it("provides a string representation of the bracketed name", function() {
      let bracketedName = new BracketedName("first");

      bracketedName.add("second");
      bracketedName.collected();
      bracketedName.add("third");
      bracketedName.collected();
      bracketedName.collected();

      expect(bracketedName.toString()).toEqual("first[second][][third][][]");
    });
  });
});
