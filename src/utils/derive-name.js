function deriveName(names) {
  const [startName, ...remainingNames] = names;

  return remainingNames.reduce(function(acc, name) {
    return acc + '[' + (name || '') + ']';
  }, startName);
}

export default deriveName;
