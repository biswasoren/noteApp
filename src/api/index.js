const register = require('./register');
const note = require('./note');
const health = require('./health');

export default function (app) {
    app.use('/api/register', register);
    app.use('/api/note', note);
    app.use('/api/health', health);
}