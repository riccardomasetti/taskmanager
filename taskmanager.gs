function categorizeGoogleTasks() {
  const allLists = Tasks.Tasklists.list().items;
  const listMap = {};
  
  allLists.forEach(l => listMap[l.title] = l.id);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(today.getDate() + 7);

  allLists.forEach(currentList => {
    const tasks = Tasks.Tasks.list(currentList.id).items;
    if (!tasks) return; 

    tasks.forEach(task => {
      if (task.status !== "needsAction") return;

      let targetListName = "";
      
      if (!task.due) {
        targetListName = "GenericTasks";  
      } else {
        const dueDate = new Date(task.due);
        dueDate.setHours(0, 0, 0, 0);

        if (dueDate <= today) {
          targetListName = "Daily";
        } else if (dueDate <= oneWeekLater) {
          targetListName = "Weekly";
        } else {
          targetListName = "Monthly";
        }
      }

      const targetListId = listMap[targetListName];

      if (targetListId && currentList.id !== targetListId) {
        console.log(`Moving "${task.title}" to ${targetListName}`);
        
        const newTask = {
          title: task.title,
          notes: task.notes || "",
          due: task.due || null
        };

        try {
          Tasks.Tasks.insert(newTask, targetListId);
          Tasks.Tasks.remove(currentList.id, task.id);
        } catch (e) {
          console.error(`Failed to move task: ${task.title}. Error: ${e.message}`);
        }
      }
    });
  });
}
