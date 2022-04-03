import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Stack } from '@mui/material';

const id = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
};

interface ClacFunctionEntry {
    K: string;
    V: Array<ClacOperator>;
};

function FunctionTable( props: any ) {
    const state = props.S;
    let rows: Array<ClacFunctionEntry> = [];
    state.T.forEach(
        (value: Array<ClacOperator>, key: string) => {
            rows.push({K: key, V: value});
        }
    );
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Symbol</TableCell>
                        <TableCell>Definition</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(
                        (row) => (
                            <TableRow
                                key={row.K} 
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">
                                    <Chip label={row.K} color="secondary"/>
                                </TableCell>
                                <TableCell align="left">
                                    <Stack direction="row" spacing={1} sx={{overflowX: "auto"}}>
                                    {
                                        row.V.map((elem) => {
                                            return <Chip label={elem} key={id()} />;
                                        })
                                    }
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default FunctionTable;
