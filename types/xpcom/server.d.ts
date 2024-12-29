/// <reference path="../../internal.d.ts" />

declare namespace _ZoteroTypes {
  interface Server {
    responseCodes: {
      200: "OK";
      201: "Created";
      204: "No Content";
      300: "Multiple Choices";
      400: "Bad Request";
      403: "Forbidden";
      404: "Not Found";
      409: "Conflict";
      412: "Precondition Failed";
      500: "Internal Server Error";
      501: "Not Implemented";
      503: "Service Unavailable";
      504: "Gateway Timeout";
    };

    close(): void;

    /**
     * Parses a query string into a key => value object
     * @param {String} queryString Query string
     */
    decodeQueryString(queryString: string): Record<string, string>;

    /**
     * Endpoints for the HTTP server
     *
     * Each endpoint should take the form of an object. The init() method of this object will be passed:
     *     method - the method of the request ("GET" or "POST")
     *     data - the query string (for a "GET" request) or POST data (for a "POST" request)
     *     sendResponseCallback - a function to send a response to the HTTP request. This can be passed
     *                            a response code alone (e.g., sendResponseCallback(404)) or a response
     *                            code, MIME type, and response body
     *                            (e.g., sendResponseCallback(200, "text/plain", "Hello World!"))
     *
     * See connector/server_connector.js for examples
     */
    Endpoints: Record<string, typeof Server.Endpoint | Function>;
  }

  namespace Server {
    class Endpoint {
      supportedMethods?: string[];
      supportedDataTypes?: Array<
        | "application/json"
        | "application/x-www-form-urlencoded"
        | "multipart/form-data"
        | string
      >;
      permitBookmarklet?: boolean;

      init: initMethodEvent | initMethodPromise;
    }

    type initMethodPromise = (options: {
      method: "GET" | "POST";
      pathname: string;
      query: Record<string, string>;
      headers: Record<string, string>;
      data: any;
    }) => MaybePromise<
      | number
      | [
          code: number,
          contentTypeOrHeaders?: string | Record<string, string>,
          body?: string,
        ]
    >;

    type initMethodEvent = (
      data: string,
      sendResponseCallback: (
        code: number,
        contentTypeOrHeaders?: string | Record<string, string>,
        body?: string,
      ) => void,
    ) => void;
  }
}

declare namespace Zotero {
  const Server: _ZoteroTypes.Server;
}
