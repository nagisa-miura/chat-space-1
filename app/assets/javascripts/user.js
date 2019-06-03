$(function(){

  var search_list = $('#chat-group-users');
  // htmlを生成
  function appendUser(user) {
    var html =`
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn", id="chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>
              `
        search_list.append(html);
  }

  function appendNoUser(msg) {
    var html =`
              <div class='chat-group-user clearfix'>
                <p class='chat-group-user__name'>${current_user.name}</p>
              </div>
              `
    search_list.append(html);
  }



  // イベント発火の設定
  $('#user-search-field').on("keyup", function() {
    var input = $("#user-search-field").val();
    //ajaxの生成
    $.ajax({
      url: '/users/',
      type: 'GET',
      data: { keyword: input },
      dataType: 'json',
    })
    
    //HTMLの生成
    .done(function(users){
      $("#chat-group-users").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      } else {
        appendNoUser(user);
      }
    })
    // エラー時処理
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });

  //ユーザ追加
  function addUser(user_id, user_name) {
    console.log(user_id)
    console.log(user_name)
    var html = `
                <div class="chat-group-user clearfix" id="chat-group-user-${user_id}">
                  <input name="group[user_ids][]" type="hidden" value="${user_id}">
                    <p class="chat-group-user__name">${user_name}</p>
                    <a class="user-search-remove chat-group-user__btn js-remove-btn" id="chat-group-user__btn--remove" >削除</a>
                </div>
                `
    $('#user-add').append(html);
    console.log(html)
  }

  //追加ボタンが押されたときの処理
  $(document).on("click", "#chat-group-user__btn--add", function () {
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    addUser(user_id, user_name);
    $(this).parent().remove();
  });
  //削除を押すと、チャットメンバーから削除する
  $(document).on('click','#chat-group-user__btn--remove',function(){
    $(this).parent().remove();
  });
});  //#member_search
