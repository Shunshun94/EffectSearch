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
    var ngrams = com.hiyoko.dx3.search.util.ngrams(csvValues[0], 2, maxLength)
    	.concat(com.hiyoko.dx3.search.util.ngrams(csvValues[11], 2, maxLength));
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

com.hiyoko.dx3.search.util.skillToNumber = function(skills){
	var skillList = skills.split("/");
	var result = 0;
	if(skillList[0] === "-" || skillList[0] === "-"){
		return com.hiyoko.dx3.search.SkillEnum["other"];
	}
	
	$.each(skillList, function(i, v){
		result += com.hiyoko.dx3.search.SkillEnum[v];
	});
	return result;
};

com.hiyoko.dx3.search.util.baseSkillToNumber = function(values){
	var skillList = values[4].split("/");
	var result = 0;

	if(skillList[0] === "-"){
		return com.hiyoko.dx3.search.SkillEnum["other"];
	}
	
	var regResult = com.hiyoko.dx3.search.util.baseSkillToNumber.reg.exec(values[11]);
	if(regResult){
		result = com.hiyoko.dx3.search.SkillEnum[skillList[0]] + com.hiyoko.dx3.search.SkillEnum["other"];
	}
	
	$.each(skillList, function(i, v){
		var test = com.hiyoko.dx3.search.SkillEnum[v];
		if(test & com.hiyoko.dx3.search.SkillEnum["【肉体】"]){
			result += com.hiyoko.dx3.search.SkillEnum["【肉体】"];
		}
		if(test & com.hiyoko.dx3.search.SkillEnum["【感覚】"]){
			result += com.hiyoko.dx3.search.SkillEnum["【感覚】"];
		}
		if(test & com.hiyoko.dx3.search.SkillEnum["【精神】"]){
			result += com.hiyoko.dx3.search.SkillEnum["【精神】"];
		}
		if(test & com.hiyoko.dx3.search.SkillEnum["【社会】"]){
			result += com.hiyoko.dx3.search.SkillEnum["【社会】"];
		}	
	});
	return result;
};

com.hiyoko.dx3.search.util.baseSkillToNumber.reg = new RegExp("このエフェクトを組み合わせた判定は(【..】)で判定を行な?える");

com.hiyoko.dx3.search.util.generateJson = function(csv){
  var result = []
  var csvlines = csv.split('\n');
  $.each(csvlines, function(ind, csvline){
    csvline = csvline.trim();
    if(csvline === ""){return};
    var values = csvline.split(",");
    result.push(JSON.stringify({
    	name:values[0],
    	syndrome:values[1],
    	maxLv:values[2],
    	timing:values[3],
    	skill:com.hiyoko.dx3.search.util.skillToNumber(values[4]),
    	baseSkill:com.hiyoko.dx3.search.util.baseSkillToNumber(values),
    	difficulty:values[5],
    	target:values[6],
    	range:values[7],
    	cost:values[8],
    	limit:values[9],
    	reference:values[10],
    	detail:values[11]
    }));
  });
  return result;
}

