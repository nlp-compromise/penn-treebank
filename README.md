a small sample of [PENN treebank](https://catalog.ldc.upenn.edu/ldc99t42) part-of-speech tagged english dataset, with tags from the nlp-compromise tagset.

simply a transformation of the fair-use subset of the Penn Treebank [by the NLTK library](http://www.nltk.org/nltk_data/), with cosmetic formatting changes for javascript-use.

This data is for non-commercial fair-use only, and all users are encouraged to [purchase a license](https://catalog.ldc.upenn.edu/LDC95T7) of the full dataset for any commercial projects.

data is (only) 4,000 tagged sentences, with [compromise tag-mappings](./tagset-map.js), and some opinionated lumping of punctuation, contractions, etc.

972kb uncompressed.

sample:
```js
{ text: 'Another OTC bank stock involved in a buy-out deal, First Constitution Financial, was higher.',
  tags:
   [ 'Determiner',
     'Noun',
     'Noun',
     'Noun',
     'Verb',
     'Preposition',
     'Determiner',
     'Noun',
     'Noun',
     'Noun',
     'Noun',
     'Noun',
     'Verb',
     'Comparative'
   ]
}
```

Original statement [in NLTK](http://www.nltk.org/nltk_data/):
```
Copyright (C) 1995 University of Pennsylvania;
This is a 10% fragment of Penn Treebank, (C) LDC 1995, which has been dependency parsed.
It is made available under fair use for the purposes of illustrating NLTK tools for tokenizing, tagging, chunking and parsing.
This data is for non-commercial use only.;
```

please [file an issue](https://github.com/nlp-compromise/penn-treebank/issues) if there are any copyright concerns in placing this on npm or github.
