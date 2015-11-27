var com = com || {};
com.hiyoko = com.hiyoko || {};
com.hiyoko.dx3 = com.hiyoko.dx3 || {};
com.hiyoko.dx3.search = com.hiyoko.dx3.search || {};
com.hiyoko.dx3.search.util = com.hiyoko.dx3.search.util || {};

com.hiyoko.dx3.search.util.ngram = function(words, max){
  // See http://hideack.hatenablog.com/entry/2014/12/15/205149
  var i;
  var grams = [];

  for(i=0; i<=words.length-max; i++) {
    grams.push(words.substr(i, max).toLowerCase());
  }

  return grams;
};

com.hiyoko.dx3.search.util.ngrams = function(words, min, max){
  var grams = [];
  for(var i = min; i <= max; i++){
    grams = grams.concat(com.hiyoko.dx3.search.util.ngram(words, i));
  }
  return grams;
};

com.hiyoko.dx3.search.util.makeIndex = function(effectCsv, opt_length){
  var maxLength = opt_length || 14;
  var csvlines = effectCsv.split('\n');
  
  var result = {};
  
  $.each(csvlines, function(ind, csvline){
    csvline = csvline.trim();
    if(csvline === ""){return};
    var csvValues = csvline.split(',');
    var ngrams = com.hiyoko.dx3.search.util.ngrams(csvValues[0], 2, maxLength).concat(com.hiyoko.dx3.search.util.ngrams(csvValues[11], 2, maxLength));
    com.hiyoko.dx3.search.util.indexing(ind, ngrams, result);
  });
  
  return result;
};


com.hiyoko.dx3.search.util.indexing = function(no, ngrams, referenceIndex){
  ngrams.forEach(function(gram, index, array) {
    var postingList;

    if (referenceIndex[gram]) {
      postingList = referenceIndex[gram];
    } else {
      postingList = [];
    }
    postingList.push(no);
    referenceIndex[gram] = postingList;
  });
};

com.hiyoko.dx3.search.util.generateInvertedIndex = function(csv){
  var result = com.hiyoko.dx3.search.util.makeIndex(csv);
  for(var gram in result){
    result[gram] = result[gram].filter(function (x, i, self) {
      return self.indexOf(x) === i;
    });
  }
  return result;
}

com.hiyoko.dx3.search.util.generateJson = function(csv){
  var result = "[\n";
  var csvlines = csv.split('\n');
  $.each(csvlines, function(ind, csvline){
    csvline = csvline.trim();
    if(csvline === ""){return};
    var line = '   {name:"${WORD1}", syndrome:"${WORD2}", maxLv:${WORD3}, timing:"${WORD4}", skill:"${WORD5}", difficulty:"${WORD6}", target:"${WORD7}", range:"${WORD8}", cost:"${WORD9}", limit:"${WORD10}", reference:"${WORD11}", detail:"${WORD12}"},';
    var csvValues = csvline.split(',');
    $.each(csvValues, function(i, value){
      line = line.replace('${WORD'+(i+1)+'}', value);
    });
    result += line + '\n';
  });
  result += "]";
  return result;
}

