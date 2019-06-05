# 投稿者用
json.name @message.user.name
json.time @message.created_at.strftime("%Y/%m/%d %H:%M")
json.id @message.id
json.content @message.content
json.image @message.image.url
