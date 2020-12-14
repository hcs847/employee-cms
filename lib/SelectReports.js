class SelectReports {
  constructor(query, pool, init) {
    this.query = query;
    this.pool = pool;
    this.init = init;
  }
  async getColumns() {
    const result = await this.pool.query(this.query);
    console.log(" ");
    console.table(result);
  }

  async viewResults() {
    await this.getColumns();
    // calling the init function to prompt the user initial questions
    await this.init();
  }
}

module.exports = SelectReports;
