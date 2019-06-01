json.content @message.content
json.name @message.user.name
json.time @message.created_at.strftime("%Y/%m/%d %H:%M%a")
json.image_url @message.image_url
json.id @message.id
