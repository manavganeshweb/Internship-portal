import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock,
  BarChart3,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getCourses } from "../../services/courseService";

import { Link } from "react-router-dom";




const FeaturedCourses = () => {
    const [courses,setCourses] = useState([]);


useEffect(()=>{

  const fetchCourses = async()=>{

    try{

      const data = await getCourses();

      setCourses(
  Array.isArray(data)
    ? data
    : []
);
    }
    catch(error){

      console.log(error);

    }

  };


  fetchCourses();

},[]);


  return (

    <section className="bg-slate-50 py-20">


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

          className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end"

        >

          <div>


            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">

              Featured Courses

            </p>


            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">

              Learn skills that companies need

            </h2>


            <p className="mt-3 max-w-xl text-slate-600">

              Structured courses designed with practical projects,
              assignments and industry-focused learning.

            </p>


          </div>



          <Link

            to="/courses"

            className="flex items-center gap-2 font-medium text-blue-600"

          >

            View All Courses

            <ArrowRight size={18}/>

          </Link>


        </motion.div>





        {/* Course Cards */}


        <div className="grid gap-8 md:grid-cols-3">


          {
            courses.map((course,index)=>(


              <motion.div


                key={course.title}


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


                className="group rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-xl"

              >


                {/* Image Placeholder */}

                <div
                  className={`flex h-44 items-center justify-center rounded-2xl ${course.color}`}
                >

                  <BookOpen
                    size={55}
                    className="text-blue-600"
                  />

                </div>





                {/* Content */}


                <div className="mt-6">


                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">

                    {course.level}

                  </span>



                  <h3 className="mt-4 text-xl font-bold text-slate-900">

                    {course.title}

                  </h3>



                  <p className="mt-3 text-sm leading-6 text-slate-600">

                    {course.description}

                  </p>





                  {/* Meta */}


                  <div className="mt-5 space-y-3 text-sm text-slate-500">


                    <div className="flex items-center gap-2">

                      <Clock size={16}/>

                      {course.duration}

                    </div>



                    <div className="flex items-center gap-2">

                      <BarChart3 size={16}/>

                      {course.lessons}

                    </div>


                  </div>






                  <Link

                    to="/register"

                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-medium text-white transition group-hover:bg-blue-600"

                  >

                    Start Learning

                    <ArrowRight size={16}/>

                  </Link>



                </div>



              </motion.div>


            ))
          }


        </div>


      </div>


    </section>

  );

};


export default FeaturedCourses;