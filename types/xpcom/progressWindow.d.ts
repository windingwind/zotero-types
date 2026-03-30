/// <reference path="../zotero.d.ts" />

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
