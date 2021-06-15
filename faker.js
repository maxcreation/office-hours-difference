const faker = require('faker');
const fs = require('fs')

faker.locale = 'en_US'

const fileName = process.argv[2]
const limit = process.argv[3]

let result =  [];
do {
  result.push({
    city: faker.address.city(),
    country: faker.address.country()
  })
} while (result.length < limit)

console.log(result)
const json = JSON.stringify(result)

fs.writeFile(fileName, json, (error) => {
  if (error) throw error;
  console.log('File saved!');
})
