# テーブル設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association

- has_many :members
- has_many :groups, through: :members
- has_many :messages


- add_index :user_name


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association

- belongs_to :group
- belongs_to :user


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association

has_many :members
has_many :users, through: :members
has_many :messages

### Index

- add_index :group_name


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|message|text|null: false|
|image|text|  |
|created_at|timestamp|null: false|

### Association

- belongs_to :user
- belongs_to :group
