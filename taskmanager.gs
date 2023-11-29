function categorizeGoogleTasks() {

  var myTaskListId = getMyTaskListId("GenericTasks");  
  var dailyListId = getMyTaskListId("Daily");
  var weeklyListId = getMyTaskListId("Weekly");
  var monthlyListId = getMyTaskListId("Monthly");

  var tasks = Tasks.Tasks.list(myTaskListId);

  for (var i = 0; i < tasks.items.length; i++) {
    var task = tasks.items[i];
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
      Logger.log(taskDueDate);
      Logger.log(today);
      Logger.log(oneWeekLater);
      Logger.log(oneMonthLater);
      if (taskDueDate <= today) {
        categoryListId = dailyListId;
      } else if (taskDueDate <= oneWeekLater) {
        categoryListId = weeklyListId;
      } else if (taskDueDate <= oneMonthLater) {
        categoryListId = monthlyListId;
      } else {
        Logger.log("Task end over a month");
        continue;
      }
       Tasks.Tasks.insert({title: taskName, due: taskDue}, categoryListId);
       Tasks.Tasks.remove(myTaskListId, task.id);
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
