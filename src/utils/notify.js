// notify.js
//
// Webhook to send notification to slack

const IncomingWebhook = require('@slack/client').IncomingWebhook
const url = process.env.SLACK_WEBHOOK_URL
const webhook = new IncomingWebhook(url)


module.exports = function notify ({ channel, username, icon_emoji, text }) {
  return new Promise((resolve, reject) => {
    webhook.send({
      channel,
      username,
      text,
      icon_emoji
    }, (error, response) => {
      error ? reject(error) : resolve(response)
    })
  })
}
