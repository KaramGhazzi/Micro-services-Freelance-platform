# Stripe

## Download stripe cli

Go to:

    https://github.com/stripe/stripe-cli/releases/latest

and download the latest tar.gz for linux or osx.
Also download the stripe-linux-checksums.txt file.

Run:

    sha256sum stripe_x.x.x_linux_x86_64.tar.gz

To check if the file is not tampered with.

Now run:

    tar xvf stripe_x.x.x_linux_x86_64.tar.gz

and then move `stripe` to a directory in the path (like /usr/local/bin)

## Testing with stripe locally

Run:

    stripe login

This will show a pairing code in the cli, and a url to accept the login.

Note:

`stripe login` might hang on WSL, in that case find the gnome-keyring-daemon and kill it.

    ps -ef | grep gnome-keyring-daemon
    kill -9 <process_id>

I needed to do this on every `stripe login` or `stripe trigger ...` so I renamed the gnome-keyring-daemon bin to gnome-keyring-daemon-disabled.

!!! Only do this on WSL !!!

To start testing with stripe run:

    stripe listen --forward-to localhost:3008/webhook/stripe &
    stripe trigger customer.subscription.deleted

## Stripe api key

Get the stripe api key on https://dashboard.stripe.com/test/apikeys
For production on https://dashboard.stripe.com/apikeys

## Stripe webhooks

See/edit the webhooks on https://dashboard.stripe.com/test/webhooks
For production on https://dashboard.stripe.com/webhooks

## References

https://stripe.com/docs/stripe-cli
https://dashboard.stripe.com/apikeys
https://dashboard.stripe.com/webhooks

# LaunchDarkly

## Endpoints

**GET /feature-flags/{FLAG_KEY}/{ACTION}**

**FLAG_KEY**: the unique key from LaunchDarkly, currently available keys:

- `coc_enabled`
- `stripe_enabled`
- `talkjs_enabled`
- `login_enabled`
- `textkernel_enabled`

**ACTION**: Action indicating if you want to turn the feature flag on or off

- `turnFlagOn`
- `turnFlagOff`

## Environment Variables

```
LAUNCH_DARKLY_SDK_KEY=
LAUNCH_DARKLY_ENVIRONMENT_KEY=test // Either test or production
```

## Flag keys

Flag keys are a bit tricky to find. Easiest way is to follow the following steps:

1. Login to LaunchDarkly
2. Go to `Flags`
3. Select the feature flag you want get the key for
4. The flag key is in the url, e.g. for COC enabled (coc_enabled) `https://app.launchdarkly.com/projects/default/flags/coc_enabled/targeting?env=test&selected-env=test`
