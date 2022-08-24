module.exports = class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.total = query.length;
        this.count = 0;
        this.queryString = queryString;
    }

    paginating() {
        const page = this.queryString.page * 1 || 0;
        const limit = this.queryString.limit * 1 || 0;
        const skip = (page - 1) * limit;
        if (limit !== 0) {
            this.query = this.query.splice(skip, limit);
        }
        this.count = this.query.length;
        return this;
    }
}
