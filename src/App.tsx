import { Typography, Container, Stack, Button } from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import ClacUserInterface from './components/clac_input';

function App() {
    return (
        <Container maxWidth='lg'>
            <Stack spacing={2}>
                <Typography variant='h3'>TypeScript Project</Typography>
                <Stack direction='row' spacing={2}>
                        <Button variant='outlined' startIcon={<PlayArrowIcon/>}>Step</Button>
                        <Button variant='outlined' startIcon={<SkipNextIcon/>}>Run All</Button>
                </Stack>
                <ClacUserInterface/>
            </Stack>
        </Container>
    );
}

export default App;
