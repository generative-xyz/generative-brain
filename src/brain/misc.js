function zip(rows) {
  return rows[0].map((_, i) => rows.map(row => row[i]));
}

function clone(items) {
  return items.map(item => Array.isArray(item) ? clone(item) : item);
}

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  return floor(random(min, max)); 
}

function getRandomItem(items) {
  let tot = 0;
  for(const e of items) {
    tot += e[1];
  }

  let x = random(tot);
  let sum = 0;
  for(const e of items) {
    sum += e[1];
    if (x < sum) return e[0];
  }
  return null;
}

function shuffle(arr) {
  for(let i = 1; i < arr.length; ++i) {
    let j = getRandomInt(0, i);
    let t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
}

function isNullOrEmpty(str) {
  return str == null || str === '';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getClosestDivisibleFraction(a, b, x0) {
  let res = 0;
  for(let p = 1; p <= 1000; ++p) {
    for(let q = 1; q <= 1000; ++q) {
      // a/b divisible by p/q => a*q divisible by b*p 
      if ((a*q)%(b*p) == 0) {
        let x = 1.0 * p / q;
        if (abs(x - x0) < abs(res - x0)) {
          res = x;
        }
      }
    }
  }
  return res;
}

function getLocalTimeStr() {
  let offset = new Date().getTimezoneOffset() * 60 * 1000;
  return new Date(Date.now() - offset).toISOString().slice(0, -1);
}