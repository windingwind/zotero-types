declare namespace _ZoteroTypes {
  interface PreferencePanes {
    builtInPanes: _ZoteroTypes._PreferencePaneOption[];
    pluginPanes: _ZoteroTypes._PreferencePaneOption[];

    /**
     * Register a pane to be displayed in the preferences. The pane XHTML (`src`)
     * is loaded as a fragment, not a full document, with XUL as the default
     * namespace and (X)HTML tags available under `html:`.
     *
     * The pane will be unregistered automatically when the registering plugin
     * shuts down.
     *
     * @param {Object} options
     * @param {String} options.pluginID ID of the plugin registering the pane
     * @param {String} options.src URI of an XHTML fragment, optionally relative to the plugin's root
     * @param {String} [options.id] Represents the pane and must be unique. Automatically generated if not provided
     * @param {String} [options.parent] ID of parent pane (if provided, pane is hidden from the sidebar)
     * @param {String} [options.label] Displayed as the pane's label in the sidebar.
     * 		If not provided, the plugin's name is used
     * @param {String} [options.image] URI of an icon to be displayed in the navigation sidebar, optionally relative to
     * 		the plugin's root. If not provided, the plugin's icon (from manifest.json) is used.
     * @param {String[]} [options.scripts] Array of URIs of scripts to load along with the pane, optionally relative to
     * 		the plugin's root
     * @param {String[]} [options.stylesheets] Array of URIs of CSS stylesheets to load along with the pane, optionally
     * 		relative to the plugin's root
     * @param {String} [options.helpURL] If provided, a help button will be displayed under the pane
     * 		and the provided URL will open when it is clicked
     * @return {Promise<String>} Resolves to the ID of the pane if successfully added
     */
    register(options: _ZoteroTypes._PreferencePaneOption): Promise<string>;

    /**
     * Called automatically on plugin shutdown.
     *
     * @param {String} id
     */
    unregister(id: string): void;

    _refreshPreferences(): void;

    _ensureObserverAdded(): void;
  }

  type _PreferencePaneOption = {
    pluginID: string;
    src: string;
    id?: string;
    parent?: string;
    label?: string;
    image?: string;
    scripts?: string[];
    stylesheets?: string[];
    helpURL?: string;
    defaultXUL?: boolean;
  };
}

declare namespace Zotero {
  const PreferencePanes: _ZoteroTypes.PreferencePanes;
}
