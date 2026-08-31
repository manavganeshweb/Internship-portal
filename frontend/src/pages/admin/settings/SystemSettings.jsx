import {
  Settings,
  Bell,
  Mail
} from "lucide-react";


import {
useState
} from "react";



const SystemSettings=()=>{


const [settings,setSettings]=useState({

notifications:true,

email:true,

maintenance:false

});




const toggle=(key)=>{


setSettings({

...settings,

[key]:

!settings[key]

});


};



return (

<div className="min-h-screen bg-slate-100 p-6">


<div className="mx-auto max-w-5xl">


<h1 className="text-3xl font-bold">

System Settings

</h1>


<p className="mt-2 text-slate-500">

Configure LMS platform settings

</p>





<div className="mt-8 rounded-2xl bg-white p-6 space-y-5">





<div className="flex items-center justify-between">


<div className="flex items-center gap-3">

<Bell/>

<div>

<h3 className="font-semibold">

Notifications

</h3>

<p className="text-sm text-slate-500">

Send platform notifications

</p>

</div>

</div>



<input

type="checkbox"

checked={settings.notifications}

onChange={()=>toggle("notifications")}

/>


</div>







<div className="flex items-center justify-between">


<div className="flex items-center gap-3">

<Mail/>

<div>

<h3 className="font-semibold">

Email Service

</h3>

<p className="text-sm text-slate-500">

Enable email communication

</p>

</div>

</div>



<input

type="checkbox"

checked={settings.email}

onChange={()=>toggle("email")}

/>


</div>







<div className="flex items-center justify-between">


<div className="flex items-center gap-3">

<Settings/>

<div>

<h3 className="font-semibold">

Maintenance Mode

</h3>

<p className="text-sm text-slate-500">

Disable website temporarily

</p>

</div>

</div>



<input

type="checkbox"

checked={settings.maintenance}

onChange={()=>toggle("maintenance")}

/>


</div>






</div>


</div>


</div>

);


};


export default SystemSettings;