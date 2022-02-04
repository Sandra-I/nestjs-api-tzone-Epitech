const credentials = {
    DB_CONN_USER: "tzone_user",
    DB_CONN_PASSWORD: "6e09f35e336fcc8ee312aa15f35e773a5680eebe239d89068d86eb958fa8a695",
}

export default {
    DB_CONN_STRING: `mongodb+srv://${credentials.DB_CONN_USER}:${credentials.DB_CONN_PASSWORD}@yamikamisama.fr:27018`,
    DB_NAME: "TZone-dev"
}