declare namespace _ZoteroTypes {
  interface Utilities_Date {
    /**
     * Initializes localized months for strToDate month parsing
     * @param dateFormatsJSON {Object} the JSON from resource/dateFormats.json
     */
    init(dateFormatsJSON: object): void;

    /**
     * @param {Boolean} [withEnglish = false] - Include English months
     * @return {Object} - Object with 'short' and 'long' arrays
     */
    getMonths(withEnglish: boolean): {
      short: string[];
      long: string[];
    };

    /**
     * Convert an SQL date in the form '2006-06-13 11:03:05' into a JS Date object
     *
     * Can also accept just the date part (e.g. '2006-06-13')
     **/
    sqlToDate(sqldate: string, isUTC?: boolean): Date | false;

    /**
     * Convert a JS Date object to an SQL date in the form '2006-06-13 11:03:05'
     *
     * If _toUTC_ is true, creates a UTC date
     **/
    dateToSQL(date: Date, toUTC?: boolean): string;

    /**
     * Convert a JS Date object to an ISO 8601 UTC date/time
     *
     * @param	{Date}		date		JS Date object
     * @return	{String}				ISO 8601 UTC date/time
     *									e.g. 2008-08-15T20:00:00Z
     */
    dateToISO(date: Date): string;

    /**
     * @return {Boolean} - True if string is an ISO 8601 date, false if not
     */
    isISODate(str: string): boolean;

    /**
     * Convert an ISO 8601–formatted date/time to a JS Date
     *
     * @param	{String}		isoDate		ISO 8601 date
     * @return {Date|False} - JS Date, or false if not a valid date
     */
    isoToDate(isoDate: string): Date | false;

    isoToSQL(isoDate: string): string;

    /*
     * converts a string to an object containing:
     *    day: integer form of the day
     *    month: integer form of the month (indexed from 0, not 1)
     *    year: 4 digit year (or, year + BC/AD/etc.)
     *    part: anything that does not fall under any of the above categories
     *          (e.g., "Summer," etc.)
     *
     * Note: the returned object is *not* a JS Date object
     */
    strToDate(string: string): Utilities_Date.Date;

    isHTTPDate(str: string): boolean;

    /**
     * does pretty formatting of a date object returned by strToDate()
     *
     * @param {Object} date A date object, as returned from strToDate()
     * @param {Boolean} shortFormat Whether to return a short (12/1/95) date
     * @return A formatted date string
     * @type String
     **/
    formatDate(date: Utilities_Date.Date, shortFormat: boolean): string;

    strToISO(str: string): string | false;

    sqlToISO8601(sqlDate: string): string;

    strToMultipart(str: string): string;

    /**
     * Tests if a string is a multipart date string
     * e.g. '2006-11-03 November 3rd, 2006'
     */
    isMultipart(str: string): boolean;

    /**
     * Returns the SQL part of a multipart date string
     * (e.g. '2006-11-03 November 3rd, 2006' returns '2006-11-03')
     */
    multipartToSQL(multi: string): string;

    /**
     * Returns the user part of a multipart date string
     * (e.g. '2006-11-03 November 3rd, 2006' returns 'November 3rd, 2006')
     */
    multipartToStr(multi: string): string;

    /**
     * Convert 'yesterday'/'today'/'tomorrow' to SQL date, or else return original string
     *
     * @param {String} str
     * @return {String}
     */
    parseDescriptiveString(str: string): string;

    isSQLDate(str: string, allowZeroes?: boolean): boolean;

    isSQLDateTime(str: string): boolean;

    isSQLDateTimeWithoutSeconds(str: string): boolean;

    sqlHasYear(sqldate: string): boolean;

    sqlHasMonth(sqldate: string): boolean;

    sqlHasDay(sqldate: string): boolean;

    getUnixTimestamp(): number;

    toUnixTimestamp(date: string): number;

    /**
     * Convert a JS Date to a relative date (e.g., "5 minutes ago")
     *
     * Adapted from http://snipplr.com/view/10290/javascript-parse-relative-date/
     *
     * @param	{Date}	date
     * @return	{String}
     */
    toRelativeDate(date: Date): string;

    toFriendlyDate(date: Date): string;

    // The following three methods exist in the source code but are not exposed in `Zotero.Date`
    // isToday();
    // isThisWeek();
    // getWeekNumber();

    getFileDateString(file: nsIFile): string;
    getFileTimeString(file: nsIFile): string;
    /**
     * Get the order of the date components based on the current locale
     *
     * Returns a string with y, m, and d (e.g. 'ymd', 'mdy')
     */
    getLocaleDateOrder(): "mdy" | "ymd" | "dmy";
  }

  namespace Utilities_Date {
    interface Date {
      year?: string;
      month?: number;
      day?: number;
      part?: string;
      order?: string;
    }
  }
}

declare namespace Zotero {
  const Date: _ZoteroTypes.Utilities_Date;
}
