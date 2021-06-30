export declare const PUBLISH: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        type: StringConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
export declare const LIST: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        type: StringConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    } | {
        name: string;
        description: string;
        type: BooleanConstructor;
        alias?: undefined;
    })[];
    content?: undefined;
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
export declare const VERSION_CONFIG: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        type: StringConstructor;
    } | {
        name: string;
        description: string;
        type: NumberConstructor;
    })[];
    content?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
export declare const DELETE_VERSION: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        type: StringConstructor;
    } | {
        name: string;
        description: string;
        type: NumberConstructor;
    })[];
    content?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
export declare const DELETE_LAYER: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        type: StringConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
export declare const VERSIONS: ({
    header: string;
    content: string;
    optionList?: undefined;
} | {
    header: string;
    optionList: {
        name: string;
        description: string;
        type: StringConstructor;
    }[];
    content?: undefined;
} | {
    header: string;
    optionList: ({
        name: string;
        description: string;
        alias: string;
        type: BooleanConstructor;
    } | {
        name: string;
        description: string;
        type: BooleanConstructor;
        alias?: undefined;
    })[];
    content?: undefined;
} | {
    header: string;
    content: string[];
    optionList?: undefined;
})[];
