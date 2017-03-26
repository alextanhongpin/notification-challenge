
const cache = {}

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

// For each fetch, you need to carry out three things

// 1. Add to cache if it is not available
// 2. Mantain the cache if it is available
// 3. Remove from cache if it is not inside and there are n new values

// Set the first data
function update (data) {
  const keys = Object.keys(cache)
	// Cache if there are no data
  if (keys.length === 0) {
	  data.forEach((d) => {
	    cache[d] = 1
	  })
  } else {
		// Data available
    const lenOfExistingData = data.reduce((count, repo) => {
		// Repo already exist
      console.log(count, repo, cache[repo])
      if (cache[repo] === 1) {
      	console.log('true')
        count += 1
      }
      return count
    }, 0)
    const lenOfNewData = data.reduce((count, repo) => {
		// Repo already exist
      console.log(count, repo, cache[repo])
      if (!cache[repo]) {
      	console.log('true')
        count += 1
      }
      return count
    }, 0)
    console.log('existing', lenOfExistingData)
    console.log('new', lenOfNewData)
  }
  console.log('cache', cache)
}

update(data1)
update(data2)
update(data3)
update(data4)
update(data5)
update(data6)
