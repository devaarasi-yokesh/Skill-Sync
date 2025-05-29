import {useAuth0} from '@auth0/auth0-react'
import axios from 'axios'
import { useEffect } from 'react'


function SyncProfile(){

    const {isAuthenticated, getAccessTokenSilently, user} = useAuth0();

    useEffect( () =>{
        const syncUserProfile = async () => {
            if(!isAuthenticated) return;

           try{
                const token = await getAccessTokenSilently();

            await axios.post(
                '/create-profile', 
                {
                    name: user.name,
                    email: user.email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
           } catch(e){
            console.error('Error syncing profile:', e);
           }
            
        };

        syncUserProfile();
    },[isAuthenticated,user])

    // This component renders nothing visible
    return null;
}

export default SyncProfile;