declare namespace _ZoteroTypes {
  namespace Reader {
    type SearchContext = {
      text: string;
      charDataRanges: CharDataRange[];
    };

    type CharDataRange = {
      charData: CharacterData;
      start: number;
      end: number;
    };
  }
}
