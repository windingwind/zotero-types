declare namespace _ZoteroTypes {
    namespace Attachments {
        enum LinkMode {
            importedFile = 0,
            importedUrl,
            linkedFile,
            linkedUrl,
            embeddedImage
        }
    }
    interface Attachments{
        [key: string]: unknown
    }
}