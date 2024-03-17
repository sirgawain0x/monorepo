import React, { FC, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

interface PreviewVideoProps {
    video: File;
}

const PreviewVideo: FC<PreviewVideoProps> = (props) => {
    const objectUrl = URL.createObjectURL(props.video); // Create the object URL

    useEffect(() => {
        // Clean up function to run when the component unmounts or the video file changes
        return () => { 
            URL.revokeObjectURL(objectUrl); // Revoke the object URL
        };
    }, [props.video]); // Dependency array: useEffect runs when the video prop changes

    return (
        <Box width={'100%'}>
            {props.video &&
                <video src={URL.createObjectURL(props.video)} controls style={{ maxWidth: '1000px', maxHeight: '400px', marginTop: '8px' }} />
            } 
        </Box>
    );
}

export default PreviewVideo
