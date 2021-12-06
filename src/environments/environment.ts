// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  useEmulators: true,
  firebase: {
    apiKey: "AIzaSyB-rmzkgVtmH0yBPtCcow1qCGVYHnUFkfk",
    authDomain: "ang-univ-firebase-course.firebaseapp.com",
    projectId: "ang-univ-firebase-course",
    storageBucket: "ang-univ-firebase-course.appspot.com",
    messagingSenderId: "358384793732",
    appId: "1:358384793732:web:062d31a879454fa5f2aad1"
  },
  api: {

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
