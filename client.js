// Use this for testing, don't need to fetch the data from the Github API
// all the time. Mock em!

const data = require('./data.json')

const latestFive = data.slice(0, 5)
console.log(latestFive[0].name, latestFive[4].name)

