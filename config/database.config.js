module.exports = {
    url: 'mongodb://localhost/notes',
    options: {
        poolsize: 20,
        db: {
          safe: true,
        },
        useNewUrlParser: true,
      },
}