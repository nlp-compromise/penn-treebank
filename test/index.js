const pennTreebank = require('../index')
const nlp = require('../../nlp-compromise/src')

function evaluateSentence(o, mistakes) {
  if (!o) {
    return null
  }
  let terms = nlp(o.text).terms().out('tags')
  //don't compare two differently-tokenized sentences
  if (terms.length !== o.tags.length) {
    return null
  }
  let results = {
    correct: 0,
    wrong: 0
  }
  for (let i = 0; i < terms.length; i += 1) {
    let wantTag = o.tags[i]
    if (!wantTag) {
      continue
    }
    if (terms[i].tags.includes(wantTag) === false) {
      // if (terms[i].text === 'if') { //more, who, of, a, if //'that'
      // console.log(terms[i].text, wantTag, terms[i].tags)
      // }
      results.wrong += 1
      mistakes[terms[i].normal] = mistakes[terms[i].normal] || 0
      mistakes[terms[i].normal] += 1
    } else {
      results.correct += 1
    }
  }
  return results
}

function doAll() {
  let mistakes = {}
  let results = {
    correct: 0,
    wrong: 0,
    null: 0
  }
  pennTreebank.forEach(function(s) {
    let result = evaluateSentence(s, mistakes)
    if (result === null) {
      results.null += 1
    } else {
      results.correct += result.correct
      results.wrong += result.wrong
    }
  })
  let total = results.correct + results.wrong
  results.percentage = (results.correct / total) * 100
  results.percentage = results.percentage.toFixed(1)

  mistakes = Object.keys(mistakes).map((k) => [k, mistakes[k]])
  mistakes = mistakes.sort((a, b) => {
    if (a[1] > b[1]) {
      return -1
    } else {
      return 1
    }
  })
  results.mostMistakes = mistakes.slice(0, 100)
  return results
}
console.log(doAll())
// console.log(pennTreebank[4])
// console.log(evaluateSentence(pennTreebank[4], {}))
