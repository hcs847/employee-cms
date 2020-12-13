class DisplayResults {
  constructor(query, pool, init) {
    this.query = query;
    this.pool = pool;
    // this.name = name;
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

  // fix method for choices prompts
  //===============================
  //   async getChoices() {
  //     const columns = await this.getColumns().map(
  //       //() to return the column name for each item
  //       (column) => column[this.name]
  //     );
  //     console.log(" ");
  //     console.table(columns);
  //   }
}

// async function getColumns(sqlQuery, columns, pool) {
//   const result = await pool.query(sqlQuery);
//   columns = result.map((column) => column.name);
//   console.log(" ");
//   console.table(columns);
// }

module.exports = DisplayResults;
