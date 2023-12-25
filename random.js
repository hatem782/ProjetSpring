function generateNameObjects(names) {
  const nameObjects = [];

  for (let i = 0; i < names.length; i++) {
    const nameObject = {
      name: names[i],
      number: Math.floor(Math.random() * 4) + 1,
    };

    nameObjects.push(nameObject);
  }

  return nameObjects;
}

const names = ["John", "Jane", "Mike", "Emily"];
const nameObjects = generateNameObjects(names);
console.log(nameObjects);
