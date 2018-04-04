//to use this script, to rebuild penndata.json, download the .dp dependency files from
// http://www.nltk.org/nltk_data/
// and put them in ./raw_data
// then run node build.js > ./penn-data.json
const shell = require('shelljs');
const fs = require('fs');
shell.cd('raw_data')
let sentences = [[]]

const skip = {
  ',': true,
  '.': true,
  '?': true,
  '!': true,
  ':': true,
  ';': true,
  '%': true,
  // "``": true,
  "''": true,
  "n't": true,
  "'re": true,
  "'s": true,
  "'m": true,
  "'d": true,
}

shell.ls('*.dp').forEach(function(file) {
  let txt = fs.readFileSync(file).toString()
  let lines = txt.split('\n')
  let pending = null
  for (let i = 0; i < lines.length; i += 1) {
    let line = lines[i].split(/\t/)

    if (line[0] === '') {
      sentences.push([])
    } else if (line[1] === '$' || line[1] === '``') {
      pending = line[1]
    } else if (skip.hasOwnProperty(line[0]) === true || line[1] === 'POS') { //put these on previous word
      let s = sentences[sentences.length - 1]
      if (s.length > 0) {
        s[s.length - 1][0] += line[0]
      }
    } else {
      if (pending !== null) {
        line[0] = pending + line[0]
        pending = null
      }
      sentences[sentences.length - 1].push(line)
    }
  }
});
sentences.pop()

sentences = sentences.map((s) => {
  let text = []
  let tags = []
  s.forEach((w) => {
    w[0] = w[0].replace('\\/', '/')
    text.push(w[0])
    tags.push(w[1])
  })
  return [
    text.join(' '),
    tags
  ]
})
//file-size efficient storage
console.log('[')
sentences.forEach((s) => {
  console.log(JSON.stringify(s, null, 0), ',')
})
console.log(']')
