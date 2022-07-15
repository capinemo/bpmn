const { SendEmail } = require('./SendEmail') ;
const { SendEmailDraw } = require("./SendEmailDraw");

module.exports = {
  __init__: [ 'SendEmail'],
  SendEmail: [ 'type', SendEmail ],
  // SendEmailDraw: ['type', SendEmailDraw],
};
