import React, { useState } from 'react';

import { Typography, Container, Stack, Button, Divider, Box, Alert, AlertTitle, Switch, FormControlLabel, FormGroup } from '@mui/material';

import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone';
import SkipNextTwoToneIcon from '@mui/icons-material/SkipNextTwoTone';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { EmbedClacUserInterface } from './components/clac_input';
import { EmbedClacStateDisplay } from './components/clac_state';
import FunctionTable from './components/func_table';
import { ClacStateTrace } from './components/clac_trace';

import * as ClacCore from './functions/clac_core';

function App(props: any) {
    // Input from User
    const [inputTokens, setInputTokens] = useState<ClacOperator[]>([]);
    // Inner State
    const [clacState, setClacState] = useState<ClacState>({
        S: [],
        Q: [],
        T: new Map<string, Array<ClacOperator>>()
    });
    // Error Handle
    const [err, setErrMessage] = useState<string>("");
    // Settings State
    const [setting, setSetting] = useState<SettingState>({
        showFunctions: false,
        showTrace: false
    });
    // Clac Trace
    const [history, setHistory] = useState<ClacState[]>([]);
    // Clear textfield
    const textInputRef = React.useRef(null);

    return (
        <Container>
            <Box sx={{ width: '100%', border: '1px solid #CBCBCB', borderRadius: '.5rem', p: 1 }}>
                <EmbedClacUserInterface
                    setInputTokens={setInputTokens}
                    inputTokens={inputTokens}
                    inputRef={textInputRef}
                    restart_btn={
                        <Button
                        variant='outlined' startIcon={<RestartAltIcon/>} color="error"
                        onClick={() => { ClacCore.restart(setClacState, setErrMessage, setHistory); }}>
                            <Typography sx={{ display: {xs: 'none', sm: 'block'} }}>Restart</Typography>
                        </Button>
                    }
                    step_btn={
                        <Button
                        variant='outlined' startIcon={<PlayArrowTwoToneIcon/>} color="success"
                        onClick={() => ClacCore.execute(
                            clacState, inputTokens, history, setClacState, setInputTokens, setErrMessage, setHistory, textInputRef, "step"
                        )}>
                            <Typography sx={{ display: {xs: 'none', sm: 'block'} }}>Step</Typography>
                        </Button>}
                    run_btn={
                        <Button
                        variant='outlined' startIcon={<SkipNextTwoToneIcon/>} color="success"
                        onClick={() => ClacCore.execute(
                            clacState, inputTokens, history, setClacState, setInputTokens, setErrMessage, setHistory, textInputRef, "run"
                        )}>
                            <Typography sx={{ display: {xs: 'none', sm: 'block'} }}>Run</Typography>
                        </Button>
                    }
                />
                { err === "" ? undefined : <Alert severity='warning' sx={{m: 1}}>
                    <AlertTitle>Clac Core Exception</AlertTitle>
                    {err}
                    </Alert>
                }

                <Divider style={{ margin: "1rem 0" }}></Divider>
                <EmbedClacStateDisplay state={clacState}/>
                {setting.showFunctions ? <FunctionTable S={clacState}/>: undefined}

                {setting.showTrace ? <Divider style={{ margin: "1rem 0" }}/> : undefined}
                {setting.showTrace ? <ClacStateTrace history={history}/>: undefined}
                
                <Divider style={{ margin: "1rem 0" }}></Divider>

                <Typography variant='body1'>Printout</Typography>
                <Box sx={{ border: '1px solid #CBCBCB', borderRadius: '.5rem', p: 1, minHeight: '1rem'}}>
                    <Typography>
                        <pre id="claculator-output" style={{ maxHeight: '10rem', overflowY: 'auto' }}>
                        </pre>
                    </Typography>
                </Box>
                {/* <Stack direction="row" sx={{justifyContent: "flex-end", alignItems: "center"}}>
                </Stack> */}
                <FormGroup row={true}>
                    <FormControlLabel
                        control={<Switch onChange={() => {setSetting({
                            showFunctions: setting.showFunctions,
                            showTrace: !setting.showTrace
                        })}}/>}
                        label="Show Trace"
                    />
                    <FormControlLabel
                        control={<Switch onChange={() => {setSetting({
                            showFunctions: !setting.showFunctions,
                            showTrace: setting.showTrace
                        })}}/>}
                        label="Functions Table"
                    />
                </FormGroup>
            </Box>
            <Stack direction="row" sx={{justifyContent: "flex-end", alignItems: "center"}}>
                <Typography variant='body2' sx={{ color: "#AAA"}}>Embeddable Clac, by <a href="https://markchenyutian.github.io/blog/about.html">Yutian Chen</a></Typography>
            </Stack>
        </Container>
    );
}

export default App;
