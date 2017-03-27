// parser.js
//
// Utility to parse the response from Github api
const moment = require('moment')

module.exports = function parseRepo (repo) {
  return {
    id: repo.id,
    name: repo.name,
    html_url: repo.html_url,
    last_updated: moment(repo.pushed_at).calendar()
  }
}