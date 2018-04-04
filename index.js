var sentences = require('./penn-data')
var tagMap = require('./tagset-map')
//re-map their tags to our compromise ones
sentences = sentences.map((arr) => {
  var tags = arr[1].map((tag) => tagMap[tag] || tag)
  return {
    text: arr[0],
    tags: tags
  }
})
module.exports = sentences


console.log(sentences[896])
