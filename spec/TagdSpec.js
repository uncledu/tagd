'use strict';

var _index = require('../lib/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Test Suite', () => {

  var tagd = new _index2.default();
  it('should be a instance of TagD', () => {
    expect(tagd instanceof _index2.default).toBeTruthy();
  });
  it('should removeAllTags correct', done => {
    ['test_remove_tag_by_pattern_1', 'test_remove_tag_by_pattern_2', 'test_remove_tag_by_pattern_4'].forEach(tag => {
      tagd.createTag(tag);
    });
    tagd.removeAllTags().then(() => {
      tagd.getCurrentRepoTag().then(val => {
        console.log(val);
        expect(val).toEqual('');
        done();
      }).catch(err => {
        console.log(err);
        done();
      });
    }).catch(err => {
      console.log(err);
      done();
    });
  });

  it('should create tag correct', done => {
    let tagname = `test_create_tag`;
    tagd.createTag(tagname).then(() => {
      tagd.getTagList().then(val => {
        expect(val[0]).toEqual(tagname);
        done();
      }).catch(err => {
        console.log(err);
        done();
      });
    });
  });

  it('should get taglist correct', done => {
    tagd.removeAllTags().then(() => {
      tagd.getTagList().then(val => {
        expect(val[0]).toEqual('');
        done();
      });
    });
  });

  it('should removeTagByPattern correct', done => {
    ['test_remove_tag_by_pattern_1', 'test_remove_tag_by_pattern_2', 'test_remove_tag_by_pattern_4'].forEach(tag => {
      tagd.createTag(tag);
    });
    tagd.removeTagByPattern('test_remove_tag_by_pattern_*').then(val => {
      tagd.getTagList().then(val => {
        expect(val).toEqual(['']);
        done();
      });
    });
  });

  it('should removeTagCountingFromBeginner correct', done => {
    ['test_remove_tag_by_pattern_1', 'test_remove_tag_by_pattern_2', 'test_remove_tag_by_pattern_4'].forEach(tag => {
      tagd.createTag(tag);
    });
    tagd.removeTagCountingFromBeginner(3).then(val => {
      tagd.getTagList().then(val => {
        expect(val).toEqual(['']);
        done();
      });
    });
  });
  it('should getCurrentRepoTag correct', done => {
    tagd.removeAllTags().then(() => {
      ['test_remove_tag_by_pattern_1', 'test_remove_tag_by_pattern_2', 'test_remove_tag_by_pattern_4'].forEach(tag => {
        tagd.createTag(tag);
      });
      tagd.getCurrentRepoTag().then(val => {
        expect(val.trim().split('\n')).toEqual(['test_remove_tag_by_pattern_1', 'test_remove_tag_by_pattern_2', 'test_remove_tag_by_pattern_4']);
        done();
      });
    });
  });
});