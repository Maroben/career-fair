// if the filter is not in the filters array than push it.
module.exports.getAllFilters = function(items, prop) {
	const filters = []

	items.map((item) =>
		item[prop].map((filter) => (filters.indexOf(filter) === -1 ? filters.push(filter) : filter))
	)

	return filters.sort()
}

// loop through all items and check if at least one element is in
// the array. Return item if truthy, then remove all the null values.
module.exports.filtering = function(items, prop, filters) {
	return items
		.map((item) => (filters.every((filter) => item[prop].includes(filter)) ? item : null))
		.filter((item) => item != null)
}

module.exports.searching = function(items, attributes, query) {
	let result = []

	items.forEach((item) => {
		for (let i in attributes) {
			if (item[attributes[i]].toLowerCase().indexOf(query.toLowerCase()) > -1) {
				result.push(item)
				return
			}
		}
	})

	return result
}
