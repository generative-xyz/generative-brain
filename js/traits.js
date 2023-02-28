const AgingSpeed = [
  ['Year', 1/3, 365.0 / 365.0],
  ['Month', 1/3, 365.0 / 30],
  ['Week', 1/3, 365.0 / 7],
];

const BirthDate = [
  ['Testing 1', 1/3, new Date('1960/01/01')],
  ['Testing 2', 1/3, new Date('1980/01/01')],
  ['Testing 3', 1/3, new Date('2000/01/01')],
];  

function getTraits() {
  const agingSpeed = getRandomItem(AgingSpeed);
  const birthDate = getRandomItem(BirthDate);

  const traits = {
    agingSpeed,
    birthDate,
  };

  console.log(traits);

  return traits;  
}