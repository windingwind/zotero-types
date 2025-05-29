/// <reference path="data/item.d.ts" />

declare namespace _ZoteroTypes {
  namespace FileHandlers {
    interface Location {
      annotationID?: string;
      pageIndex?: number;
      position?: { value: string };
    }

    interface OpenParams {
      location?: Location;
      openInWindow?: boolean;
    }

    interface FileHandlerOpenOptions {
      filePath: string;
      location?: Location;
      page?: number;
    }

    interface FileHandler {
      name: RegExp;
      fallback?: boolean;
      open(
        appPath: string | null,
        options: FileHandlerOpenOptions,
      ): Promise<void>;
    }

    interface Platform {
      pdf: FileHandler[];
      epub: FileHandler[];
    }
  }

  interface FileHandlers {
    open(item: Zotero.Item, params?: FileHandlers.OpenParams): Promise<boolean>;
    _handlersMac: FileHandlers.Platform;
    _handlersWin: FileHandlers.Platform;
    _handlersLinux: FileHandlers.Platform;
    _getSystemHandler(mimeType: string): string | false;
    _getSystemHandlerWin(mimeType: string): string | false;
    _getSystemHandlerPOSIX(mimeType: string): string | false;
    _checkAndExecWithoutBlocking(
      command: string,
      args: string[],
    ): Promise<void>;
  }
}

declare namespace Zotero {
  const FileHandlers: _ZoteroTypes.FileHandlers;

  namespace OpenPDF {
    /**
     * @deprecated - use Zotero.FileHandlers.open
     */
    function openToPage(
      item: Zotero.Item,
      page: number,
      annotationKey?: string,
    ): Promise<void>;
  }
}
