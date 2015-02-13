(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['metadata'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"todo-totals\">"
    + alias3(((helper = (helper = helpers.complete || (depth0 != null ? depth0.complete : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"complete","hash":{},"data":data}) : helper)))
    + " of "
    + alias3(((helper = (helper = helpers.total || (depth0 != null ? depth0.total : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"total","hash":{},"data":data}) : helper)))
    + " complete</div>\n";
},"useData":true});
templates['todo-complete'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<li id=\""
    + alias3(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\" class=\"complete\">"
    + alias3(((helper = (helper = helpers.task || (depth0 != null ? depth0.task : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"task","hash":{},"data":data}) : helper)))
    + "<span>x</span></li>\n";
},"useData":true});
templates['todo'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<li id=\""
    + alias3(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.task || (depth0 != null ? depth0.task : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"task","hash":{},"data":data}) : helper)))
    + "<span>x</span></li>\n";
},"useData":true});
})();