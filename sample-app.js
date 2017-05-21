tasks = new Mongo.Collection("tasks"); // グローバル変数

if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({
	tasks: function(){
	    return tasks.find({}, {sort: {createdAt: -1}});
	}
    });

    Template.body.events({
	"submit .new-task": function (event) {
	    event.preventDefault();
	    var text = event.target.text.value;
	    tasks.insert({
		text: text,
		createdAt: new Date() // current time
	    });
	    event.target.text.value = "";
	}
    });

    Template.task.events({
	"click .toggle-checked": function () {
	    tasks.update(this._id, {
		$set: {checked: ! this.checked}
	    });
	},
	"click .delete": function () {
	    tasks.remove(this._id);
	}
    });
}
