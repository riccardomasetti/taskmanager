# taskmanager

## Overview
Task Manager that automatically divides tasks looking at their date.
Every task present in all the lists is compared with the current date and placed in the right list: "Daily", "Weekly", "Monthly" or "GenericTasks".
In the second version another behavior is added. Let's consider a task initially put in the "Weekly list", when the day in which the task was initially set is reached it is moved in the "Daily list". The same happens for "Montly list" with "Weekly list".
In addition, if a task has not a date, it is put in "GenericTasks" list

## Installing
If you want to use the code you have to create a Google App Script project and download the dependencies for Google Tasks. Here how to do: https://developers.google.com/tasks/quickstart/apps-script?hl=it


In this first versione it is required to have already created the lists "GenericTasks", "Daily", "Weekly" and "Monthly" (case sensitive) in Google Tasks. 

## Credits
  * Credits: credits to Pietro Carrucciu who gave me the idea for the project after seeing his version of the same project.
    
    Github profile: https://github.com/carruc
