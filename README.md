This is taken from the seek-asia [https://github.com/seekasia/notification-challenge](notification-challenge). 

The solution written with `golang` can be found [https://github.com/alextanhongpin/notification-challenge-golang](here). 

This is an interesting problem and can be solved using functional programming.

# Problem:

You are the new member of SEEKAsia technical team, and your first task is to build a system that work as the following: Every 30 minutes it runs and calls github API to get the latest 5 updated repos and show this feed in Slack channel via Slack incoming webhook.

However, there are few things to consider:

Duplications are not allowed, you can't feed the same repo that you sent to webhook previously.
You need to customize the displayed name and the icon of the webhook to be showing your full name and any picture you choose.
You can invite yourself to SEEKAsia slack channel that we have setup for testing.

Channel specific webhook url : https://hooks.slack.com/services/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