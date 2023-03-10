import * as OneSignal from '@onesignal/node-onesignal';

const configuration = OneSignal.createConfiguration({
    appKey: process.env.ONESIGNAL_KEY
});

const client = new OneSignal.DefaultApi(configuration);

client.createNotification;
