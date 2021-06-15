const _ = require('underscore')
const microtime = require('microtime')

const haystack = require(process.argv[2])
const filter = require(process.argv[3])

function groupListByCountry (list) {
  let result = []
  for (let i = 0; i < list.length; i++) {
    let item = list[i]
    if (!(item.country in result)) {
      result[item.country] = []
    }
    result[item.country].push(item.city)
  }
  return result
}

function haystackUnique (haystackList, filterList) {
  // Organize inputs to exclude by country
  const groupedHaystackList = groupListByCountry(haystackList)
  const groupedFilterList = groupListByCountry(filterList)
  let result = []
  for (let haystackCountry in groupedHaystackList) {
    let haystackCities = groupedHaystackList[haystackCountry]
    let filterCities = (haystackCountry in groupedFilterList) ? groupedFilterList[haystackCountry] : []
    if (filterCities.length > 0) {
      // Haystack country is present in filter, add only cities not in filter cities
      haystackCities = _.difference(haystackCities, filterCities)
    }
    if (haystackCities.length > 0) {
      result = result.concat(_.map(haystackCities, (city) => { return { name: city, country: haystackCountry }}))
    }
  }
  return result
}

function diffLists (list1, list2) {
  return haystackUnique(list1, list2)
}

const now = microtime.now()
console.log(diffLists(haystack, filter))
console.log(microtime.now() - now)
