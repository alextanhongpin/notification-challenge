const request = require('request')
const fs = require('fs')

// Sort has a few options
// But pushed and updated is different
const options = {
  url: 'https://api.github.com/users/alextanhongpin/repos?type=all&sort=pushed&direction=desc',
  // Github API requires a user-agent :D
  headers: {
    'User-Agent': 'request'
  }
}

request(options, (error, response, body) => {
  console.log(typeof body)
  const jsonResponse = JSON.parse(body)

  fs.writeFile('./data.json', body, (err) => {
  	console.log(err)
  })
  console.log('First', jsonResponse[0])
  console.log('Last', jsonResponse[jsonResponse.length - 1])
})
