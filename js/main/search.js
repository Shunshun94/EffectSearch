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


(function(){
	var search = com.hiyoko.dx3.search.Search;
	var defaultAlgorithm = com.hiyoko.dx3.search.Search.DefaultAlgorithm;
	
	search.prototype.parseInput = function(input){
		return [input];
	};
	
	search.prototype.getSearchAlogrithm = function(input){
		return new defaultAlgorithm(this.index, this.json);
	};
	
	search.prototype.search = function(input){
		var parsedInput = this.parseInput(input);
		return this.searchByParsedInputs(parsedInput);
	};
	
	search.prototype.searchByParsedInputs = function(parsedInputs){
	  var resultList = [];
	  var len = parsedInputs.length;
	  var algorithm;
	  for(var i = 0; i < len; i++){
	    algorithm = this.getSearchAlogrithm(parsedInputs[i]);
	    resultList = resultList.concat(algorithm.search(parsedInputs[i]));
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
	
	
})();