const InboundMail = require("./inboundMail.schema.js");

async function saveInboundMail(mailData) {
    return InboundMail.create(mailData);
}

module.exports = { saveInboundMail };