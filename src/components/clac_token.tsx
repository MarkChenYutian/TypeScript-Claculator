import { Chip } from "@mui/material";

const keywords: Set<string> = new Set([
    "print", "quit", "+", "-", "*", "/", "%", "**", "<", "drop", "swap", "rot", "if",
    "pick", "skip", ":", ";"
]);

export const id = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

export function ClacToken(props: any) {
    if (keywords.has("" + props.token)) {
        return <Chip label={props.token} key={id()} color="primary" variant="outlined"/>;
    } else {
        return <Chip label={props.token} key={id()} variant="outlined"/>;
    }
}
