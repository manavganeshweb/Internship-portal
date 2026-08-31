import {

LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer

}
from "recharts";




const StudentProgressAnalytics =()=>{


const data=[

{
month:"Jan",
completed:320
},

{
month:"Feb",
completed:480
},

{
month:"Mar",
completed:720
},

{
month:"Apr",
completed:950
},

{
month:"May",
completed:1200
}

];




return (

<div className="min-h-screen bg-slate-100 p-6">


<div className="mx-auto max-w-6xl">


<h1 className="text-3xl font-bold">

Student Progress Analytics

</h1>


<p className="mt-2 text-slate-500">

Monitor learning completion

</p>






<div className="mt-8 rounded-2xl bg-white p-8">


<h2 className="mb-6 text-xl font-bold">

Course Completion Rate

</h2>





<ResponsiveContainer

width="100%"

height={350}

>


<LineChart data={data}>


<XAxis dataKey="month"/>


<YAxis/>


<Tooltip/>


<Line

type="monotone"

dataKey="completed"

/>


</LineChart>


</ResponsiveContainer>



</div>




</div>


</div>

);


};


export default StudentProgressAnalytics;