;(function() {
  'use strict';

  var $taskDelete,
    $taskDetailSwitch,
    $taskDetail = $('.task-detail'),
    $taskDetailMask = $('.task-detail-mask'),
    taskList = [],
    currentIndex,
    $updataForm,
    $taskDetailCont,
    $taskDetailContInput;

  init();

  function init() {
    taskList = store.get('taskList') || [];
    listenerSub();
    if (taskList.length) {
      renderTask();
    }
  }

  // Listener form submit
  function listenerSub() {
    var $taskAdd = $('.add-task');

    $taskAdd.on('submit', function(e) {
      e.preventDefault();
      var newTask = {},
        $input;

      // get the value of task
      $input = $(this).find('input[name=content]');
      newTask.content = $input.val();

      if (!newTask.content) return;
      if (taskAdd(newTask)) {
        renderTask();
        // 清空输入框的值
        $input.val(null);
      }
    });
  }

  function taskAdd(newTask) {
    // new task push into the newList also localStorage is updated
    taskList.push(newTask);
    refreshData();

    return true;
  }

  function taskDel(index) {
    // if there is no index or the index in the taskList notexist
    if (index === undefined || !taskList[index]) return;

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

    // Traverse the taskList into the template
    $taskList.html('');
    for (var i = 0; i < taskList.length; i++) {
      $task = renderItem(taskList[i], i);
      $taskList.prepend($task);
    }

    // After the rendering is complete, add the listeners
    $taskDelete = $('.action.delete');
    $taskDetailSwitch = $('.action.detail');
    listenerDel();
    listenerDetail();
  }

  // Task list HTML template
  function renderItem(data, index) {
    if (!data || !index) return;
    var listItemTpl = '<div class="task-item" data-index="' + index + '">' +
      '<span><input type="checkbox"></span>' +
      '<span class="task-content">' + data.content + '</span>' +
      '<span class="fr">' +
      '<span class="action delete"> 删除</span>' +
      '<span class="action detail"> 详情</span>' +
      '</span>' +
      '</div>';
    return $(listItemTpl);
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

  // Give details of the switch binding event
  function listenerDetail() {
    var index;
    $('.task-item').on('dblclick', function() {
      index = $(this).data('index');
      showDetail(index);
    });

    $taskDetailSwitch.on('click', function() {
      var $this = $(this);
      var $item = $this.parent().parent();

      // get data-index current value
      index = $item.data('index');
      showDetail(index);
    });
  }

  // Show task detail
  function showDetail(index) {
    // Render detail HTML
    renderDetail(index);
    currentIndex = index;
    $taskDetail.show();
    $taskDetailMask.show();
  }

  $taskDetailMask.on('click', hideDetail);

  // hide detail function
  function hideDetail() {
    $taskDetail.hide();
    $taskDetailMask.hide();
  }

  // Render detail HTML
  function renderDetail(index) {
    if (index === undefined || !taskList[index]) return;

    var item = taskList[index];
    var tpl = '<form>' +
      '<div class="content">' + item.content + '</div>' +
      '<div class="input-item">' +
      '<input type="text" name="content" value="' + (item.content || '') +
      '" style="display: none;">' +
      '</div>' +
      '<div>' +
      '<div class="desc input-item">' +
      '<textarea name="desc">' + (item.desc || '') + '</textarea>' +
      '</div>' +
      '</div>' +
      '<div class="remind input-item">' +
      '<input name="remindDate" type="date" value="' + item.remindDate + '">' +
      '</div>' +
      '<div class="input-item"><button type="submit">更新</button></div>' +
      '</form>';

    $taskDetail.html(null);
    $taskDetail.html(tpl);
    $updataForm = $taskDetail.find('form');
    $taskDetailCont = $updataForm.find('.content');
    $taskDetailContInput = $updataForm.find('[name=content]');

    $taskDetailCont.on('dblclick', function() {
      $taskDetailContInput.show();
      $taskDetailCont.hide();
    });

    $updataForm.on('submit', function(e) {
      e.preventDefault();
      var data = {};
      data.content = $(this).find('[name=content]').val();
      data.desc = $(this).find('[name=desc]').val();
      data.remindDate = $(this).find('[name=remindDate]').val();
      updataTask(index, data);
      hideDetail();
      // console.log('data', data);
    });
  }

  // Updata current task
  function updataTask(index, data) {
    if (!index || !taskList[index]) return;

    taskList[index] = data;
    refreshData();
  }

})();