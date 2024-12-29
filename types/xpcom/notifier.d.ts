/// <reference path="../../internal.d.ts" />

declare namespace _ZoteroTypes {
  namespace Notifier {
    type Event =
      | "add"
      | "modify"
      | "delete"
      | "move"
      | "remove"
      | "refresh"
      | "redraw"
      | "trash"
      | "unreadCountUpdated"
      | "index"
      | "open"
      | "close"
      | "select";
    type Type =
      | "collection"
      | "search"
      | "share"
      | "share-items"
      | "item"
      | "file"
      | "collection-item"
      | "item-tag"
      | "tag"
      | "setting"
      | "group"
      | "trash"
      | "bucket"
      | "relation"
      | "feed"
      | "feedItem"
      | "sync"
      | "api-key"
      | "tab"
      | "itemtree"
      | "itempane";
    type Notify = (
      event: Event,
      type: Type,
      ids: string[] | number[],
      extraData: anyObj,
    ) => void | Promise<void>;
    interface Queue {
      id: string;
      _queue: { [type in Type]: Array<{ ids: string[]; data: anyObj }> };
      size: number;
      options: object;
      new (options?: object): this;
    }
  }
  interface Notifier {
    readonly EVENT_LEVEL_OPTIONS: ["autoSyncDelay", "skipAutoSync"];

    /**
     * @param {Object} [ref] signature {notify: function(event, type, ids, extraData) {}}
     * @param {Array} [types] a list of types of events observer should be triggered on
     * @param {String} [id] an id of the observer used in debug output
     * @param {Integer} [priority] lower numbers correspond to higher priority of observer execution
     * @returns {string}
     */
    registerObserver(
      ref: { notify: Notifier.Notify },
      types?: Notifier.Type[],
      id?: string,
      priority?: number,
    ): string;

    unregisterObserver(id: string): void;

    /**
     * Trigger a notification to the appropriate observers
     *
     * Possible values:
     *
     * 	event: 'add', 'modify', 'delete', 'move' ('c', for changing parent),
     *		'remove' (ci, it), 'refresh', 'redraw', 'trash', 'unreadCountUpdated', 'index'
     * 	type - 'collection', 'search', 'item', 'collection-item', 'item-tag', 'tag',
     *		'group', 'relation', 'feed', 'feedItem'
     * 	ids - single id or array of ids
     *
     * Notes:
     *
     * - If event queuing is on, events will not fire until commit() is called
     * unless _force_ is true.
     *
     * - New events and types should be added to the order arrays in commit()
     **/
    trigger(
      event: Notifier.Event,
      type: Notifier.Type,
      ids: number | number[],
      extraData?: anyObj,
      force?: boolean,
    ): Promise<void | true>;

    /**
     * Queue an event until the end of the current notifier transaction
     *
     * Takes the same parameters as trigger()
     *
     * @throws If a notifier transaction isn't currently open
     */
    queue(
      event: Notifier.Event,
      type: Notifier.Type,
      ids: string[],
      extraData: { [option in "autoSyncDelay" | "skipAutoSync"]: unknown },
      queue: Notifier.Queue,
    ): void;

    /**
     * Begin queueing event notifications (i.e. don't notify the observers)
     *
     * Note: Be sure the matching commit() gets called (e.g. in a finally{...} block) or
     * notifications will break until Firefox is restarted or commit(true)/reset() is called manually
     *
     * @param {String} [transactionID]
     */
    begin(transactionID?: boolean): void;

    /**
     * Send notifications for ids in the event queue
     *
     * @param {Zotero.Notifier.Queue|Zotero.Notifier.Queue[]} [queues] - One or more queues to use
     *     instead of the internal queue
     * @param {String} [transactionID]
     */
    commit(
      queues?: Notifier.Queue | Notifier.Queue[],
      transactionID?: boolean,
    ): Promise<void>;

    /*
     * Reset the event queue
     */
    reset(transactionID?: boolean): void;
  }
}

declare namespace Zotero {
  const Notifier: _ZoteroTypes.Notifier;
}
