const moment = require('moment');

const formatMessage = (username, content) => {
    return {
        username,
        content,
        time: moment().format('h:mm a'),
    };
}

module.exports = formatMessage;
