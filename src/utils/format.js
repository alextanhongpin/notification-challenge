// format.js
//
// Formats the .json response to a slack message

// Format string to link
// e.g. Link('https://github.com', 'github')
function Link (href, alt) {
  return `<${href}|${alt}>`
}


function messageFormatter (text, repo) {
  text += `
    ${Link(repo.html_url, repo.name)} Last updated: ${repo.last_updated}.
  `
  return text
}

function dateFormatter (timestamp) {
  const obj = new Date(timestamp)
  const year = obj.getFullYear()
  const month = obj.getMonth()
  const date = obj.getDate()
  const hour = obj.getHours()
  const minute = obj.getMinutes() < 10 ? `0${obj.getMinutes()}`: obj.getMinutes()
  return `${year}-${month + 1}-${date} ${hour}:${minute}`
}

module.exports = {
  message: messageFormatter,
  date: dateFormatter
}