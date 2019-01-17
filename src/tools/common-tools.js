function makeIdEnding() {
  let text = "-";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return new Date().getTime() + text;
}

function getNormalizedAttributeArray(str) {
  return str.toLowerCase().split(/\s+|[,.]+/);
}

export { getNormalizedAttributeArray, makeIdEnding };
