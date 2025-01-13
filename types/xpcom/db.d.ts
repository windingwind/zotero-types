/// <reference path="../../internal.d.ts" />

declare namespace _ZoteroTypes {
  namespace DB {
    type QueryParams = MaybeArray<string | number | object | null | undefined>;
  }

  interface DB {
    DB_CORRUPTION_STRINGS: string[];
    MAX_BOUND_PARAMETERS: number;
    Sqlite: object;

    get path(): string;

    /**
     * Test a read-only connection to the database, throwing any errors that occur
     *
     * @return	void
     */
    test(): Promise<void>;

    parseQueryAndParams(
      sql: string,
      params: DB.QueryParams,
    ): [string, DB.QueryParams];

    addCallback(
      type: "begin" | "commit" | "rollback",
      cb: (id: string) => void,
    ): number;

    addCurrentCallback(
      type: "commit" | "rollback",
      cb: (id: string) => void,
    ): void;

    removeCallback(type: "begin" | "commit" | "rollback", id: number): void;

    /*
     * Used on shutdown to rollback all open transactions
     *
     * TODO: update or remove
     */
    rollbackAllTransactions(): number | boolean;

    getColumns(table: string): Promise<object[] | false>;

    /**
     * Find the next lowest numeric suffix for a value in table column
     *
     * For example, if "Untitled" and "Untitled 2" and "Untitled 4",
     * returns "Untitled 3"
     *
     * If _name_ alone is available, returns that
     **/
    getNextName(
      libraryID: number,
      table: string,
      field: string,
      name: string,
    ): Promise<string>;

    /**
     * @param {Function} func - Async function containing `await Zotero.DB.queryAsync()` and similar
     * @param {object} [options]
     * @param {Boolean} [options.disableForeignKeys] - Disable foreign key constraints before
     *    transaction and re-enable after. (`PRAGMA foreign_keys=0|1` is a no-op during a transaction.)
     * @return {Promise} - Promise for result of generator function
     */
    executeTransaction<T = anyObj>(
      func: () => T | Promise<T>,
      options?: {
        disbledForeignKeys: boolean;
        timeout: number;
        vacuumOnCommit: boolean;
        inBackup: boolean;
        onCommit: (id: string) => void;
        onRollback: (id: string) => void;
      },
    ): Promise<T>;

    inTransaction(): boolean;

    waitForTransaction(id: number): Promise<void>;

    requireTransaction(): void;

    /**
     * @param {String} sql SQL statement to run
     * @param {Array|String|Integer} [params] SQL parameters to bind
     * @return {Promise|Array} A promise for an array of rows. The individual
     *                         rows are Proxy objects that return values from the
     *                         underlying mozIStorageRows based on column names.
     */
    queryAsync(
      sql: string,
      params?: DB.QueryParams,
      options?: {
        inBackup?: boolean;
        noParseParams?: boolean;
        onRow?: (row: unknown, cancel: unknown) => void;
        noCache?: boolean;
      },
    ): Promise<anyObj[] | undefined>;

    queryTx(
      sql: string,
      params?: DB.QueryParams,
      options?: {
        inBackup?: boolean;
        noParseParams?: boolean;
        onRow?: (row: unknown, cancel: unknown) => void;
        noCache?: boolean;
      },
    ): Promise<anyObj[] | undefined>;

    /**
     * @param {String} sql  SQL statement to run
     * @param {Array|String|Integer} [params]  SQL parameters to bind
     * @return {Promise<Array|Boolean>}  A promise for either the value or FALSE if no result
     */
    valueQueryAsync<T = anyObj>(
      sql: string,
      params?: DB.QueryParams,
      options?: { inBackup?: boolean; noCache?: boolean },
    ): Promise<T | boolean>;

    /**
     * @param {String} sql SQL statement to run
     * @param {Array|String|Integer} [params] SQL parameters to bind
     * @return {Promise<object>}  A promise for a proxied storage row
     */
    rowQueryAsync(
      sql: string,
      params?: DB.QueryParams,
    ): Promise<object | boolean>;

    /**
     * @param {String} sql SQL statement to run
     * @param {Array|String|Integer} [params] SQL parameters to bind
     * @return {Promise<Array>}  A promise for an array of values in the column
     */
    columnQueryAsync<T = anyObj>(
      sql: string,
      params?: DB.QueryParams,
      options?: {
        inBackup?: boolean;
        noCache?: boolean;
        debug?: boolean;
        debugParams?: boolean;
      },
    ): Promise<T[]>;

    logQuery(
      sql: string,
      params?: DB.QueryParams,
      options?: { debug?: boolean; debugParams?: boolean },
    ): void;

    tableExists(table: string, db?: string): Promise<boolean>;

    columnExists(table: string, column: string): Promise<boolean>;

    indexExists(index: string, db?: string): Promise<boolean>;

    parseSQLFile(sql: string): string[];

    /**
     * Parse SQL string and execute transaction with all statements
     *
     * @return {Promise}
     */
    executeSQLFile(sql: string): Promise<void>;

    /*
     * Implements nsIObserver
     */
    observe(subject: unknown, topic: "idle", data: unknown): void;

    numCachedStatements(): number;

    getCachedStatements(): string[];

    // TEMP
    vacuum(): Promise<void>;

    // TEMP
    info(): Promise<{
      auto_vaccum: number;
      cache_size: number;
      "main.locking_mode": string;
      page_size: number;
    }>;

    quickCheck(): Promise<boolean>;

    integrityCheck(): Promise<boolean>;

    isCorruptionError(e: Error): boolean;

    /**
     * Close the database
     * @param {Boolean} [permanent] If true, throw an error instead of
     *     allowing code to re-open the database again
     */
    closeDatabase(permanent: boolean): Promise<void>;

    backupDatabase(suffix: boolean | string, force: boolean): boolean;

    /**
     * Escape '_', '%', and '\' in an SQL LIKE expression so that it can be used with ESCAPE '\' to
     * prevent the wildcards from having special meaning
     */
    escapeSQLExpression(expr: string): string;

    /////////////////////////////////////////////////////////////////
    //
    // Private methods
    //
    /////////////////////////////////////////////////////////////////

    _getConnection(options?: { inBackup: boolean }): object | boolean;

    /*
     * Retrieve a link to the data store asynchronously
     */
    _getConnectionAsync(options?: { inBackup: boolean }): Promise<object>;

    _checkException(e: Error): Promise<boolean>;

    /**
     * @return {Boolean} - True if recovered, false if not
     */
    _handleCorruptionMarker(): Promise<void>;

    _debug(str: string, level?: number): void;
  }

  interface DBConnection extends DB {
    new (dbNameOrPath: string): this;
  }
}

declare namespace Zotero {
  const DB: _ZoteroTypes.DB;
  const DBConnection: _ZoteroTypes.DBConnection;
}
