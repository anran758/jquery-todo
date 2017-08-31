;(function() {
  'use strict';

  var $add_task = $('.add-task'),
      task_list = {};

  init();

  $add_task.on('submit', function(e){
    var new_task = {};
    e.preventDefault();

    // get the value of task
    $input = $(this).find('input[name=content]');
    new_task.content = $input.val();

    if(!new_task.content) return;
    if (add_task(new_task)) {
      render_task_list();
      // 清空输入框的值
      $input.val(null);
    }
  });

  function add_task(new_task) {
    // new task push into the new_list and localStorage is updated
    console.log(task_list);
    task_list.push(new_task);
    console.log(task_list);
    store.set('task_list', task_list);
    console.log('task_list',task_list)
    return true;
  }

  // render HTML
  function render_task_list() {
    var $task_list = $('.task-list'),
        $task;

    $task_list.html('');
    for(var i = 0;i < task_list.length; i ++) {
      $task = render_task_tpl(task_list[i]);
      $task_list.append($task);
    }
  }

  function render_task_tpl(data) {
    var list_item_tpl  = '<div class="task-item">' +
                            '<span><input type="checkbox"></span>' +
                            '<span class="task-content">' + data.content + '</span>' +
                            '<span class="fr">' +
                              '<span class="action"> 删除</span>' +
                              '<span class="action"> 详情</span>' +
                            '</span>' +
                         '</div>';
    return $(list_item_tpl);
  }

  function init() {
    task_list = store.get('task_list') || [];
    console.log('task_list', task_list)
    if (task_list.length) {
      render_task_list();
    }
  }

})();