const register = require('./register');
const message = require('./message');

export default function (app) {
    app.use('/api/register', register);
    app.use('/api/message', message);
}