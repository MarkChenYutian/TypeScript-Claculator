import React, { useState } from "react";

import { InputAdornment, TextField, Chip, Stack, Paper, Typography } from "@mui/material";

import CalculateIcon from '@mui/icons-material/Calculate';

type ClacOperator = number | string;

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
            console.log(token);
            parsed.push(token);
        } else {
            parsed.push(parseInt(token));
        }
    })
    return parsed;
}

function showParsedResult(parsed: Array<ClacOperator>){
    if (parsed.length === 0){
        return <Typography variant='body2'>No Input Yet</Typography>
    }
    let chips: Array<React.ReactElement> = [];
    parsed.forEach(token => {
        if (typeof token === 'number') {
            chips.push(<Chip label={"" + token}/>);
        } else if (keywords.has(token)) {
            chips.push(<Chip label={token} variant='outlined' color='primary'/>);
        } else {
            chips.push(<Chip label={token} variant='outlined'/>);
        }
    });
    return chips;
}

function ClacUserInterface() {
    const [inputTokens, setInputTokens] = useState<ClacOperator[]>([]);
    return (
        <Stack spacing={2}>
            <TextField
                variant="outlined"
                InputProps = {{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <CalculateIcon/>
                        </InputAdornment>
                    )
                }}
                onChange={(e) => {setInputTokens(parseInput(e.target.value));}}
            />
            <Typography>Parsed Result: </Typography>
            <Stack direction='row' spacing={0.5}>
                {showParsedResult(inputTokens)}
            </Stack>
        </Stack>
    );
}

export default ClacUserInterface;
