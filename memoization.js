let cache = {};
function a(b, c, d) {
  let inCache = true;
  let cacheKey = Object.values(arguments).toString();
  let cacheValue = [];
  if (cacheKey in cache) {
    return cache[cacheKey];
  } else {
    inCache = false;
  }
  if (!inCache) {
    // Heavy Computation task
    for (let i = 0; i < 100; i++) {
      console.log(i);
    }
  }
  cacheValue = [b * 2, c + "b", !d];
  cache[cacheKey] = cacheValue;
  return cacheValue;
}

console.log(...a(4, "a", true));
console.log(...a(4, "a", true));
