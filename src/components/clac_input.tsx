import { TextField, Stack } from "@mui/material";


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

export function EmbedClacUserInterface(props: any) {
    return (
        <Stack spacing={0.5}>
            <Stack direction='row' spacing={0.5}>
                <TextField
                    variant="outlined"
                    InputProps = {{
                        className: "user-input"
                    }}
                    inputRef = {props.inputRef}
                    onChange={(e) => {props.setInputTokens(parseInput(e.target.value));}}
                    size="small"
                    sx= {{ flexGrow: 1 }}
                />
                {props.restart_btn}
                {props.step_btn}
                {props.run_btn}
            </Stack>
        </Stack>
    );
}
