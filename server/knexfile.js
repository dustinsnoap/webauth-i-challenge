module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/auth1.sqlite3'
    },
    useNullAsDefault: true,
  },
}
