import { Container, Text } from '@mantine/core';
import GerbangList from '../../components/GerbangList';

const MasterGerbang = () => {

    return (
        <Container>
            <Text size="lg" mb={'lg'} fw={'bold'} >Master Gerbang</Text>
            <GerbangList />
        </Container>
    );
};

export default MasterGerbang;
