import siteConfig from '@generated/docusaurus.config';

export function getEnv() {

  return {
    apiKey: siteConfig.customFields.REACT_APP_FIREBASE_API_KEY as string,
    authDomain: siteConfig.customFields.REACT_APP_FIREBASE_AUTH_DOMAIN as string,
    projectId: siteConfig.customFields.REACT_APP_FIREBASE_PROJECT_ID as string,
    storageBucket: siteConfig.customFields.REACT_APP_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: siteConfig.customFields.REACT_APP_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: siteConfig.customFields.REACT_APP_FIREBASE_APP_ID as string,
    measurementId: siteConfig.customFields.REACT_APP_FIREBASE_MEASUREMENT_ID as string,
  };
}
