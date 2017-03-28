const fetch = require('./utils/fetch.js')
const parser = require('./utils/parser.js')
const format = require('./utils/format.js')
const notify = require('./utils/notify.js')
const Cache = require('./utils/cache.js')
const CronJob = require('cron').CronJob

const cache = new Cache()
const CHANNEL = process.env.CHANNEL

function app () {
  fetch().then((repos) => {
    // 1. Take the latest five repos
    const recentFive = repos.slice(0, 5)
    const { updatedCache, notificationPayload } = cache.compare(recentFive)
    cache.overwrite(updatedCache)

    const text = notificationPayload
    .map(parser)
    .reduce(format.message, 'List of the 5 last updated repos :grin::')

    const hasNotificationPayload = notificationPayload.length > 0

    notify({
      channel: `#${CHANNEL}`,
      username: 'alextanhongpin :taxi:',
      text: hasNotificationPayload ? text : ':ghost: No new updates',
      icon_emoji: ':ghost:'
    }).then((data) => {
      console.log('Successfully sent Slack notification')
    }).catch((error) => {
      console.log('Error:', error)
    })
  }).catch((error) => {
    console.log('Error:', error)
  })
}

console.log('Started!', format.date(Date.now()))

const job = new CronJob('00 */5 * * * *', function() {
  console.log('You will see this message every 5 minutes', format.date(Date.now()));
  app({
    cache: cache
  })
}, null, false, 'Asia/Kuala_Lumpur');

job.start()
