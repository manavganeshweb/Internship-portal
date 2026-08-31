import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
}
from "recharts";



const RevenueAnalytics = () => {



const data=[

{
month:"Jan",
revenue:45000
},

{
month:"Feb",
revenue:62000
},

{
month:"Mar",
revenue:85000
},

{
month:"Apr",
revenue:72000
},

{
month:"May",
revenue:110000
}

];




return (

<div className="min-h-screen bg-slate-100 p-6">


<div className="mx-auto max-w-6xl">


<h1 className="text-3xl font-bold">

Revenue Analytics

</h1>


<p className="mt-2 text-slate-500">

Track LMS income growth

</p>





<div className="mt-8 rounded-2xl bg-white p-8">


<h2 className="mb-6 text-xl font-bold">

Monthly Revenue

</h2>



<ResponsiveContainer

width="100%"

height={350}

>


<BarChart data={data}>


<XAxis dataKey="month"/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="revenue"

/>


</BarChart>


</ResponsiveContainer>



</div>



</div>


</div>

);

};


export default RevenueAnalytics;