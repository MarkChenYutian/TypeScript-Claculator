const keywords: Set<string> = new Set([
    "print", "quit", "+", "-", "*", "/", "%", "**", "<", "drop", "swap", "rot", "if",
    "pick", "skip", ":", ";"
]);

function defineFunction(oldState: ClacState) {
    const state: ClacState = {Q: oldState.Q, S: oldState.S, T: oldState.T};
    const K = state.Q.shift();
    if (K === undefined) throw new Error("Not enough Operand");
    if (typeof K === 'number') throw new Error("Unable to Redefine Number");
    if (keywords.has(K)) throw new Error("Unable to Redefine Reserved Keywords");
    const V = [];
    let new_tok = state.Q.shift();
    while (new_tok !== undefined && new_tok !== ";") {
        V.push(new_tok);
        new_tok = state.Q.shift();
    }
    state.T.set(K, V);
    return state;
}

function step(oldState: ClacState) {
    const state: ClacState = {Q: oldState.Q, S: oldState.S, T: oldState.T};
    const tok: ClacOperator | undefined = state.Q.shift();
    if (tok === undefined) {
        return state; // Do nothing
    } else {
        if (typeof tok === 'number') {
            state.S.push(tok);
        } else if (keywords.has(tok)) {
            if (tok === "+") {
                const y = state.S.pop();
                const x = state.S.pop();
                if (x === undefined || y === undefined) throw new Error("Not enough Operand");
                state.S.push(x + y);
            } else if (tok === "-") {
                const y = state.S.pop();
                const x = state.S.pop();
                if (x === undefined || y === undefined) throw new Error("Not enough Operand");
                state.S.push(x - y);
            } else if (tok === "*") {
                const y = state.S.pop();
                const x = state.S.pop();
                if (x === undefined || y === undefined) throw new Error("Not enough Operand");
                state.S.push(x * y);
            } else if (tok === "/") {
                const y = state.S.pop();
                const x = state.S.pop();
                if (x === undefined || y === undefined) throw new Error("Not enough Operand");
                if (y === 0) throw new Error("Divide by zero");
                state.S.push(parseInt("" + x / y));
            } else if (tok === "%") {
                const y = state.S.pop();
                const x = state.S.pop();
                if (x === undefined || y === undefined) throw new Error("Not enough Operand");
                if (y === 0) throw new Error("Divide by zero");
                state.S.push(parseInt("" + x % y))
            } else if (tok === "**") {
                const y = state.S.pop();
                const x = state.S.pop();
                if (x === undefined || y === undefined) throw new Error("Not enough Operand");
                if (y < 0) throw new Error("Negative Exponential Not Supported");
                state.S.push(parseInt("" + Math.pow(x, y)));
            } else if (tok === "<") {
                const y = state.S.pop();
                const x = state.S.pop();
                if (x === undefined || y === undefined) throw new Error("Not enough Operand");
                state.S.push(x < y ? 1 : 0);
            } else if (tok === "drop") {
                const x = state.S.pop();
                if (x === undefined) throw new Error("Not enough Operand");
            } else if (tok === "swap") {
                const y = state.S.pop();
                const x = state.S.pop();
                if (x === undefined || y === undefined) throw new Error("Not enough Operand");
                state.S.push(y);
                state.S.push(x);
            } else if (tok === "rot") {
                const z = state.S.pop();
                const y = state.S.pop();
                const x = state.S.pop();
                if (x === undefined
                    || y === undefined
                    || z === undefined) throw new Error("Not enough Operand");
                state.S.push(y);
                state.S.push(z);
                state.S.push(x);
            } else if (tok === "if") {
                const cond = state.S.pop();
                if (cond === undefined) throw new Error("Not enough Operand");
                if (cond === 0) {
                    let cnt = 3;
                    while (cnt > 0){
                        if (state.Q.shift() === undefined) throw new Error("Not enough Operand");
                        cnt -= 1;
                    }
                }
            } else if (tok === "pick") {
                const val = state.S.pop();
                let index = val;
                if (index === undefined || val === undefined) throw new Error("Not enough Operand");
                if (index < 0) throw new Error("Unable to pick on negative index");
                const temp = [];
                while (index > 0) {
                    const x = state.S.pop();
                    if (x === undefined) throw new Error("Not enough Operand");
                    temp.push(x);
                    index -= 1;
                }
                const picked = temp[temp.length - 1];
                while (index < val) {
                    const x = temp.pop();
                    if (x === undefined) throw new Error("Unexpected Error: Not enough element to put back");
                    state.S.push(x);
                    index += 1;
                }
                state.S.push(picked);
            } else if (tok === "skip") {
                let index = state.S.pop();
                if (index === undefined) throw new Error("Not enough Operand");
                if (index < 0) throw new Error("Unable to pick on negative index");
                while (index > 0) {
                    const x = state.S.pop();
                    if (x === undefined) throw new Error("Not enough Operand");
                    index -= 1;
                }
            } else if (tok === ";") {
                throw new Error("Unexpected Operator: EndDef (;)");
            } else if (tok === ":") {
                return defineFunction(state);
            } else if (tok === "print") {
                const x = state.S.pop();
                if (x === undefined) throw new Error("Not enough Operand");
                const output = document.getElementById("claculator-output");
                if (output !== null) output.textContent += x + "\n";
            }
        } else if (state.T.has(tok)) {
            const seq: ClacOperator[] | undefined = state.T.get(tok);
            if (seq === undefined) { throw new Error("Undefined Symbol"); }
            let temp: ClacOperator[] = [];
            seq.forEach((op) => {temp.push(op);})
            while (temp.length > 0) {
                const _ = temp.pop()
                if (_ === undefined) { throw new Error("Unexpected undefined");}
                state.Q.unshift(_);
            }
        } else {
            throw new Error("Undefined Symbol");
        }
    }
    return state;
}

function stateEqual(s1: ClacState, s2: ClacState): boolean {
    if (s1 === undefined || s2 === undefined) return false;
    return (s1.S.length === s2.S.length && s1.S.every((val, index) => val === s2.S[index]))
        && (s1.Q.length === s2.Q.length && s1.Q.every((val, index) => val === s2.Q[index]));
}

export function restart(setState: Function, setErr: Function, setTrace: Function){
    const newState: ClacState = {
        S: [],
        Q: [],
        T: new Map<string, ClacOperator[]>()
    };
    const output = document.getElementById("claculator-output");
    if (output !== null) output.textContent = "";
    setState(newState);
    setErr("");
    setTrace([]);
}


export function execute(
    state: ClacState, inputSeq: ClacOperator[], history: ClacState[],
    setState: Function, setInputSeq: Function, setErr: Function, setHistory: Function,
    inputRef: React.MutableRefObject<any>,
    mode: "step" | "run"
) {
    let newhistory = [...history];

    if (inputRef.current.value !== ""){
        inputSeq.forEach((tok) => { state.Q.push(tok); });
        inputRef.current.value = "";
        setInputSeq([]);
        setState(state);
        newhistory.push(
            {
                S: [...state.S],
                Q: [...state.Q],
                T: state.T
            }
        );
        setHistory(newhistory);
    }
    
    if (mode === "step"){
        try{
            const newState = step(state);
            if (!stateEqual(newState, history[history.length - 1])) {
                newhistory.push(
                    {
                        S: [...newState.S],
                        Q: [...newState.Q],
                        T: newState.T
                    }
                );
                setHistory(newhistory);
            }
            setState(newState);
        } catch (e) {
            setErr(e + "");
        }
    } else {
        try{
            while (state.Q.length > 0) {
                state = step(state);
                if (!stateEqual(state, history[history.length - 1])) {
                    newhistory.push(
                        {
                            S: [...state.S],
                            Q: [...state.Q],
                            T: state.T
                        }
                    );
                    setHistory(newhistory);
                }
                setState(state);
            }
            
        } catch (e) {
            setErr(e + "");
        }
    }
}
