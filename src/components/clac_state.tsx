import { Stack, Typography, Paper, Chip } from "@mui/material";

const id = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

function ClacStateDisplay(props: any) {
    const S: ClacState = props.state;

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Operand Stack</Typography>
            <Paper>
                <Stack direction="row" sx={{ minHeight: "2rem", p: 1, overflowX: "auto"}} spacing={1}>
                    {
                    S.S.length > 0 ? S.S.map((elem) => {
                        return <Chip label={elem} key={id()}/>;
                    }) : <Typography variant="body1"><i>(Empty)</i></Typography>
                    }
                </Stack>
            </Paper>
            <Typography variant="h6">Operator Queue</Typography>
            <Paper>
                <Stack direction="row" sx={{ minHeight: "2rem", p: 1, overflowX: "auto" }} spacing={1}>
                    {
                    S.Q.length > 0 ? S.Q.map((elem) => {
                        return <Chip label={elem} key={id()}/>;
                    }) : <Typography variant="body1"><i>(Empty)</i></Typography>
                    }
                </Stack>
            </Paper>
        </Stack>
    )
}

export default ClacStateDisplay;