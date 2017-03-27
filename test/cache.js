// cache.js
//
// Use this to cache the previous data (in-memory)
// For this problem (cache last five repos), this 
// solution is good enough. For larger datasets, use redis/memcached.

class Cache {
  constructor() {
    this._state = {}
  }
  get state () {
    return this._state
  }
  update (value) {
    this._state = Object.assign({}, this._state, value)
  }
  overwrite (value) {
    console.log('value', value)
    this._state = value
  }
  reset () {
    // Resets the cache
    this._state = {}
  }
  get isEmpty () {
    return Object.keys(this._state).length === 0
  }
  compare (data) {
    // Compares the previous cache and the latest cache
    // Returns the differences
    // And the new cache
    const cache = this._state
    if (this.isEmpty) {
      const updatedCache = data.reduce((c, repo) => {
        c[repo.id] = 1
        return c
      }, {})
      return {
        updatedCache: updatedCache,
        notificationPayload: data
      }
    } else {
      // Data available
      const existingData = data.filter((repo) => {
        return cache[repo.id] === 1
      })
      const newData = data.filter((repo) => {
        return !cache[repo.id]
      })
      const updatedCache = existingData.concat(newData)
      const newCache = updatedCache.reduce((schema, obj) => {
        schema[obj.id] = 1
        return schema
      }, {})
      return {
        updatedCache: newCache,
        notificationPayload: newData
      }
    }
  }
}


const cache = new Cache()

const { notificationPayload, updatedCache } = cache.compare([{id: 'a'}, {id: 'b'}, {id: 'c'}, {id: 'd'}, {id: 'e'}])
cache.overwrite(updatedCache)
console.log('Step 1:', cache.state)

const { notificationPayload:np1, updatedCache:uc1 } = cache.compare([{id: 'x'}, {id: 'b'}, {id: 'c'}, {id: 'd'}, {id: 'y'}])
cache.overwrite(uc1)
console.log('Step 2:', cache.state, np1)
