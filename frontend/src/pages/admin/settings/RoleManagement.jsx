import {
  ShieldCheck,
  Plus,
  Trash2
} from "lucide-react";


import {
useState
} from "react";



const RoleManagement =()=>{


const [roles,setRoles]=useState([

{
name:"Super Admin",
permissions:[
"All Access"
]
},

{
name:"Instructor",
permissions:[
"Courses",
"Lessons"
]
},

{
name:"Support",
permissions:[
"Students"
]
}

]);




const removeRole=(index)=>{


setRoles(

roles.filter(
(_,i)=>i!==index
)

);


};




return (

<div className="min-h-screen bg-slate-100 p-6">


<div className="mx-auto max-w-6xl">


<h1 className="text-3xl font-bold">

Role Management

</h1>


<p className="mt-2 text-slate-500">

Manage admin access permissions

</p>





<button className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-white">

<Plus size={18}/>

Create Role

</button>








<div className="mt-8 grid gap-5 md:grid-cols-3">


{
roles.map((role,index)=>(


<div

key={role.name}

className="rounded-2xl bg-white p-6 shadow-sm"

>


<ShieldCheck

className="text-blue-600"

/>


<h2 className="mt-4 font-bold text-xl">

{role.name}

</h2>


<div className="mt-4 space-y-2">


{
role.permissions.map(
(permission)=>(


<div

key={permission}

className="rounded-lg bg-slate-100 px-3 py-2 text-sm"

>

{permission}

</div>


))
}


</div>



<button

onClick={()=>removeRole(index)}

className="mt-5 flex items-center gap-2 text-red-600"

>

<Trash2 size={16}/>

Remove

</button>



</div>


))
}


</div>


</div>


</div>

);


};


export default RoleManagement;