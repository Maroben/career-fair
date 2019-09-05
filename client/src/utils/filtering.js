// if the filter is not in the filters array than push it.
module.exports.getAllFilters = function(items, prop) {
	let allFilters = []

	items.map((item) => {
		if (item[prop].length > 0) {
			return item[prop].map((filter) => allFilters.push(filter))
		}
		return 0
	})

	let filters = []
	let count = 0
	let minimum = prop === "tags" ? 3 : 1
	for (let i = 0; i < allFilters.length; i++) {
		if (filters.indexOf(allFilters[i]) === -1) {
			count = 0
			for (let j = 0; j < allFilters.length; j++) {
				if (allFilters[i] === allFilters[j]) {
					count++
				}
			}
			if (count >= minimum) {
				filters.push(allFilters[i])
			}
		}
	}
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
		for (var i in attr) {
			if (typeof item[attr[i]] != "object") {
				if (item[attr[i]].toLowerCase().indexOf(query.toLowerCase()) > -1) {
					return result.push(item)
				}
			} else {
				item[attr[i]].map((j) => {
					if (j.toLowerCase().indexOf(query.toLowerCase()) > -1) {
						return result.push(item)
					}
					return null
				})
			}
		}
	})

	return result
}
