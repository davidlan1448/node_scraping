const cherrio = require('cheerio');

const configUrl = function (url) {
    return {
        uri: url,
        transform: function (body) {
            return cherrio.load(body, {
                withDomLvl1: true,
                normalizeWhitespace: false,
                xmlMode: false,
                decodeEntities: true
            });
        }
    }
}

module.exports = { configUrl };
