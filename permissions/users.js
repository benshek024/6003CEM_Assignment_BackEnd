const AccessControl = require('role-acl');
const ac = new AccessControl();

ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('read')
  .on('user', ['*', '!password', '!passwordSalt']);
ac.grant('user').execute('read').on('dog');
ac.grant('user').execute('read').on('dogs');
ac.grant('user').condition({Fn:'EQUALS', args: {'requester':'$.owner'}}).execute('update')
  .on('user', ['usersName', 'usersLoginPwd', 'usersEmail', 'usersTelNum']);
ac.grant('admin').execute('create').on('dog');
ac.grant('admin').execute('read').on('user');
ac.grant('admin').execute('read').on('users');
ac.grant('admin').execute('update').on('user');
ac.grant('admin').execute('delete').on('dog');
ac.grant('admin').execute('update').on('dog');
ac.grant('admin').execute('read').on('dog');
ac.grant('admin').execute('read').on('dogs');
ac.grant('admin').condition({Fn:'NOT_EQUALS', args:
{'requester':'$.owner'}}).execute('delete').on('user');

exports.readAll = (requester) =>
ac.can(requester.role).execute('read').sync().on('users');

exports.read = (requester, data) =>
ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('read').sync().on('user');

exports.update = (requester, data) =>
ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('update').sync().on('user');

exports.delete = (requester, data) =>
  ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('delete').sync().on('user');

exports.createDog = (requester) =>
ac.can(requester.role).execute('create').sync().on('dogs');

exports.readAllDogs = (requester) =>
ac.can(requester.role).execute('read').sync().on('dogs');

exports.readDog = (requester, data) =>
ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('read').sync().on('dog');

exports.updateDog = (requester, data) =>
ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('update').sync().on('dog');

exports.deleteDog = (requester, data) =>
  ac.can(requester.role).context({requester:requester.ID, owner:data.ID}).execute('delete').sync().on('dog');
