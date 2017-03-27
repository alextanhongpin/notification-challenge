
let cache = {}

// First fetch
const data1 = ['a', 'b', 'c', 'd', 'e']

// Second fetch - no changes
const data2 = ['a', 'b', 'c', 'd', 'e']

// Third fetch - one changed
const data3 = ['a', 'b', 'c', 'd', 'f']

// Fourth fetch - two changed
const data4 = ['h', 'i', 'c', 'd', 'f']

// Fifth fetch - no changes
const data5 = ['h', 'i', 'c', 'd', 'f']

// Sixth fetch - all change!
const data6 = ['z', 'y', 'x', 'w', 'p']

// Seventh fetch - all change!
const data7 = ['z', 'y', 'x', 'a', 'p']

// For each fetch, you need to carry out three things

// 1. Add to cache if it is not available
// 2. Mantain the cache if it is available
// 3. Remove from cache if it is not inside and there are n new values

// UPDATE CACHED
// * Validate it against the cache and 
function update (cache, data) {
  const keys = Object.keys(cache)
	// Cache if there are no data
  if (keys.length === 0) {
	  data.forEach((d) => {
	    cache[d] = 1
	  })
    return {
      updatedCache: cache,
      notificationPayload: data
    }
  } else {
		// Data available
    const lenOfExistingData = data.reduce((count, repo) => {
		// Repo already exist
      if (cache[repo] === 1) {
        count += 1
      }
      return count
    }, 0)
    const lenOfNewData = data.reduce((count, repo) => {
		// Repo already exist
      if (!cache[repo]) {
        count += 1
      }
      return count
    }, 0)

    const existingData = data.filter((repo) => {
      return cache[repo] === 1
    })
    const newData = data.filter((repo) => {
      return !cache[repo]
    })
    const updatedCache = existingData.concat(newData)
    const newCache = updatedCache.reduce((schema, obj) => {
      schema[obj] = 1
      return schema
    }, {})
    return {
      updatedCache: newCache,
      notificationPayload: newData
    }
  }  // Should return 3 items
  // The updated cache
  // and the items to be sent as notification
  return {
    updatedCache: {},
    notificationPayload: []
  }
}

const interval = 3000
setTimeout(() => {
  const { updatedCache, notificationPayload } = update(cache, data1)
  cache = updatedCache
  console.log('Update 1', updatedCache, notificationPayload)
  console.log('Setting data2', data2)
}, interval)

setTimeout(() => {
  const { updatedCache, notificationPayload } = update(cache, data2)
  cache = updatedCache
  console.log('Update 2', updatedCache, notificationPayload)
  console.log('Setting data3', data3)
}, interval * 2)

setTimeout(() => {
  const { updatedCache, notificationPayload } = update(cache, data3)
  cache = updatedCache
  console.log('Update 3', updatedCache, notificationPayload)
  console.log('Setting data4', data4)
}, interval * 3)


setTimeout(() => {
  const { updatedCache, notificationPayload } = update(cache, data4)
  cache = updatedCache
  console.log('Update 4', updatedCache, notificationPayload)
  console.log('Setting data5', data5)
}, interval * 4)


setTimeout(() => {
  const { updatedCache, notificationPayload } = update(cache, data5)
  cache = updatedCache
  console.log('Update 5', updatedCache, notificationPayload)
  console.log('Setting data6', data6)
}, interval * 5)


setTimeout(() => {
  const { updatedCache, notificationPayload } = update(cache, data6)
  cache = updatedCache
  console.log('Update 6', updatedCache, notificationPayload)
  console.log('Setting data7', data7)
}, interval * 6)

setTimeout(() => {
  const { updatedCache, notificationPayload } = update(cache, data7)
  cache = updatedCache
  console.log('Update 7', updatedCache, notificationPayload)
}, interval * 7)

// Handle empty state
// Handle first time

console.log(Array(100).fill(100).slice(0, 10))