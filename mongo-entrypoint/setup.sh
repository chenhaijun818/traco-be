#!/bin/bash
set -e

mongosh <<EOF
use admin
db.auth('$MONGO_INITDB_ROOT_USERNAME', '$MONGO_INITDB_ROOT_PASSWORD')
use traco
db.createUser({
  user: '$MONGO_DB_USERNAME',
  pwd: '$MONGO_DB_PASSWORD',
  roles: [{role: 'readWrite', db: 'traco'}]
})
db.createCollection('projects')
db.createCollection('tracks')
db.projects.insertOne({pid: '1', name: '测试项目'})
EOF