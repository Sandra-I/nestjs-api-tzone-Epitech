const credentials = {
    DB_CONN_USER: "TZone-user-preprod",
    DB_CONN_PASSWORD: "9d8e4520e29a59b7016400b6ba131816a5373fc94e3503d602908f21d5487f87",
}

export default {
    DB_CONN_STRING: `mongodb+srv://${credentials.DB_CONN_USER}:${credentials.DB_CONN_PASSWORD}@yamikamisama.fr:27018`,
    DB_NAME: "TZone-Preprod"
}