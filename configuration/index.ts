export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/tzone-preprod',
  url: process.env.URL || 'https://tzone-nestjs-api.herokuapp.com',
  google: {
    clientID: '323001319546-j6m0v91j77ddrtfip1g35pfe156ep28i.apps.googleusercontent.com',
    clientSecret: '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',
  },
  stripe: {
    apiKey:
      'sk_test_51KecUhKqReWVVYaHZK3u9truXfQOLq0NDHWJbkJygwAzdq4CiMawh1jetoe1GJOl6tUK9Z4FWbvQgHb0qX3XB1Xy00R904zkVB',
  },
});
