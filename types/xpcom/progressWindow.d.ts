/// <reference path="../zotero.d.ts" />

declare namespace Zotero {
  class ProgressWindow {
    constructor(options?: { window?: Window; closeOnClick?: boolean });

    /**
     * Shows the progress window
     */
    show(): boolean;

    /**
     * Changes the "headline" shown at the top of the progress window
     */
    changeHeadline(text: string, icon?: string, postText?: string): void;

    /**
     * Adds a line to the progress window with the specified icon
     */
    addLines(
      labels: string | { [key: string | number | symbol]: string },
      icons: string | { [key: string | number | symbol]: string },
    ): void;

    /**
     * Add a description to the progress window
     *
     * <a> elements are turned into XUL links
     */
    addDescription(text: string): void;

    /**
     * Sets a timer to close the progress window. If a previous close timer was set,
     * clears it.
     * @param {Integer} ms The number of milliseconds to wait before closing the progress
     *     window.
     * @param {Boolean} [requireMouseOver] If true, wait until the mouse has touched the
     *     window before closing.
     */
    startCloseTimer(ms: number, requireMouseOver?: boolean): void;

    /**
     * Immediately closes the progress window if it is open.
     */
    close(): void;

    ItemProgress: _ZoteroTypes.ItemProgress;
  }

  const ProgressWindowSet: {
    closeAll(): void;
  };
}

declare namespace _ZoteroTypes {
  type ItemProgress = {
    /**
     * Creates a new object representing a line in the progressWindow. This is the OO
     * version of addLines() above.
     */
    new (
      iconSrc: string,
      text: string,
      parentItemProgress?: ItemProgress,
    ): ItemProgress;

    /**
     * Sets the current save progress for this item.
     * @param {Integer} percent A percentage from 0 to 100.
     */
    setProgress(percent: number): void;

    /**
     * Sets the icon for this item.
     * @param {String} iconSrc
     */
    setIcon(iconSrc: string): void;

    setText(text: string): void;

    /**
     * Indicates that an error occurred saving this item.
     */
    setError(): void;

    Translation: {
      operationInProgress(): void;
      cannotEditCollection(): void;
      cannotAddToPublications(): void;
      cannotAddToFeed(): void;
      scrapingTo(libraryID?: number, collection?: Zotero.Collection): void;
      doneHandler(obj?: any, returnValue?: boolean): void;
      _scrapeError(description: string): void;
    };
  };
}
