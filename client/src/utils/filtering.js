// if the filter is not in the filters array than push it.
module.exports.getAllFilters = function(items, prop) {
	const filters = []

	items.map((item) =>
		item[prop].map((filter) => (filters.indexOf(filter) === -1 ? filters.push(filter) : filter))
	)

	return filters.sort()
}

module.exports.filtering = function(items, { active, labels }) {
	for (let k = 0; k < labels.length; k++) {
		if (active[labels[k][0]].length > 0) {
			items = items
				.map((item) =>
					active[labels[k][0]].every((filter) => item[labels[k][0]].includes(filter))
						? item
						: null
				)
				.filter((item) => item != null)
		}
	}

	return items
}

module.exports.searching = function(items, { query, attr }) {
	let result = []

	items.forEach((item) => {
		for (let i in attr) {
			if (item[attr[i]].toLowerCase().indexOf(query.toLowerCase()) > -1) {
				result.push(item)
				return
			}
		}
	})

	return result
}
