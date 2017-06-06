'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _child_process = require('child_process');

var _child_process2 = _interopRequireDefault(_child_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class TagD {
  constructor(opts) {
    this.opts = {};
    Object.assign(this.opts, opts);
  }
  getTagList() {
    var _this = this;

    return _asyncToGenerator(function* () {
      return _this.getCurrentRepoTag().then(function (val) {
        return val.trim().split('\n');
      }).catch(function (err) {
        return JSON.stringify(err);
      });
    })();
  }
  removeAllTags() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let taglist = yield _this2.getTagList();
      return _this2.removeTagCountingFromBeginner(taglist.length);
    })();
  }
  createTag(name) {
    return _asyncToGenerator(function* () {
      if (!!name) {
        let exec = _child_process2.default.exec;
        let cmd = `git tag ${ name }`;
        let ct = function (cmd) {
          return new Promise(function (resolve, reject) {
            exec(cmd, function (error, stdout, stderr) {
              if (error) {
                reject(error);
              }
              resolve(stdout);
            });
          });
        };
        return ct(cmd).then(function (stdout) {
          console.log(stdout);
          return true;
        }).catch(function (err) {
          console.log(err);
          return false;
        });
      }
    })();
  }
  getCurrentRepoTag() {
    return _asyncToGenerator(function* () {
      let exec = _child_process2.default.exec;
      let cmd = `git tag --sort='version:refname'`;
      return new Promise(function (resolve, reject) {
        exec(cmd, function (error, stdout, stderr) {
          if (error) {
            reject(error);
          }
          resolve(stdout);
        });
      });
    })();
  }
  removeTagByPattern(pattern) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      let taglist = yield _this3.getTagList();
      if (taglist.length < 1) return void 0;
      let exp = new RegExp(pattern);
      if (taglist.length > 0) {
        taglist.forEach(function (tag) {
          if (exp.test(tag)) {
            _this3.removeTag(tag);
          }
        });
      }
      return void 0;
    })();
  }

  removeTagCountingFromBeginner(count) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      let taglist = yield _this4.getTagList();
      taglist.slice(0, count).forEach(function (tag) {
        _this4.removeTag(tag);
      });
    })();
  }

  removeTag(tagname) {
    const spawn = _child_process2.default.spawn;
    const gt = spawn('git', ['tag', '-d', tagname]);

    gt.stdout.on('data', data => {
      console.log(`stdout: ${ data }`);
    });

    gt.stderr.on('data', data => {
      console.log(`stderr: ${ data }`);
    });

    gt.on('close', code => {
      console.log(`child process exited with code ${ code }`);
    });
  }

  list() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      _this5.getCurrentRepoTag();
    })();
  }
}
exports.default = TagD;