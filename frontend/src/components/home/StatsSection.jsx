import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  Briefcase,
  Award,
} from "lucide-react";


const stats = [
  {
    number: "10K+",
    title: "Students Learning",
    description: "Students building their careers",
    icon: Users,
  },

  {
    number: "100+",
    title: "Courses",
    description: "Industry focused programs",
    icon: BookOpen,
  },

  {
    number: "500+",
    title: "Internships",
    description: "Real-world opportunities",
    icon: Briefcase,
  },

  {
    number: "95%",
    title: "Success Rate",
    description: "Student satisfaction",
    icon: Award,
  },
];



const StatsSection = () => {

  return (

    <section className="relative py-20">


      <div className="mx-auto max-w-7xl px-6">


        {/* Heading */}

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

          transition={{
            duration:0.6
          }}

          className="mx-auto mb-12 max-w-2xl text-center"

        >

          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">

            Trusted Learning Platform

          </p>


          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">

            Everything you need to grow your career

          </h2>


          <p className="mt-4 text-slate-600">

            Learn from structured courses, practice with projects,
            and get opportunities to start your professional journey.

          </p>


        </motion.div>





        {/* Stats Grid */}


        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">


          {
            stats.map((stat,index)=>{


              const Icon = stat.icon;


              return (

                <motion.div

                  key={stat.title}


                  initial={{
                    opacity:0,
                    y:40
                  }}


                  whileInView={{
                    opacity:1,
                    y:0
                  }}


                  viewport={{
                    once:true
                  }}


                  transition={{
                    duration:0.5,
                    delay:index * 0.1
                  }}


                  whileHover={{
                    y:-8
                  }}


                  className="rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-xl"

                >


                  <div className="flex items-center justify-between">


                    <div className="rounded-2xl bg-blue-50 p-3">

                      <Icon
                        size={28}
                        className="text-blue-600"
                      />

                    </div>


                  </div>




                  <motion.h3

                    initial={{
                      opacity:0,
                      scale:0.8
                    }}

                    whileInView={{
                      opacity:1,
                      scale:1
                    }}

                    viewport={{
                      once:true
                    }}

                    transition={{
                      delay:0.3 + index * 0.1
                    }}

                    className="mt-6 text-4xl font-bold text-slate-900"

                  >

                    {stat.number}

                  </motion.h3>



                  <h4 className="mt-2 text-lg font-semibold text-slate-800">

                    {stat.title}

                  </h4>


                  <p className="mt-2 text-sm text-slate-500">

                    {stat.description}

                  </p>



                </motion.div>

              );


            })
          }


        </div>


      </div>


    </section>

  );

};


export default StatsSection;