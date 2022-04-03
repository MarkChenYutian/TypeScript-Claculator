import React from "react";

import { InputAdornment, TextField, Chip, Stack, Typography } from "@mui/material";

import CalculateIcon from '@mui/icons-material/Calculate';

const keywords: Set<string> = new Set([
    "print", "quit", "+", "-", "*", "/", "%", "**", "<", "drop", "swap", "rot", "if",
    "pick", "skip", ":", ";"
]);

function parseInput(input: string): Array<ClacOperator> {
    input = input.trim();
    if (input.length === 0){ return [];}
    let tokens: Array<string> = input.split(" ");
    let parsed: Array<ClacOperator> = [];
    tokens.forEach((token) => {
        if (isNaN(parseInt(token))){
            parsed.push(token);
        } else {
            parsed.push(parseInt(token));
        }
    })
    return parsed;
}

function showParsedResult(parsed: Array<ClacOperator>){
    if (parsed.length === 0){
        return <Typography variant='body2'></Typography>
    }
    let chips: Array<React.ReactElement> = [];
    let i = 0;
    parsed.forEach(token => {
        if (typeof token === 'number') {
            chips.push(<Chip label={"" + token} key={i}/>);
        } else if (keywords.has(token)) {
            chips.push(<Chip label={token} variant='outlined' color='primary' key={i}/>);
        } else {
            chips.push(<Chip label={token} variant='outlined' key={i}/>);
        }
        i ++;
    });
    return chips;
}

function ClacUserInterface(props: any) {
    return (
        <Stack spacing={2}>
            <TextField
                variant="outlined"
                InputProps = {{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <CalculateIcon/>
                        </InputAdornment>
                    ),
                    className: "user-input"
                }}
                inputRef = {props.inputRef}
                onChange={(e) => {props.setInputTokens(parseInput(e.target.value));}}
            />
            <Typography>Parsed Result: </Typography>
            <Stack direction='row' spacing={0.5} sx={{minHeight: '2rem', overflowX: 'auto'}}>
                {showParsedResult(props.inputTokens)}
            </Stack>
        </Stack>
    );
}

export default ClacUserInterface;
