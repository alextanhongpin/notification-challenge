// fetch.js
// 
// Utility to fetch the last updated repos from Github.com

const request = require('request')

const TYPE = {
  ALL: 'all',
  OWNER: 'owner',
  MEMBER: 'member'
}

const SORT = {
  CREATED: 'created',
  UPDATED: 'updated',
  PUSHED: 'pushed',
  FULL_NAME: 'full_name'
}
const DIRECTION = {
  ASC: 'asc',
  DESC: 'desc'
}

const GITHUB_USERNAME = process.env.GITHUB_USERNAME

module.exports = function fetch () {
  const options = {
    // url: `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=${TYPE.ALL}&sort=${SORT.PUSHED}&direction=${DIRECTION.DESC}`,
    url: 'https://api.github.com/repositories',
    // Github API requires a user-agent :D
    headers: {
      'User-Agent': 'request'
    }
  }
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      error ? reject(error) : resolve(JSON.parse(body))
    })
  })
}