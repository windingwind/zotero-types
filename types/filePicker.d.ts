/**
 * Interface to the system filepicker.
 *
 * Based on Mozilla's nsIFilePicker, with minor modifications (e.g., string
 * paths instead of nsIFile, promise-returning show()).
 *
 * Available as a global in unprivileged plugin sandboxes with the
 * "fileSystem" permission.
 */
declare class FilePicker {
  /** Load a file */
  readonly modeOpen: 0;
  /** Save a file */
  readonly modeSave: 1;
  /** Select a folder/directory */
  readonly modeGetFolder: 2;
  /** Load multiple files */
  readonly modeOpenMultiple: 3;

  /** The file picker dialog was closed by the user hitting 'OK' */
  readonly returnOK: 0;
  /** The file picker dialog was closed by the user hitting 'Cancel' */
  readonly returnCancel: 1;
  /** The user chose an existing file and acknowledged that they want to overwrite the file */
  readonly returnReplace: 2;

  /** All files */
  readonly filterAll: 0x001;
  /** HTML files */
  readonly filterHTML: 0x002;
  /** Text files */
  readonly filterText: 0x004;
  /** Image files */
  readonly filterImages: 0x008;
  /** XML files */
  readonly filterXML: 0x010;
  /** Platform-specific application filter */
  readonly filterApps: 0x040;
  /** Allow URLs */
  readonly filterAllowURLs: 0x080;
  /** Audio files */
  readonly filterAudio: 0x100;
  /** Video files */
  readonly filterVideo: 0x200;

  /**
   * @param parentWindow - The parent window
   * @param title - Dialog title
   * @param mode - One of the mode constants
   */
  init(parentWindow: Window, title: string, mode: number): void;

  /**
   * Appends a custom file extension filter to the dialog.
   *
   * @param title - The title of the filter
   * @param filter - The filter string. Multiple extensions may be included,
   *   separated by a semicolon and a space.
   */
  appendFilter(title: string, filter: string): void;

  /**
   * Appends a list of file extension filters, from the predefined list, to the dialog.
   *
   * @param filterMask - A combination of the filter constants. You may OR
   *   multiple filters together; for example `filterAll | filterHTML`.
   */
  appendFilters(filterMask: number): void;

  /**
   * Show the dialog.
   *
   * @returns One of the return constants (returnOK, returnCancel, returnReplace)
   */
  show(): Promise<number>;

  /**
   * If true, the file is added to the operating system's "recent documents"
   * list.
   */
  addToRecentDocs: boolean;

  /** The extension for the type of files you want to work with (without leading dot). */
  defaultExtension: string;

  /** The filename, including extension, suggested to the user as a default. */
  defaultString: string;

  /** The directory that the file open/save dialog initially displays. */
  displayDirectory: string;

  /** The (0-based) index of the currently selected filter. */
  filterIndex: number;

  /** The selected file path (read-only). */
  readonly file: string;

  /** Array of selected file paths; only works with modeOpenMultiple (read-only). */
  readonly files: string[];

  /** The URI of the selected file or directory (read-only). */
  readonly fileURL: string;
}
