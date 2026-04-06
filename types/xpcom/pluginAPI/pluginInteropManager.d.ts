declare namespace _ZoteroTypes {
  namespace PluginInteropManager {
    /**
     * Options for registering a command.
     */
    interface RegistrationOptions {
      /** The plugin ID of the command provider */
      pluginID: string;
      /** A unique name for this command (unique per plugin) */
      commandName: string;
      /**
       * Semantic version of the command (e.g., "1.0.0").
       * Defaults to the plugin version if not specified.
       */
      commandVersion?: string;
      /**
       * The command function.
       * Receives a single argument `{ callerPluginID, data }` where `data` is the
       * value passed by the caller. Must only accept and return transferable types:
       * primitives (string, number, boolean, null, undefined),
       * plain objects, and arrays of these types.
       */
      command: (args: { callerPluginID: string; data: any }) => any;
    }

    /**
     * Options for retrieving a command from another plugin.
     */
    interface GetCommandOptions {
      /**
       * The calling plugin's ID.
       * Automatically injected in unprivileged scopes; required in privileged
       * scopes unless `checkOnly` is true.
       */
      callerPluginID?: string;
      /** The command provider's plugin ID */
      targetPluginID: string;
      /** The name of the command */
      commandName: string;
      /** Minimum acceptable command version (inclusive, semver) */
      minVersion?: string;
      /** Maximum acceptable command version (inclusive, semver) */
      maxVersion?: string;
      /**
       * If true, only check availability without creating a wrapper.
       * Returns `OK` (0) if available, or an error status code.
       */
      checkOnly?: boolean;
    }

    /** Command found and available */
    type OK = 0;
    /** Command not registered */
    type NOT_FOUND = 1;
    /** Command version below minVersion */
    type VERSION_TOO_LOW = 2;
    /** Command version exceeds maxVersion */
    type VERSION_TOO_HIGH = 3;
    /** Caller not allowed to access command */
    type PERMISSION_DENIED = 4;

    type StatusCode =
      | OK
      | NOT_FOUND
      | VERSION_TOO_LOW
      | VERSION_TOO_HIGH
      | PERMISSION_DENIED;
  }

  interface PluginInteropManager {
    /** Command found and available */
    readonly OK: PluginInteropManager.OK;
    /** Command not registered */
    readonly NOT_FOUND: PluginInteropManager.NOT_FOUND;
    /** Command version below minVersion */
    readonly VERSION_TOO_LOW: PluginInteropManager.VERSION_TOO_LOW;
    /** Command version exceeds maxVersion */
    readonly VERSION_TOO_HIGH: PluginInteropManager.VERSION_TOO_HIGH;
    /** Caller not allowed to access command */
    readonly PERMISSION_DENIED: PluginInteropManager.PERMISSION_DENIED;

    /**
     * Register a command for other plugins to use.
     *
     * @returns The registration key on success, or false if validation failed
     *
     * @example
     * ```js
     * Zotero.PluginInteropManager.register({
     *     pluginID: "provider-plugin@example.com",
     *     commandName: "greet",
     *     commandVersion: "1.2.0",
     *     command({ callerPluginID, data }) {
     *         return "Hello, " + data.name;
     *     },
     * });
     * ```
     */
    register(options: PluginInteropManager.RegistrationOptions): string | false;

    /**
     * Unregister a previously registered command.
     *
     * @param registrationKey - The key returned by `register()`
     */
    unregister(registrationKey: string): boolean;

    /**
     * Get a registered command from another plugin.
     *
     * Returns a callable function on success, or a status code on failure.
     * The returned function accepts a single `data` argument which is passed
     * to the registered command along with the caller's plugin ID.
     *
     * Pass `checkOnly: true` to verify availability without creating a wrapper.
     *
     * @example
     * ```js
     * let greet = Zotero.PluginInteropManager.getCommand({
     *     targetPluginID: "provider-plugin@example.com",
     *     commandName: "greet",
     *     minVersion: "1.0.0",
     * });
     * if (typeof greet === "function") {
     *     let greeting = greet({ name: "World" }); // "Hello, World"
     * }
     * else if (greet === Zotero.PluginInteropManager.NOT_FOUND) {
     *     // Command not registered
     * }
     * ```
     */
    getCommand(
      options: PluginInteropManager.GetCommandOptions,
    ): ((data: any) => any) | PluginInteropManager.StatusCode;
  }
}
