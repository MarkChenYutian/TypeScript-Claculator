type ClacOperator = number | string;

interface ClacState {
    S: Array<number>;
    Q: Array<ClacOperator>;
    T: Map<string, Array<ClacOperator>>;
};

interface SettingState {
    showFunctions: boolean;
    showTrace: boolean;
}

interface ClacFunctionEntry {
    K: string;
    V: Array<ClacOperator>;
};
