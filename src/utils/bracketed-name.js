function BracketedName(resource) {
  this.attributeName = resource;
}

BracketedName.prototype.add = function(attribute) {
  this.attributeName += '[' + attribute + ']';
}

BracketedName.prototype.collected = function() {
  this.attributeName += "[]";
}

BracketedName.prototype.toString = function() {
  return this.attributeName;
}

export default BracketedName;
