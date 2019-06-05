$(function(){
  //投稿者用HTML
  function buildHTML(message){
    var image_url = (message.image)? `<image src="${message.image}">`:"";
    var html =`
            <div class="message-box" data-message-id= "${message.id}">
              <div class="message-box__upper-info">
                <div class="message-box__upper-info__user-name">
                  ${message.name}
                </div>
                <div class="message-box__upper-info__post-date">
                  ${message.time}
                </div>
              </div>
              <div class="message-box__text">
                ${message.content}
              </div>
              ${image_url}
            </div>
              `
    return html;
  }

  //自動更新受信用HTML
  function reloadHTML(message){
    var image_url = (message.image)? `<image src="${message.image}">`:"";
    var html =`
            <div class="message-box" data-message-id= "${message.id}">
              <div class="message-box__upper-info">
                <div class="message-box__upper-info__user-name">
                  ${message.user_name}
                </div>
                <div class="message-box__upper-info__post-date">
                  ${message.created_at}
                </div>
              </div>
              <div class="message-box__text">
                ${message.content}
              </div>
              ${image_url}
            </div>
              `
    return html;
  }

  /////////// 投稿者側のビュー反映機能 ////////////
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.form__message').val('');
      $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight }, 'fast');
    })

    .fail(function(){
      alert('入力してください');
    })

    .always(function(){
      $('.form__submit').prop("disabled",false);
    })
  });  //new_message

  //////////// 自動更新機能 ////////////////
  $(function(){
    setInterval(reloadMessages, 5000);
  });
  
  function reloadMessages(){
    var url = window.location.href;
    var last_message_id = $('.message-box:last').data('message-id');
    if (url.match(/\/groups\/\d+\/messages/)) {

      $.ajax({
        url: 'api/messages',
        type: 'GET',
        data: { id: last_message_id },
        dataType: 'json'
      })

      .done(function(messages){
        if (messages.length !== 0) {
          messages.forEach(function(message){
            var html = reloadHTML(message);
            $('.messages').append(html);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight }, 'fast');
          });
        }
      })

      .fail(function(){
        alert('自動更新に失敗しました');
      })

    } else {
      clearInterval(reloadMessages);
    }
  };
});  //大元のfunction
