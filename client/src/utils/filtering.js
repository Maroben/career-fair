// if the filter is not in the filters array than push it.
module.exports.getAllFilters = function(items, prop) {
	const filters = []

	items.map((item) =>
		item[prop].map((filter) => (filters.indexOf(filter) === -1 ? filters.push(filter) : filter))
	)

	return filters.sort()
}

module.exports.filtering = function(items, props, filters) {
	for (let i = 0; i < props.length; i++) {
		items = items
			.map((item) =>
				filters[i].every((filter) => item[props[i]].includes(filter)) ? item : null
			)
			.filter((item) => item != null)
	}
	return items
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
