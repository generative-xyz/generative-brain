const GrowthRate = [
  ['Year', 1/3, 365.0 / 365.0],
  ['Month', 1/3, 365.0 / 30],
  ['Week', 1/3, 365.0 / 7],
];

const BirthYear = [
  ['1943', 1/3],
  ['1951', 1/3],
  ['1957', 1/3],
  ['1969', 1/3],
  ['1970', 1/3],
  ['1980', 1/3],
  ['1982', 1/3],
  ['1986', 1/3],
  ['1988', 1/3],
  ['1997', 1/3],
  ['1998', 1/3],
  ['2002', 1/3],
  ['2009', 1/3],
  ['2012', 1/3],
  ['2014', 1/3],
  ['2015', 1/3],
  ['2016', 1/3],
  ['2023', 1/3],
];

function getTraits() {
  const growthRate = getRandomItem(GrowthRate);
  const birthYear = getRandomItem(BirthYear);

  const traits = {
    growthRate,
    birthYear,
  };

  console.log(traits);

  return traits;  
}