var com = com || {};
com.hiyoko = com.hiyoko || {};
com.hiyoko.dx3 = com.hiyoko.dx3 || {};
com.hiyoko.dx3.search = com.hiyoko.dx3.search || {};

com.hiyoko.dx3.search.Search = function(index, json){
	this.index = index;
	this.json = json;
};

(function(){
	var search = com.hiyoko.dx3.search.Search;
	
	search.prototype.searchByWord = function(word){
		var list = this.index[word];
		if(! list){
			return [];
		}
		return list;
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
	
	
	
})();