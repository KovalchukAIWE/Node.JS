function prettyResponse(results) {
	return {
		results: results.docs,
		limitResults: results.limit,
		totalResults: results.totalDocs,
		page: results.page,
		totalPages: results.totalPages,
	};
}

module.exports = prettyResponse;