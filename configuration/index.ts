export const configuration = () => ({
  NODE_ENV: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodbUri: process.env.MONGODB_URI,
  url: process.env.URL,
  google: {
    clientID: "323001319546-j6m0v91j77ddrtfip1g35pfe156ep28i.apps.googleusercontent.com",
    clientSecret: "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",
  },
  stripe: {
    apiKey: "pk_test_51KecUhKqReWVVYaH3ALIjDE3RA87qYYGqikQEZGxEYQLLcQTpQX1dAOCtDL5I4WicEltBWCtfR0Lw7SDdjaLLxPX00eOK0GssL"
  }


});