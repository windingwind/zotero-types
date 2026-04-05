// Auto-generated gecko globals — extracted from types/gecko/
// Do not edit manually. Run `npx zotero-types generate-bundled` to regenerate.

interface ResourceId {
  optional?: boolean;
  path: string;
}

type L10nResourceId = string | ResourceId;

type L10nArgs = Record<string, string | number | null>;

interface L10nIdArgs {
  args?: L10nArgs | null;
  id?: string | null;
}

type L10nKey = string | L10nIdArgs;

interface AttributeNameValue {
  name: string;
  value: string;
}

interface L10nMessage {
  attributes?: AttributeNameValue[] | null;
  value?: string | null;
}

interface Localization {
  addResourceIds(aResourceIds: L10nResourceId[]): void;
  formatMessages(aKeys: L10nKey[]): Promise<(L10nMessage | null)[]>;
  formatMessagesSync(aKeys: L10nKey[]): (L10nMessage | null)[];
  formatValue(aId: string, aArgs?: L10nArgs): Promise<string | null>;
  formatValueSync(aId: string, aArgs?: L10nArgs): string | null;
  formatValues(aKeys: L10nKey[]): Promise<(string | null)[]>;
  formatValuesSync(aKeys: L10nKey[]): (string | null)[];
  removeResourceIds(aResourceIds: L10nResourceId[]): number;
  setAsync(): void;
}

interface Localization {
  addResourceIds(aResourceIds: Iterable<L10nResourceId>): void;
  formatMessages(aKeys: Iterable<L10nKey>): Promise<(L10nMessage | null)[]>;
  formatMessagesSync(aKeys: Iterable<L10nKey>): (L10nMessage | null)[];
  formatValues(aKeys: Iterable<L10nKey>): Promise<(string | null)[]>;
  formatValuesSync(aKeys: Iterable<L10nKey>): (string | null)[];
  removeResourceIds(aResourceIds: Iterable<L10nResourceId>): number;
}

// https://github.com/microsoft/TypeScript-DOM-lib-generator/issues/1736
interface Localization {
  formatValuesSync(aKeys: L10nKey[]): (string | null)[];
}
