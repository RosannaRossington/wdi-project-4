var rp       = require("request-promise");
var cheerio  = require("cheerio");
var config   = require("../config/config");

module.exports = {
  netaporter: netaporter
};

function netaporter(req, res) {
  console.log(req.body.url);
  return rp(req.body.url)
    .then(function(body) {
      var $ = cheerio.load(body);
      var text;
      $("ul.font-list-copy li").each(function() {
        if ($(this).toString().indexOf("%") > -1) text = $(this).text();
      });
      return res.send({text: text});
    })
    .catch(function(err) {
      return res.status(500).send(err);
    });
}
