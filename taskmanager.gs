function categorizeGoogleTasks() {

  var taskLists = Tasks.Tasklists.list();

  for (var i = 0; i < taskLists.items.length; i++) {
    var taskList = taskLists.items[i];
    var tasks = Tasks.Tasks.list(taskList.id);
    
    for (var j = 0; j < tasks.items.length; j++) {
      var task = tasks.items[j];
      var taskName = task.title;
      var taskDue = task.due;

      if (task.status != "needsAction") {
       continue; 
      }

      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var oneWeekLater = new Date(today);
      oneWeekLater.setDate(today.getDate() + 7);
      var oneMonthLater = new Date(today);
      oneMonthLater.setMonth(today.getMonth() + 1);

      var categoryListId;
      if (taskDue) {
        var taskDueDate = new Date(taskDue);
        taskDueDate.setHours(0, 0, 0, 0);
      
        if (taskDueDate <= today) {
          categoryListId = getMyTaskListId("Daily");
        } else if (taskDueDate <= oneWeekLater) {
          categoryListId = getMyTaskListId("Weekly");
        } else if (taskDueDate <= oneMonthLater) {
          categoryListId = getMyTaskListId("Monthly");
        } else {
          Logger.log("Task end over a month");
          continue;
        }

        } else {
          categoryListId = getMyTaskListId("Monthly");
        }

        Tasks.Tasks.insert({title: taskName, due: taskDue}, categoryListId);
        Tasks.Tasks.remove(taskList.id, task.id);
      }
    }
  }


function getMyTaskListId(listName) {
  var taskLists = Tasks.Tasklists.list();

  for (var i = 0; i < taskLists.items.length; i++) {
    var taskList = taskLists.items[i];
    if (taskList.title == listName) {
      return taskList.id;
    }
  }
}
