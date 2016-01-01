var com = com || {};
com.hiyoko = com.hiyoko || {};
com.hiyoko.dx3 = com.hiyoko.dx3 || {};
com.hiyoko.dx3.search = com.hiyoko.dx3.search || {};

com.hiyoko.dx3.search.Search = function(index, json){
	this.index = index;
	this.json = json;
};

com.hiyoko.dx3.search.Search.DefaultAlgorithm = function(index, json){
	this.index = index;
	this.json = json;
};

com.hiyoko.dx3.search.Search.SyndromeAlgorithm = function(syndromes, json){
	this.list = syndromes.replace("[syndrome]","").split(",");
	this.json = json;
};

com.hiyoko.dx3.search.Search.SkillAlgorithm = function(skills, json){
	this.list = skills.replace("[skill]","").split(",");
	this.json = json;
};

com.hiyoko.dx3.search.Search.EmptyAlgorithm = function(){};

(function(){
	var search = com.hiyoko.dx3.search.Search;
	var defaultAlgorithm = com.hiyoko.dx3.search.Search.DefaultAlgorithm;
	var emptyAlgorithm = com.hiyoko.dx3.search.Search.EmptyAlgorithm;
	var syndromeAlgorithm = com.hiyoko.dx3.search.Search.SyndromeAlgorithm;
	var skillAlgorithm = com.hiyoko.dx3.search.Search.SkillAlgorithm;
	
	search.prototype.parseInput = function(input){
		var returnList = [];
		var tempList = com.hiyoko.dx3.search.EffectUtil.adjustInputs(input).split(" ");
		var syndromes = [];//"[syndrome]";
		var skills = []; //"[skill]"
		
		$.each(tempList, function(ind, val){
			if(com.hiyoko.dx3.search.EffectUtil.Syndromes.includes(val)){
				syndromes.push(val);
			} else if(com.hiyoko.dx3.search.EffectUtil.Skills.includes(val)) {
				skills.push(val);
			} else if(com.hiyoko.dx3.search.EffectUtil.Skills.includes("〈"+val+"〉")) {
				skills.push("〈"+val+"〉");
			} else {
				returnList.push(val);
			}
		});
		
		if(syndromes.length !== 0){
			returnList.push("[syndrome]" + syndromes.join());
		}
		if(skills.length !== 0){
			returnList.push("[skill]" + skills.join());
		}
		return returnList;
	};
	
	search.prototype.getSearchAlogrithm = function(input){
		if(input === ""){
			return new emptyAlgorithm();
		}
		
		if(input.startsWith("[syndrome]")){
			return new syndromeAlgorithm(input, this.json);
		}
		
		if(input.startsWith("[skill]")){
			return new skillAlgorithm(input, this.json);
		}
		
		return new defaultAlgorithm(this.index, this.json);
	};
	
	search.prototype.search = function(input){
		var parsedInput = this.parseInput(input.trim());
		return this.searchByParsedInputs(parsedInput);
	};
	
	search.prototype.searchByParsedInputs = function(parsedInputs){
	  var len = parsedInputs.length;
	  var algorithm = this.getSearchAlogrithm(parsedInputs[0]);
	  var resultList = algorithm.search(parsedInputs[0]);
	  for(var i = 1; i < len; i++){
	    algorithm = this.getSearchAlogrithm(parsedInputs[i]);
	    resultList = algorithm.apply(resultList,algorithm.search(parsedInputs[i]));
	  }
	  return resultList;
	};
	
	search.prototype.listToEffects = function(list){
		var result = [];
		
		for(var i = 0; i < list.length; i++){
			result.push(this.json[list[i]]);
		}
		return result;
	};
	
	search.prototype.eachEffects = function(list, act){
		for(var i = 0; i < list.length; i++){
			act(this.json[list[i]]);
		}
	};
	
	defaultAlgorithm.prototype.apply = function(base, searchResult){
		return _.intersection(base, searchResult);
	};
	
	defaultAlgorithm.prototype.search = function(input){
		return this.searchByWord(input);
	};
	
	defaultAlgorithm.prototype.searchByWord = function(word){
		var list = this.index[word];
		if(! list){
			return [];
		}
		return list;
	};
	
	emptyAlgorithm.prototype.apply = function(base, searchResult){
		return base;
	};
	
	emptyAlgorithm.prototype.search = function(input){
		return [];
	};
	
	syndromeAlgorithm.prototype.apply = function(base, searchResult){
		var self = this;
		return base.filter(function(ind){
			return self.list.includes(self.json[ind].syndrome);
		});
	};
	
	syndromeAlgorithm.prototype.search = function(input){
		return [];
	};
	
	skillAlgorithm.prototype.apply = function(base, searchResult){
		var self = this;
		var len = this.list.length;
		return base.filter(function(ind){
			for(var i = 0;  i < len; i++){
				if((com.hiyoko.dx3.search.SkillEnum[self.list[i]] & self.json[ind].skill) > 0){
					return true;
				}
			}
			return false;
		});
	};
	
	skillAlgorithm.prototype.search = function(input){
		return [];
	};
	
	
})();