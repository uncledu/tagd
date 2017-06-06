'use strict'
import fs from 'fs'
import child_process from 'child_process'
export default class TagD {
  constructor(opts) {
    this.opts = {}
    Object.assign(this.opts, opts)
  }
  async getTagList() {
    return this.getCurrentRepoTag()
      .then(val => {
        return val.trim().split('\n')
      })
      .catch(err => {
        return JSON.stringify(err)
      })
  }
  async removeAllTags() {
    let taglist = await this.getTagList()
    return this.removeTagCountingFromBeginner(taglist.length)
  }
  async createTag(name) {
    if (!!name) {
      let exec = child_process.exec
      let cmd = `git tag ${name}`
      let ct = cmd => {
        return new Promise((resolve, reject) => {
          exec(cmd, (error, stdout, stderr) => {
            if (error) {
              reject(error)
            }
            resolve(stdout)
          })
        })
      }
      return ct(cmd)
        .then(stdout => {
          console.log(stdout)
          return true
        })
        .catch(err => {
          console.log(err)
          return false
        })
    }
  }
  async getCurrentRepoTag() {
    let exec = child_process.exec
    let cmd = `git tag --sort='version:refname'`
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(error)
        }
        resolve(stdout)
      })
    })
  }
  async removeTagByPattern(pattern) {
    let taglist = await this.getTagList()
    if (taglist.length < 1) return void 0
    let exp = new RegExp(pattern)
    if (taglist.length > 0) {
      taglist.forEach(tag => {
        if (exp.test(tag)) {
          this.removeTag(tag)
        }
      })
    }
    return void 0
  }

  async removeTagCountingFromBeginner(count) {
    let taglist = await this.getTagList()
    taglist.slice(0, count).forEach(tag => {
      this.removeTag(tag)
    })
  }

  removeTag(tagname) {
    const spawn = child_process.spawn
    const gt = spawn('git', ['tag', '-d', tagname])

    gt.stdout.on('data', data => {
      console.log(`stdout: ${data}`)
    })

    gt.stderr.on('data', data => {
      console.log(`stderr: ${data}`)
    })

    gt.on('close', code => {
      console.log(`child process exited with code ${code}`)
    })
  }

  async list() {
    this.getCurrentRepoTag()
  }
}
