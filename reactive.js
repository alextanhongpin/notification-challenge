// Testing rxjs approach for handling cache

const rx = require('rx')
const request = require('request')
const data = require('./search.json')

function getRepoService () {
  const options = {
    url: 'https://api.github.com/search/repositories?q=stars:%3E0&sort=updated&per_page=5&direction=desc',
    // Github API requires a user-agent :D
    headers: {
      'User-Agent': 'request'
    }
  }
  return rx.Observable.create((observer) => {
    request(options, (error, response, body) => {
      if (error) {
        observer.onError()
      } else {
        observer.onNext(JSON.parse(body))
      }
      observer.onCompleted()
    })
  })
}

function getRepoServiceMock () {
  return rx.Observable.just(data)
}

function cacheMock () {
  return rx.Observable.just([])
}

function fetchPublicRepos () {
  const ids = getRepoServiceMock().map((data) => {
    return data.items
  })
  .map((data) => data.map((model) => model.id))

  const cache = cacheMock()

  ids.merge(cache).subscribe((d) => {
  	console.log('1', d)
  })

  // if (!this._repos) {
  //   this._repos = request(url)
  //   .map((res) => res.json())
  //   .publishReplay(1)
  //   .refCount()
  // }
  // return this._repos
}
fetchPublicRepos()
