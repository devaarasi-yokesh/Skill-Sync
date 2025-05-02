
import {create} from 'zustand'


export const goalStore = create((set)=>({
    goals: [],
    setGoals: (goals) => set({ goals }), 
    resources:[],
    setResources:(resources) => set({resources}),

    createGoal: async(newRes) => {
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
        set((state)=> ({goals:[...state.goals, data.data]}));

        return{success:true, message: "Product created successfully"};
    },
    
    getGoal: async()=>{
        const res = await fetch('api/res',{
            method:'GET',
            headers:{
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();
        set((state)=> ({goals:data.data}))
        return{success:true, message: "Product created successfully",data:data.data};
    },

    updateGoal: async(id,updatedGoal)=>{
        const res = await fetch(`api/res/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(updatedGoal)
        });
        const data = await res.json();
        if(!data.success) return {success:false, message:data.message,data:data.data}

        set((state)=>({
            goals: state.goals.map((goal)=> (goal.id === id) ? data.data: goal),
        }));
        return {success:true, message:data.message,data:data.data}
    },

    deleteGoal: async(id)=>{
        const res = await fetch(`api/res/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            },
            
        });
        const data = await res.json();
        if(!data.success) return {success:false, message:data.message}

        set((state)=>({
            goals: state.goals.filter((goal)=> (goal.id !== id)),
        }));
        return {success:true, message:data.message,data:data.val}
    },

    
    createCompletedGoal: async(newGoal) => {
        if(!newGoal.goal  ){
            return {success:false, message:"Please fill in all fields."}
        }
        const res = await fetch('api/res/goal',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newGoal)
        })
       
        const data = await res.json();
        console.log(data.data)

        return{success:true, message: "Product created successfully",data:data.data};
    },


    createResource: async(newRes) => {
        if(!newRes.resource ){
            return {success:false, message:"Please fill in all fields."}
        }
        const res = await fetch('api/res/rsc',{
            method: 'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(newRes)
        })
       
        const data = await res.json();
        console.log(data.data)
        set((state)=> ({resources:[...state.resources, data.data]}));

        return{success:true, message: "Product created successfully",data:data.data};
    },

    getResource: async()=>{
        const res = await fetch('api/res/rsc',{
            method:'GET',
            headers:{
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();
        set((state)=> ({resources:data.data}))
        return{success:true, message: "Product created successfully",data:data.data};
    },

    getArticle: async(article)=>{
        console.log(article)
        try{
            console.log(article)
            const data = await fetch(`https://dev.to/api/articles?tag=${article}&per_page=2`);
        const res = await data.json();
        console.log(res)
        return{success:true, message: "Article fetched",data:res};
        }
        catch(error){
            console.error('Error fetching articles:', error);
        }
    },
    
    getVideo: async(tag)=>{
        console.log(tag)
        const res = await fetch(`api/res/video/${tag}`,{
            method:'GET',
            headers:{
                "Content-Type": "application/json"
            },
        })

        const data = await res.json();
        return{success:true, message: "Product created successfully",data:data.data};
    },
    getCourse:async (query) =>{
        // const key = process.env.RAPID_KEY
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': `13046074cfmsh9bc3acc4a49a0a4p1212f7jsnea7c76d95adf`,
            'X-RapidAPI-Host': 'coursera-data.p.rapidapi.com'
          }
        };
        const res = await fetch (`https://collection-for-coursera-courses.p.rapidapi.com/rapidapi/course/get_institution.php`, options);
      const data = await res.json();
        console.log(data)
      }
      
}));
