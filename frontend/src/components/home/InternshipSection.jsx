import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  MapPin,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getInternships } from "../../services/internshipService";
import { Link } from "react-router-dom";




const InternshipSection = () => {
    
const [internships,setInternships] = useState([]);


useEffect(()=>{


 const fetchInternships = async()=>{

   try{

    const data = await getInternships();

    setInternships(data);

   }
   catch(error){

    console.log(error);

   }

 };


 fetchInternships();


},[]);

  return (

    <section className="py-20">


      <div className="mx-auto max-w-7xl px-6">


        {/* Header */}

        <motion.div

          initial={{
            opacity:0,
            y:30
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          className="mx-auto mb-12 max-w-3xl text-center"

        >

          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">

            Internship Opportunities

          </p>


          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">

            Turn your learning into real experience

          </h2>


          <p className="mt-4 text-slate-600">

            Work on practical projects, collaborate with teams,
            and gain experience that helps you start your career.

          </p>


        </motion.div>





        {/* Internship Cards */}


        <div className="grid gap-8 lg:grid-cols-3">


          {
            internships.map((internship,index)=>(


              <motion.div


                key={internship.title}


                initial={{
                  opacity:0,
                  y:50
                }}


                whileInView={{
                  opacity:1,
                  y:0
                }}


                viewport={{
                  once:true
                }}


                transition={{
                  delay:index * 0.15
                }}


                whileHover={{
                  y:-10
                }}


                className="rounded-3xl border bg-white p-6 shadow-sm hover:shadow-xl"

              >



                {/* Icon */}


                <div className="flex items-center justify-between">


                  <div className="rounded-2xl bg-blue-50 p-4">

                    <Briefcase
                      className="text-blue-600"
                      size={28}
                    />

                  </div>

<span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
  Training Internship
</span>

                </div>





                <h3 className="mt-6 text-xl font-bold text-slate-900">

                  {internship.title}

                </h3>


                <p className="mt-2 text-sm text-slate-500">

                  {internship.company}

                </p>





                {/* Details */}


                <div className="mt-5 space-y-3 text-sm text-slate-600">


                  <div className="flex items-center gap-2">

                    <Calendar size={16}/>

                    {internship.duration}

                  </div>



                  <div className="flex items-center gap-2">

                    <MapPin size={16}/>

                    {internship.mode}

                  </div>


                </div>





                {/* Skills */}


                <div className="mt-6 flex flex-wrap gap-2">


                  {
                    internship.skills.map((skill)=>(

                      <span

                        key={skill}

                        className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"

                      >

                        {skill}

                      </span>

                    ))
                  }


                </div>





                {/* Benefits */}


                <div className="mt-6 space-y-2">


                  <div className="flex items-center gap-2 text-sm text-slate-600">

                    <CheckCircle
                      size={16}
                      className="text-green-500"
                    />

                    Certificate Included

                  </div>


                  <div className="flex items-center gap-2 text-sm text-slate-600">

                    <CheckCircle
                      size={16}
                      className="text-green-500"
                    />

                    Real Project Experience

                  </div>


                </div>






                <Link

                  to="/register"

                  className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700"

                >

                  Apply Now

                  <ArrowRight size={16}/>

                </Link>




              </motion.div>


            ))
          }


        </div>




      </div>


    </section>

  );

};


export default InternshipSection;