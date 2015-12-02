var com = com || {};
com.hiyoko = com.hiyoko || {};
com.hiyoko.dx3 = com.hiyoko.dx3 || {};
com.hiyoko.dx3.search = com.hiyoko.dx3.search || {};

com.hiyoko.dx3.search.Combo = function(baseEffect){
	this.skill = baseEffect.skill;
	this.baseSkill = baseEffect.baseSkill;
	this.syndrome = [baseEffect.syndrome];
};

com.hiyoko.dx3.search.Combo.SYNDROME = 8192;

(function(){
	var combo = com.hiyoko.dx3.search.Combo;
	
	combo.prototype.isConnectable = function(effect){
		var isSyndrome = Boolean(effect.skill & combo.SYNDROME);
		if(isSyndrome){
			for(var i = 0; i < this.syndrome.length; i++){
				if(effect.syndrome === this.syndrome[i]){
					return true;
				} 
			}
			return false;
		}
		
		var isConnectable = Boolean(this.skill & effect.skill);
	
		return isConnectable;
	};
	
	
	
})();