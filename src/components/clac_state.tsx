import { Stack, Typography, Paper, Divider, Container } from "@mui/material";

import { ClacToken, id } from "./clac_token";

export function EmbedClacStateDisplay(props: any) {
    const S: ClacState = props.state;
    return (
        <Container>
            <Stack spacing={2} direction='row' sx={{overflowX: "auto", alignItems: "center", padding: "0.2rem 0"}}>
                <Stack spacing={0.5} direction="column" sx={{flexGrow: 1}}>
                    <Typography variant="body1">Stack</Typography>
                    <Paper sx={{ flexGrow: 1 }}>
                        <Stack direction="row" sx={{ minHeight: "2rem", p: 1, overflowX: "auto"}} spacing={1}>
                            {
                            S.S.length > 0 ? S.S.map((elem) => {
                                return <ClacToken token={elem} key={id()}/>;
                            }) : <Typography variant="body1"><i>(Empty)</i></Typography>
                            }
                        </Stack>
                    </Paper>
                </Stack>
                <Divider orientation="vertical" flexItem />
                <Stack spacing={0.5} direction="column" sx={{flexGrow: 1}}>
                    <Typography variant="body1">Queue</Typography>
                    <Paper sx={{ flexGrow: 1 }}>
                        <Stack direction="row" sx={{ minHeight: "2rem", p: 1, overflowX: "auto" }} spacing={1}>
                            {
                            S.Q.length > 0 ? S.Q.map((elem) => {
                                return <ClacToken token={elem} key={id()}/>;
                            }) : <Typography variant="body1"><i>(Empty)</i></Typography>
                            }
                        </Stack>
                    </Paper>
                </Stack>
            </Stack>
        </Container>
    );
}
