export * from "./common";
export declare enum SUPPORTED_TYPESI {
    INFO = 0,
    HELP = 1,
    WRONG = 2,
    SUCCESS = 3,
    WARNING = 4,
}
export declare class TNSFancyAlert {
    static shouldDismissOnTapOutside: boolean;
    static showSuccess(title: string, subTitle?: string, closeBtnTitle?: string): Promise<any>;
    static showError(title: string, subTitle?: string, closeBtnTitle?: string): Promise<any>;
    static showNotice(title: string, subTitle?: string, closeBtnTitle?: string): Promise<any>;
    static showWarning(title: string, subTitle?: string, closeBtnTitle?: string): Promise<any>;
    static showInfo(title: string, subTitle?: string, closeBtnTitle?: string): Promise<any>;
}
