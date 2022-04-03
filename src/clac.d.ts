type ClacOperator = number | string;

interface ClacState {
    S: Array<number>;
    Q: Array<ClacOperator>;
    T: Map<string, Array<ClacOperator>>;
};
