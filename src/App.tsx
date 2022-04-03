import React, { useState } from 'react';

import { Typography, Container, Stack, Button, Divider } from '@mui/material';

import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone';
import SkipNextTwoToneIcon from '@mui/icons-material/SkipNextTwoTone';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import ClacUserInterface from './components/clac_input';
import FunctionTable from './components/func_table';
import ClacStateDisplay from './components/clac_state';

import * as ClacCore from './functions/clac_core';
import { grey } from '@mui/material/colors';

function updateState_Step(state: ClacState,
                     inputSeq: ClacOperator[],
                     setState: Function,
                     setInputSeq: Function,
                     inputRef: React.MutableRefObject<any>,
                     mode: "step" | "run"
                     ){
    if (inputRef.current.value !== ""){
        inputSeq.forEach((tok) => { state.Q.push(tok); });
        inputRef.current.value = "";
        setInputSeq([]);
        setState(state);
    }
    if (mode === "step"){
        try{
            const newState = ClacCore.step(state);
            setState(newState);
        } catch (e) {
            alert(e + "\n(You may need to RESTART clac-ulator to make it function properly)");
        }
    } else {
        try{
            const newState = ClacCore.run(state);
            setState(newState);
        } catch (e) {
            alert(e + "\n(You may need to RESTART clac-ulator to make it function properly)");
        }
    }
}

function App() {
    // Input from User
    const [inputTokens, setInputTokens] = useState<ClacOperator[]>([]);
    // Inner State
    const [clacState, setClacState] = useState<ClacState>({
        S: [],
        Q: [],
        T: new Map<string, Array<ClacOperator>>()
    });
    // Clear textfield
    const textInputRef = React.useRef(null);


    return (
        <Container maxWidth='lg'>
            <Stack spacing={2}>
                <Typography variant='h3'>TypeScript <i>Clac</i>-ulator</Typography>
                <Stack direction='row' spacing={2} flexWrap='wrap'>
                    <Button
                        variant='outlined'
                        startIcon={<RestartAltIcon/>}
                        color="error"
                        onClick={() => {
                            ClacCore.restart(setClacState);
                        }}
                    >Restart</Button>
                    <Button
                        variant='outlined'
                        startIcon={<PlayArrowTwoToneIcon/>}
                        color="success"
                        onClick={() => updateState_Step(
                                                    clacState,
                                                    inputTokens,
                                                    setClacState,
                                                    setInputTokens,
                                                    textInputRef,
                                                    "step"
                                )}
                    >Step</Button>
                    <Button
                        variant='outlined'
                        startIcon={<SkipNextTwoToneIcon/>}
                        color="success"
                        onClick={() => updateState_Step(
                                                    clacState,
                                                    inputTokens,
                                                    setClacState,
                                                    setInputTokens,
                                                    textInputRef,
                                                    "run"
                                )}
                    >Run All</Button>
                </Stack>
                <ClacUserInterface
                    setInputTokens={setInputTokens}
                    inputTokens={inputTokens}
                    inputRef={textInputRef}
                />
                <Divider></Divider>
                <Typography variant='h4'>Output</Typography>
                <pre id="claculator-output" style={{backgroundColor: grey[200], minHeight: "3rem", borderRadius: "0.5rem", padding: "0.5rem 2rem"}}>

                </pre>
                <Divider></Divider>
                <Typography variant='h4'>Claculator State</Typography>
                <ClacStateDisplay state={clacState} />

                <Typography variant='h6'>Defined Symbols</Typography>
                <FunctionTable S={clacState} />
            </Stack>
        </Container>
    );
}

export default App;
