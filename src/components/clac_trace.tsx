import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Container, Typography } from '@mui/material';

import {id, ClacToken} from './clac_token';

export function ClacStateTrace(props: any) {
    const states: ClacState[] = props.history;
    const rows: React.ReactElement[] = [];
    for (let i = 0; i < states.length; i ++){
        rows.push(
            <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="left">
                    <Typography variant="body1">{i}</Typography>
                </TableCell>
                <TableCell align="left">
                    <Stack direction="row" spacing={1} sx={{overflowX: "auto"}}>
                        {states[i].S.map((elem) => {
                            return <ClacToken token={elem} key={id()}/>;
                        })}
                    </Stack>
                </TableCell>
                <TableCell align="left">
                    <Stack direction="row" spacing={1} sx={{overflowX: "auto"}}>
                        {states[i].Q.map((elem) => {
                            return <ClacToken token={elem} key={id()}/>;
                        })}
                    </Stack>
                </TableCell>
            </TableRow>
        )
    }
    return (
        <Container>
            <Typography variant='body1'>Trace</Typography>
            <TableContainer component={Paper}>
                <Table size='small'>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Stack</TableCell>
                            <TableCell>Queue</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
