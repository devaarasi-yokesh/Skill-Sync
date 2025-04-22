
import {create} from 'zustand'


export const resourceStore = create((set)=>({
    resources: [],
    setResources: (resources) => set({ resources }), 
    createResource: async(newRes) => {
        if(!newRes.goal || !newRes.task ){
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
        set((state)=> ({resources:data.data}))
        console.log(data.data,resourceStore.resources)
        return{success:true, message: "Product created successfully",data:data.data};
    },
    updateResource: async(id,updatedResource)=>{
        const res = await fetch(`api/res/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(updatedResource)
        });
        const data = await res.json();
        if(!data.success) return {success:false, message:data.message}

        set((state)=>({
            resources: state.resources.map((resource)=> (resource.id === id) ? data.data: resource),
        }));
        return {success:true, message:data.message,data:data.data}
    },
    deleteResource: async(id)=>{
        const res = await fetch(`api/res/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            },
            
        });
        const data = await res.json();
        if(!data.success) return {success:false, message:data.message}

        set((state)=>({
            resources: state.resources.filter((resource)=> (resource.id !== id)),
        }));
        return {success:true, message:data.message}
    }
}));
