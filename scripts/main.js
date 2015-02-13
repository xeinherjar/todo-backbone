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
// Backbone Setup
var Todo = Backbone.Model.extend({
  idAttribute: '_id',

  defaults: {
    task: '',
    complete: false,
    removed: false,
  },

  toggleComplete: function() {
    this.set('complete', !this.get('complete'));
  },

  remove: function() {
    this.set('removed', true);
  }

});

var Todos = Backbone.Collection.extend({
  url: 'http://tiy-atl-fe-server.herokuapp.com/collections/backbone-ap-test',
  model: Todo,
});

var Metadata = Backbone.Model.extend({
  idAttribute: '_id',
  url : 'http://tiy-atl-fe-server.herokuapp.com/collections/backbone-td-md-test',

  defaults: {
    total: 0,
    complete: 0,
  }
});


// jQuery and Handlebars

// Setup
var todos = new Todos();
var metadata = new Metadata();

var todoForm = $('#todo-form');
var todoList = $('#todo-list');

var todoTemplates = Handlebars.templates['todo'];
var todoTemplatesComplete = Handlebars.templates['todo-complete'];
var metadataTemplate = Handlebars.templates['metadata'];





// Backbone-Events
todos.on({
  'add': function() { 
    metadata.set('total', metadata.get('total') + 1); 
  },
  'change:complete': function(e) { 
    var tmp = e.get('complete');
    metadata.set('complete', tmp ? 
        metadata.get('complete') + 1 : metadata.get('complete') - 1);
    e.save({ complete: tmp });
    render();
  },
  'change:removed': function(e) {
     metadata.set('total', metadata.get('total') - 1);
     if(e.get('complete')) {
       metadata.set('complete', metadata.get('complete') -1); 
     }
     e.save({ removed: true });
     render();
  },
  'sync': function(e) {
    var total = 0,
        complete = 0;
    e.models.forEach(function(td) {
      if (td.get('complete')) { complete += 1; }
      if (!td.get('removed')) { total += 1; }
    });
    metadata.set('total', total);
    metadata.set('complete', complete);
    render();
  }
});



// jQuery-Events
todoForm.on('keydown', 'input', function(e) {
  if(e.keyCode == 13) {
    e.preventDefault();
    
    var newTask = new Todo( { task: $(this).val() });
    if (newTask === '') { return; }
    
    todos.add(newTask);
    newTask.save();
    
    $(this).val('');
  }
});

todoList.on('click', 'li', function(e) {
  var td = todos.get(e.target.id);
  td.toggleComplete();
});

todoList.on('click', 'span', function(e) {
  var td = todos.get($(this).parent()[0].id);
  td.remove();
  e.stopPropagation();
});



// Page-Functions
var render = function() {
    var html = '';
    todos.each( function(t) {
      if(t.get('removed')) { return; }
      if(t.get('complete')) {
        html += todoTemplatesComplete(t.attributes);
      } else {
        html += todoTemplates(t.attributes);
      }
    });

    html += metadataTemplate(metadata.attributes);
    todoList.html(html);
};







// Onload
todos.fetch();
