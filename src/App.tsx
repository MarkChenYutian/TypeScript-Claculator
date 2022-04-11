import React, { useState } from 'react';

import { Typography, Container, Stack, Button, Divider, Box, Alert, AlertTitle, IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';

import PlayArrowTwoToneIcon from '@mui/icons-material/PlayArrowTwoTone';
import SkipNextTwoToneIcon from '@mui/icons-material/SkipNextTwoTone';
import SettingsIcon from '@mui/icons-material/Settings';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { EmbedClacUserInterface } from './components/clac_input';
import { EmbedClacStateDisplay } from './components/clac_state';
import FunctionTable from './components/func_table';


import * as ClacCore from './functions/clac_core';
import { Check } from '@mui/icons-material';
import { ClacStateTrace } from './components/clac_trace';

function stateEqual(s1: ClacState, s2: ClacState): boolean {
    if (s1 === undefined || s2 === undefined) return false;
    return (s1.S.length === s2.S.length && s1.S.every((val, index) => val === s2.S[index]))
        && (s1.Q.length === s2.Q.length && s1.Q.every((val, index) => val === s2.Q[index]));
}

function updateState_Step(state: ClacState,
                     inputSeq: ClacOperator[],
                     history: ClacState[],
                     setState: Function,
                     setInputSeq: Function,
                     setErr: Function,
                     setHistory: Function,
                     inputRef: React.MutableRefObject<any>,
                     mode: "step" | "run"
                     ){
    let newhistory = [...history];
    if (mode === "step"){
        try{
            const newState = ClacCore.step(state);
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
            const newState = ClacCore.run(state);
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
    }
    if (inputRef.current.value !== ""){
        inputSeq.forEach((tok) => { state.Q.push(tok); });
        inputRef.current.value = "";
        setInputSeq([]);
        setState(state);
    }
}

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
    // Settings Menu
    const [MenuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchor(event.currentTarget);
      };
    const handleClose = () => {
        setMenuAnchor(null);
    };
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
                            Restart
                        </Button>
                    }
                    step_btn={
                        <Button
                        variant='outlined' startIcon={<PlayArrowTwoToneIcon/>} color="success"
                        onClick={() => updateState_Step(
                            clacState, inputTokens, history, setClacState, setInputTokens, setErrMessage, setHistory, textInputRef, "step"
                        )}>
                            Step
                        </Button>}
                    run_btn={
                        <Button
                        variant='outlined' startIcon={<SkipNextTwoToneIcon/>} color="success"
                        onClick={() => updateState_Step(
                            clacState, inputTokens, history, setClacState, setInputTokens, setErrMessage, setHistory, textInputRef, "run"
                        )}>
                            Run
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
                <Stack direction="row" sx={{justifyContent: "flex-end", alignItems: "center"}}>
                    <IconButton
                        onClick={handleClick}
                    ><SettingsIcon/></IconButton>
                </Stack>
                <Menu
                    id="settings"
                    MenuListProps={{
                        'aria-labelledby': 'long-button',
                    }}
                    anchorEl={MenuAnchor}
                    open={Boolean(MenuAnchor)}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={() => {setSetting({
                        showFunctions: setting.showFunctions,
                        showTrace: !setting.showTrace
                    })}}>
                        {setting.showTrace ? <ListItemIcon><Check/></ListItemIcon> : undefined}
                        <ListItemText inset={!setting.showTrace}>
                            Show Trace
                        </ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => {setSetting({
                        showFunctions: !setting.showFunctions,
                        showTrace: setting.showTrace
                    })}}>
                        {setting.showFunctions ? <ListItemIcon><Check/></ListItemIcon> : undefined}
                        <ListItemText inset={!setting.showFunctions}>
                            Show Function Table
                        </ListItemText>
                    </MenuItem>
                </Menu>
            </Box>
            <Stack direction="row" sx={{justifyContent: "flex-end", alignItems: "center"}}>
                <Typography variant='body2' sx={{ color: "#AAA"}}>Embeddable Clac, by <a href="https://markchenyutian.github.io/blog/about.html">Yutian Chen</a></Typography>
            </Stack>
        </Container>
    );
}

export default App;
