var com = com || {};
com.hiyoko = com.hiyoko || {};
com.hiyoko.dx3 = com.hiyoko.dx3 || {};
com.hiyoko.dx3.search = com.hiyoko.dx3.search || {};
com.hiyoko.dx3.search.EffectUtil = com.hiyoko.dx3.search.EffectUtil || {};

com.hiyoko.dx3.search.EffectUtil.EffectToTable = function(effect){
	var table = $("<table class='effect-search-search-result-effect'></table>");
	table.append("<caption>"+effect.name+"<hr/></caption>");
	table.append("<tr><td>最大レベル</td><td colspan='3'>"+effect.maxLv+"</th></tr>");
	table.append("<tr><td>タイミング</td><td colspan='3'>"+effect.timing+"</th></tr>");
	table.append("<tr><td>技能</td><td>"+com.hiyoko.dx3.search.EffectUtil.skillToText(effect.skill)+
			     "</td><td>難易度</td><td>"+ effect.difficulty+"</td></tr>");
	table.append("<tr><td>対象</td><td>"+effect.target+"</td><td>射程</td><td>"+ effect.range+"</td></tr>");
	table.append("<tr><td>侵蝕率</td><td>"+effect.cost+"</td><td>制限</td><td>"+ effect.limit+"</td></tr>");
	table.append("<tr><td class='effect-search-search-result-effect-detail' colspan='4'>"+effect.detail+"</td></tr>");
	return table;
};

com.hiyoko.dx3.search.EffectUtil.skillToText = function(skillNum){
	console.log(skillNum);
	if(skillNum === 4096){
		return "-";
	}
	
	if(com.hiyoko.dx3.search.EffectUtil.matchSkill(skillNum,"シンドローム")){
		return "シンドローム"
	}
	var result = [];
	$.each(["【肉体】","【感覚】","【精神】","【社会】"], function(i, v){
		if(com.hiyoko.dx3.search.EffectUtil.matchSkill(skillNum, v)){
			result.push(v);
		}
	});
	if(result.length > 0){
		return result.join("/");
	}
	$.each(["〈白兵〉","〈回避〉","〈運転〉",
	        "〈射撃〉","〈知覚〉","〈芸術〉",
	        "〈RC〉","〈意志〉","〈知識〉",
	        "〈交渉〉","〈調達〉","〈情報〉"], function(i, v){
		if(com.hiyoko.dx3.search.EffectUtil.matchSkill(skillNum,v)){
			result.push(v);
		}
	});
	return result.join("/");
	
	
};

com.hiyoko.dx3.search.EffectUtil.matchSkill = function(skillNum, text){
	console.log(text + ":" + (skillNum & com.hiyoko.dx3.search.SkillEnum[text]));
	return (com.hiyoko.dx3.search.SkillEnum[text] === (skillNum & com.hiyoko.dx3.search.SkillEnum[text]));
};
	