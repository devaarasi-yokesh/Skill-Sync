import {useAuth0} from '@auth0/auth0-react'
import axios from 'axios'
import { useEffect } from 'react'


function SyncProfile(){

    const {isAuthenticated, getAccessTokenSilently, user} = useAuth0();

    useEffect( () =>{
        const syncUserProfile = async () => {
            if(!isAuthenticated) return;

            const token = await getAccessTokenSilently();

            await axios.post(
                'api/create-profile', 
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        };

        syncUserProfile();
    },[isAuthenticated])

    // This component renders nothing visible
    return null;
}

export default SyncProfile;