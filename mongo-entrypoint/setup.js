let db = connect("mongodb://admin:pass@localhost:27017/admin")
db = db.getSiblingDB('traco')
db.createUser({
  user: 'user',
  pwd: '123456',
  roles: [{role: 'readWrite', db: 'traco'}]
})
db.createCollection('projects')
db.createCollection('tracks')
db.createCollection('roles')
db.projects.insert({
  pid: '2',
  name: '测试项目',
  desc: '这是一个测试项目'
})