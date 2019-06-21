import * as React from 'react';
export declare enum EpubCalculationActionType {
    UPDATE_CALCULATION = "update_calculation"
}
export declare enum EpubCalculationProperties {
    TOTAL_PAGE = "totalPage",
    TOTAL = "total",
    PAGE_UNIT = "pageUnit",
    PAGE_CALCULATION_UNIT = "pageCalculationUnit",
    SPINES = "spines"
}
export declare type EpubCalculationAction = {
    type: EpubCalculationActionType.UPDATE_CALCULATION;
    calculation: Partial<EpubCalculationState>;
};
export declare type SpineCalculationState = {
    spineIndex: number;
    offset: number;
    total: number;
    startPage: number;
    totalPage: number;
};
export declare type EpubCalculationState = {
    [EpubCalculationProperties.TOTAL_PAGE]: number;
    [EpubCalculationProperties.TOTAL]: number;
    [EpubCalculationProperties.PAGE_UNIT]: number;
    [EpubCalculationProperties.PAGE_CALCULATION_UNIT]: number;
    [EpubCalculationProperties.SPINES]: Array<SpineCalculationState>;
};
export declare const initialEpubCalculationState: EpubCalculationState;
export declare const EpubCalculationReducer: React.Reducer<EpubCalculationState, EpubCalculationAction>;
export declare const EpubCalculationDispatchContext: React.Context<React.Dispatch<EpubCalculationAction>>, EpubCalculationContext: React.Context<EpubCalculationState>, EpubCalculationContextProvider: React.FunctionComponent<{
    children: React.ReactNode;
    customInitialState?: Partial<EpubCalculationState> | undefined;
}>;
