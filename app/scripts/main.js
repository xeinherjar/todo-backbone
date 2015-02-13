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
    render();
  },
  'change:removed': function(e) {
     metadata.set('total', metadata.get('total') - 1);
     if(e.get('complete')) {
       metadata.set('complete', metadata.get('complete') -1); 
     }
     render();
  },
  'sync': function() {
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
  todos.get(e.target.id).toggleComplete();
});

todoList.on('click', 'span', function(e) {
  todos.get($(this).parent()[0].id).remove();
  e.stopPropagation();
});



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
