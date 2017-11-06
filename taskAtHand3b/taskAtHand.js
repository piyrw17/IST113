"use strict";

// using a function contructor form to create an object
function TaskAtHandApp()
{
	var version = "v3.1";
	var appStorage = new AppStorage("taskAtHand");
	taskList = new TaskList();
	timoutId = 0;
	

	// creating a private function
	function setStatus(message)
	{
		$("#app>footer").text(message).show();
		if (!noFade)
		{
			$("#app>footer").fadeOut(1000);
		}
	}

	function addTask()
	{
		var taskName = $("#new-task-name").val();
		if (taskName)
		{
			var task = new Task(taskName);
			taskList.addTask(task);
			appStorage.setValue("nextTaskId", Task.nextTaskId);
			addTaskElement(taskName);
			saveTaskList();
			$("#new-task-name").val("").focus();
		}
	}
	
	function addTaskElement(task)
	{
		 var $task = $("#task-template .task").clone();
		 $task.data("task-id", task.id);
		$("span.task-name", $task).text(task.name);
		
		$("#task-list").append($task);
		
		$task.click(function() { onSelectTask($task); });

		$("button.delete", $task).click(function(){
			removeTask($task);
		});
		
		$("button.move-up", $task).click(function() {
			moveTask($task, true);
		});
		
		$("button.move-down", $task).click(function() {
			moveTask($task, false);
		});
		
		$("span.task-name", $task).click(function() {
			onEditTaskName($(this));
		});
		
		$("button.toggle-details", $task).click(function() {
			toggleDetails($task);
		});
		
		$(".details input, .details select", $task).each(function() {
			var $input = $(this);
			var fieldName = $input.data("field");
			$input.val(task[fieldName]);
		});
		
		$(".details input, .details select", $task).change(function() {
			onChangeTaskDetails(task.id, $(this));
		});
		
		$("input.task-name", $task).change(function() {
			onChangeTaskName($(this));
		})
		
		.blur(function() {
			$(this) .hide().siblings("span.task-name").show();
		});
		
	}
	
	function removeTask($task)
	{
		$task.remove();
		saveTaskList();
	}
	
	function onSelectTask($task)
	{
		if ($task)
		{	
			$task.siblings(".selected").removeClass("selected");	
			$task.addClass("selected");
		}
	}
	
	function moveTask($task, moveUp)
	{
		if(moveUp)
		{
			$task.insertBefore($task.prev());
		}
		else
		{
			$task.insertAfter($task.next());
		}
		saveTaskList();		
	}

	function onEditTaskName($span)
	{
		$span.hide()
		.siblings("input.task-name")
		.val($span.text())
		.show()
		.focus();
	}

	function onChangeTaskName($input)
	{
		$input.hide();
		var $span = $input.siblings("span.task-name");
		if ($input.val())
		{
		$span.text($input.val());
		}
		$span.show();
	}
	
	function toggleDetails($task)
	{
		$(".details", $task).slideToggle();
		$("button.toggle-details", $task).toggleClass("expanded");
	}
	
	function onChangeTaskDetails(taskId, $input)
	{
		 var task = taskList.getTask(taskId)
		 if (task)
		 {
			 var fieldName = $input.data("field");
			 task[fieldName] = $input.val();
			 saveTaskList();
		 }
	}
	
	function onChangeTheme()
	{
		var theme = $("#theme>option").filter(":selected").val();
		setTheme(theme);
		appStorage.setValue("theme", theme);
	}
	
	function setTheme(theme)
	{
		$("#theme-style").attr("href", "themes/" + theme + ".css");
	}
	
	function loadThem()
	{
		var theme = appStorage.getValue("theme");
		if (theme)
		{
			setTheme(theme);
			$("#theme>option[value=" + theme + "]")
			.attr("selected","selected");
		}
	}
	

	function loadTaskList()
	{
		var tasks = appStorage.getValue("taskList");
		taskList = new TaskList(tasks);
		rebuildTaskList();
		if(tasks)
		{
			for(var i in tasks)
			{
				addTaskElement(tasks[i]);
			}
		}
	}
	
	function rebuildTaskList()
	{		 
		 $("#task-list").empty();		 
		 taskList.each(function(task)
		 {
			addTaskElement(task);
		 });
	}

	function saveTaskList()
	{		
		if (timeoutId) clearTimout(timeoutId);
		setStatus("saving changes...", true);
		timeoutId = setTimeout(function()
		{
			appStorage.setValue("taskList", taskList.getTasks());
			timoutId = 0;
			setStatus("changes saved.");
		},
		2000);
		
	}

	// creating a public function
	this.start = function()
	{
		$("#new-task-name").keypress(function(e) {
			if (e.which == 13)
			{
				addTask();
				
				return false;
			}
		})
		.focus();
		$("#theme").change(onChangeTheme);
		$("#app>header").append(version);
		loadTaskList();
		setStatus("ready");
	};
} // end TaskAtHandApp

/* 	JQuery's shorthand for the document ready event handler
	could be written: $(document).ready(handler);

	When this page loads, we'll create a global variable
	named "app" by attaching it to the "window" object
	(part of the BOM - Browser Object Model)
*/
$(function() {
window.app = new TaskAtHandApp();
window.app.start();
});
