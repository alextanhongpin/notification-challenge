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


module.exports = Cache
