declare namespace _ZoteroTypes {

    namespace Annotations {
        type AnnotationType = 'highlight' | 'image' | 'ink' | 'note';
    }

    interface Annotations {
        [key: string]: unknown
    }

}
