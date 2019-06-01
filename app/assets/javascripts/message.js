$(function(){
  function buildHTML(message){
    var image_url = (message.image_url)? `<image src="${message.image_url}">`:"";
    var html =`
            <div class="message-box">
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



  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $(".messages")[0].scrollHeight }, 'fast');
    })
    .fail(function(){
      alert('入力してください');
    })
    .always(function(){
      $('.form__submit').prop("disabled",false);
    })
  });
});  //function
