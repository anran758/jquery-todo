;(function() {
  'use strict';

   var $taskDelete,
      // $task_detail = $('dask-detail'),
      // $task_detail_mask = $('dask-detail-mask'),
      taskList = [];

  init();


  // Listener form submit
  function listenerSub() {
    var $taskAdd = $('.add-task');

    $taskAdd.on('submit', function(e){
      e.preventDefault();
      var newTask = {},
          $input;

      // get the value of task
      $input = $(this).find('input[name=content]');
      newTask.content = $input.val();

      if(!newTask.content) return;
      if (taskAdd(newTask)) {
        renderTask();
        // 清空输入框的值
        $input.val(null);
      }
    });
  }

  // Listening task Delete key
  function listenerDel() {
    $taskDelete.on('click', function() {
      var $this = $(this);
      var $item = $this.parent().parent();
      var index = $item.data('index');
      var tmp = confirm('Are you true Delete this task?');
      return tmp ? taskDel(index) : null;
    });
  }


  // Add
  function taskAdd(newTask) {
    // new task push into the newList also localStorage is updated
    taskList.push(newTask);
    refreshData();

    return true;
  }

  // Delete
  function taskDel(index) {
    // if there is no index or the index in the taskList notexist
    if(index === undefined || !taskList[index]) return;

    delete taskList[index];
    refreshData();
  }

  // refresh localStorage and render template
  function refreshData() {
    store.set('taskList', taskList);
    renderTask();
  }

  // Render task list
  function renderTask() {
    var $taskList = $('.task-list'),
        $task;

    $taskList.html('');
    for(var i = 0;i < taskList.length; i ++) {
      $task = renderItem(taskList[i], i);
      $taskList.append($task);
    }

    // After the rendering is complete, add the monitor
    $taskDelete = $('.action.delete');
    listenerDel();
  }

  // Task list HTML template
  function renderItem(data, index) {
    if (!data || !index) return;
    var listItemTpl  = '<div class="task-item" data-index="' +  index + '">' +
                            '<span><input type="checkbox"></span>' +
                            '<span class="task-content">' + data.content + '</span>' +
                            '<span class="fr">' +
                              '<span class="action delete"> 删除</span>' +
                              '<span class="action"> 详情</span>' +
                            '</span>' +
                         '</div>';
    return $(listItemTpl);
  }

  function init() {
    taskList = store.get('taskList') || [];
    listenerSub();
    if (taskList.length) {
      renderTask();
    }
  }

})();