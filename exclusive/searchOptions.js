var com = com || {};
com.hiyoko = com.hiyoko || {};
com.hiyoko.dx3 = com.hiyoko.dx3 || {};
com.hiyoko.dx3.search = com.hiyoko.dx3.search || {};
com.hiyoko.dx3.search.option = com.hiyoko.dx3.search.option || {};

com.hiyoko.dx3.search.option.OptionBox = function(elementId, title, values, opt_singleSelect) {
	this.values = values;
	this.elementId = elementId;
	this.title = title;
	this.isSingleSelect = opt_singleSelect || false;

	this.decorate($("#" + elementId));
	this.eventBind();

};

com.hiyoko.dx3.search.option.OptionBox.prototype.decorate = function($elem) {
	$elem.addClass("effect-search-search-options-OptionBox");
	
	var title = this.title;
	var $base = $("<div></div>");
	$elem.append("<h3><span>▼</span>" + title + "</h3>");
	
	if(this.isSingleSelect){
		$.each(this.values, function(i, value){
			$base.append("<input type='radio' name='" + title + "' value='" + value + "'/>" + value + "<br/>");
		});
	} else {
		$.each(this.values, function(i, value){
			$base.append("<input type='checkbox' value='" + value + "'/>" + value + "<br/>");
		});
	}
	$elem.append($base);
};

com.hiyoko.dx3.search.option.OptionBox.prototype.eventBind = function() {
	$("#"+this.elementId+">h3>span").click(function(e){this.toggle(e)}.bind(this));
};

com.hiyoko.dx3.search.option.OptionBox.prototype.getValue = function(){
	var result = [];
	$.each($("#"+this.elementId+">div>input:checked"), function(i, v){
		result.push($(v).val());
	})
	return result.join(" ");
};

com.hiyoko.dx3.search.option.OptionBox.prototype.toggle = function(e){
	if($(e.target).text() === "▼"){
		$(e.target).text("▲");
	}else {
		$(e.target).text("▼");
	}
	$("#"+this.elementId+">div").toggle(300);
};




