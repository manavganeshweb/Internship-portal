import {
  Users,
  BookOpen,
  Briefcase,
  IndianRupee,
  TrendingUp
} from "lucide-react";

import {
  motion
} from "framer-motion";


const DashboardAnalytics = () => {


const stats = [

{
title:"Total Students",
value:"2,540",
icon:Users,
color:"blue"
},

{
title:"Total Courses",
value:"86",
icon:BookOpen,
color:"green"
},

{
title:"Internship Applications",
value:"1,240",
icon:Briefcase,
color:"purple"
},

{
title:"Revenue",
value:"₹4,80,000",
icon:IndianRupee,
color:"orange"
}

];




return (

<div className="min-h-screen bg-slate-100 p-6">


<div className="mx-auto max-w-7xl">


<h1 className="text-3xl font-bold">

Dashboard Analytics

</h1>


<p className="mt-2 text-slate-500">

Overview of LMS performance

</p>





<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">


{
stats.map((item,index)=>{


const Icon=item.icon;


return (

<motion.div

key={item.title}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

transition={{
delay:index*0.1
}}

className="rounded-2xl bg-white p-6 shadow-sm"

>


<div className="flex justify-between">


<div>


<p className="text-sm text-slate-500">

{item.title}

</p>


<h2 className="mt-3 text-3xl font-bold">

{item.value}

</h2>


</div>



<div className="rounded-xl bg-blue-50 p-3">


<Icon

className="text-blue-600"

/>


</div>



</div>





<div className="mt-5 flex items-center gap-2 text-sm text-green-600">


<TrendingUp size={16}/>

12% increase this month


</div>



</motion.div>

)


})

}


</div>





</div>


</div>

);

};


export default DashboardAnalytics;