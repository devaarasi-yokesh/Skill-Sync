
import {create} from 'zustand'
import { getResource } from '../../../backend/controller/resource.controller';

export const resourceStore = create((set)=>({
    resources: [],
    setResources: (resources) => set({ resources }), 
    createResource: async(newRes) => {
        if(!newRes.goal || !newRes.resName || !newRes.resLink){
            return {success:false, message:"Please fill in all fields."}
        }
        const res = await fetch('api/res',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newRes)
        })
       
        const data = await res.json();
        console.log(data.data)
        set((state)=> ({resources:[...state.resources, data.data]}));

        return{success:true, message: "Product created successfully"};
    },
    getResource: async()=>{
        const res = await fetch('api/res',{
            method:'GET',
            headers:{
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();
        console.log(data.data)
        set((state)=> ({resources:[data.data]}))
    }
}))
