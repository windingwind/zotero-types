/// <reference path="dataObject.d.ts" />
/// <reference path="../attachments.d.ts" />
/// <reference path="../annotations.d.ts" />

declare namespace _ZoteroTypes {
  /*
   * Constructor for Item object
   */
  namespace Item {
    type DataType =
      | "primaryData"
      | "creators"
      | "itemData"
      | "note"
      | "annotation"
      | "annotationDeferred"
      | "childItems"
      | "tags"
      | "collections"
      | "relations";
    type ItemType =
      | "attachment-file"
      | "document"
      | "attachment-link"
      | "attachment-pdf"
      | "attachment-pdf-link"
      | "attachment-snapshot"
      | "attachment-web-link"
      | "artwork"
      | "audioRecording"
      | "bill"
      | "blogPost"
      | "book"
      | "bookSection"
      | "case"
      | "computerProgram"
      | "conferencePaper"
      | "dictionaryEntry"
      | "email"
      | "encyclopediaArticle"
      | "film"
      | "forumPost"
      | "hearing"
      | "instantMessage"
      | "interview"
      | "journalArticle"
      | "letter"
      | "magazineArticle"
      | "manuscript"
      | "newspaperArticle"
      | "note"
      | "patent"
      | "preprint"
      | "presentation"
      | "report"
      | "statute"
      | "thesis"
      | "webpage"
      | "map"
      | "podcast"
      | "radioBroadcast"
      | "tvBroadcast"
      | "videoRecording";
    type PrimaryField =
      | "itemID"
      | "itemTypeID"
      | "dateAdded"
      | "dateModified"
      | "libraryID"
      | "key"
      | "version"
      | "synced"
      | "createdByUserID"
      | "lastModifiedByUserID"
      | "firstCreator"
      | "sortCreator"
      | "deleted"
      | "inPublications"
      | "parentID"
      | "parentKey"
      | "attachmentCharset"
      | "attachmentLinkMode"
      | "attachmentContentType"
      | "attachmentPath"
      | "attachmentSyncState"
      | "attachmentSyncedModificationTime"
      | "attachmentSyncedHash"
      | "attachmentLastProcessedModificationTime"
      | "feedItemGUID"
      | "feedItemReadTime"
      | "feedItemTranslatedTime";
    type ItemField =
      | "title"
      | "firstCreator"
      | "abstractNote"
      | "artworkMedium"
      | "medium"
      | "artworkSize"
      | "date"
      | "language"
      | "shortTitle"
      | "archive"
      | "archiveLocation"
      | "libraryCatalog"
      | "callNumber"
      | "url"
      | "accessDate"
      | "rights"
      | "extra"
      | "audioRecordingFormat"
      | "seriesTitle"
      | "volume"
      | "numberOfVolumes"
      | "place"
      | "label"
      | "publisher"
      | "runningTime"
      | "ISBN"
      | "billNumber"
      | "number"
      | "code"
      | "codeVolume"
      | "section"
      | "codePages"
      | "pages"
      | "legislativeBody"
      | "session"
      | "history"
      | "blogTitle"
      | "publicationTitle"
      | "websiteType"
      | "type"
      | "series"
      | "seriesNumber"
      | "edition"
      | "numPages"
      | "bookTitle"
      | "caseName"
      | "court"
      | "dateDecided"
      | "docketNumber"
      | "reporter"
      | "reporterVolume"
      | "firstPage"
      | "versionNumber"
      | "system"
      | "company"
      | "programmingLanguage"
      | "proceedingsTitle"
      | "conferenceName"
      | "DOI"
      | "dictionaryTitle"
      | "subject"
      | "encyclopediaTitle"
      | "distributor"
      | "genre"
      | "videoRecordingFormat"
      | "forumTitle"
      | "postType"
      | "committee"
      | "documentNumber"
      | "interviewMedium"
      | "issue"
      | "seriesText"
      | "journalAbbreviation"
      | "ISSN"
      | "letterType"
      | "manuscriptType"
      | "mapType"
      | "scale"
      | "country"
      | "assignee"
      | "issuingAuthority"
      | "patentNumber"
      | "filingDate"
      | "applicationNumber"
      | "priorityNumbers"
      | "issueDate"
      | "references"
      | "legalStatus"
      | "episodeNumber"
      | "audioFileType"
      | "repository"
      | "archiveID"
      | "citationKey"
      | "presentationType"
      | "meetingName"
      | "programTitle"
      | "network"
      | "reportNumber"
      | "reportType"
      | "institution"
      | "nameOfAct"
      | "codeNumber"
      | "publicLawNumber"
      | "dateEnacted"
      | "thesisType"
      | "university"
      | "studio"
      | "websiteTitle";

    // [...new Set(Object.values(Zotero.ItemTypes._types).map(t => `${t.id}: "${t.name}"`))].join(';\n')
    type ItemTypeMapping = {
      1: "annotation";
      2: "artwork";
      3: "attachment";
      4: "audioRecording";
      5: "bill";
      6: "blogPost";
      7: "book";
      8: "bookSection";
      9: "case";
      10: "computerProgram";
      11: "conferencePaper";
      12: "dictionaryEntry";
      13: "document";
      14: "email";
      15: "encyclopediaArticle";
      16: "film";
      17: "forumPost";
      18: "hearing";
      19: "instantMessage";
      20: "interview";
      21: "journalArticle";
      22: "letter";
      23: "magazineArticle";
      24: "manuscript";
      25: "map";
      26: "newspaperArticle";
      27: "note";
      28: "patent";
      29: "podcast";
      30: "preprint";
      31: "presentation";
      32: "radioBroadcast";
      33: "report";
      34: "statute";
      35: "thesis";
      36: "tvBroadcast";
      37: "videoRecording";
      38: "webpage";
      39: "dataset";
      40: "standard";
    };

    type CreatorTypeMapping = {
      1: "artist";
      2: "contributor";
      3: "performer";
      4: "composer";
      5: "wordsBy";
      6: "sponsor";
      7: "cosponsor";
      8: "author";
      9: "commenter";
      10: "editor";
      11: "translator";
      12: "seriesEditor";
      13: "bookAuthor";
      14: "counsel";
      15: "programmer";
      16: "reviewedAuthor";
      17: "recipient";
      18: "director";
      19: "scriptwriter";
      20: "producer";
      21: "interviewee";
      22: "interviewer";
      23: "cartographer";
      24: "inventor";
      25: "attorneyAgent";
      26: "podcaster";
      27: "guest";
      28: "presenter";
      29: "castMember";
    };

    type CreatorTypeID = keyof CreatorTypeMapping;
    type CreatorType = CreatorTypeMapping[keyof CreatorTypeMapping];

    /**
     * Creator json for API
     * When Creator.fieldMode == 1, CreatorJSON.name == string,
     * else CreatosJSON.firstName and Creator.lastName == string
     */
    interface CreatorJSON {
      creatorType: CreatorTypeMapping[keyof CreatorTypeMapping];
      firstName?: string;
      name?: string;
      lastName?: string;
    }
    interface Creator {
      creatorTypeID: keyof CreatorTypeMapping;
      fieldMode: 0 | 1;
      firstName: string;
      lastName: string;
    }
  }
}
