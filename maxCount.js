let string =
  'SAMple Strin""g: !@# Yolo ~`\'>>>>>?????????}}⚔️}}}}}}}}}}}}}{}{}{}:"';
let jstring =
  "SAMple文字列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列列v：！@＃Yolo 00000000000432〜 `'>> >>>?????????}}⚔️}}}}}}}}}}}}}{} {} {}：\"";
let gjstring =
  "સેમ્પલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલલ સ્ટ્રિંગ: !@# યોલો 00000000000432 ~`'>>>>????????????}}⚔️}}}}}}}}}}}}{}{}{}:\"";
function maxCount(str) {
  let characters = {};
  for (let index in str) {
    if (str[index] === " ") continue;
    if (str[index] in characters) {
      characters[str[index]] += 1;
    } else {
      characters[str[index]] = 1;
    }
  }
  const a = Object.entries(characters).reduce(
    (acc, current) => {
      if (current[1] > acc[1]) return current;
      return acc;
    },
    ["", 0]
  );
  return a;
}

function maxCount1(str) {
  let characters = {};
  characters.top = ["", 0];
  for (let index in str) {
    if (str[index] === " ") continue;
    if (str[index] in characters) {
      characters[str[index]] += 1;
      if (characters[str[index]] > characters.top[1])
        characters.top = [str[index], characters[str[index]]];
    } else {
      characters[str[index]] = 1;
      if (characters.top[0] === "") characters.top = [str[index], 1];
    }
  }
  return characters.top;
}

let start = Date.now();
console.log(maxCount1(jstring));
let end = Date.now();
console.log(`Time taken by maxCount1: ${end - start}ms`);
start = Date.now();
console.log(maxCount(jstring));
end = Date.now();
console.log(`Time taken by maxCount: ${end - start}ms`);
