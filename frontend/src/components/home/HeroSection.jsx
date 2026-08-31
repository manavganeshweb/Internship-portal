import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  PlayCircle,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";


const HeroSection = () => {

  return (

    <section className="relative overflow-hidden pt-32 pb-20">

      {/* Background blobs */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-blue-200 blur-3xl opacity-40" />

        <div className="absolute right-20 top-40 h-80 w-80 rounded-full bg-purple-200 blur-3xl opacity-40" />

      </div>



      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">


        {/* Left Content */}

        <motion.div

          initial={{
            opacity:0,
            y:40
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            duration:0.7
          }}

        >

          <motion.div

            initial={{
              opacity:0,
              scale:0.8
            }}

            animate={{
              opacity:1,
              scale:1
            }}

            className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600"

          >

            <CheckCircle size={16}/>

            Learn • Build • Grow

          </motion.div>



          <h1 className="text-5xl font-bold leading-tight text-slate-900 lg:text-6xl">

            Master Skills.

            <span className="block text-blue-600">

              Build Projects.

            </span>

            Get Internship Opportunities.

          </h1>



          <p className="mt-6 max-w-xl text-lg text-slate-600">

            Nexavision helps students learn industry-ready skills,
            complete practical projects, join internships, and
            track their career growth from one platform.

          </p>




          <div className="mt-8 flex flex-wrap gap-4">


            <Link

              to="/register"

              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"

            >

              Start Learning

              <ArrowRight size={18}/>

            </Link>



            <Link

              to="/courses"

              className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 hover:bg-slate-50"

            >

              <PlayCircle size={18}/>

              Explore Courses

            </Link>


          </div>




          {/* Mini Stats */}

          <div className="mt-10 flex flex-wrap gap-8">


            <div className="flex items-center gap-3">

              <Users
                className="text-blue-600"
              />

              <div>

                <p className="font-bold text-slate-900">
                  10K+
                </p>

                <p className="text-sm text-slate-500">
                  Students
                </p>

              </div>

            </div>



            <div className="flex items-center gap-3">

              <BookOpen
                className="text-blue-600"
              />

              <div>

                <p className="font-bold text-slate-900">
                  100+
                </p>

                <p className="text-sm text-slate-500">
                  Courses
                </p>

              </div>

            </div>


          </div>


        </motion.div>





        {/* Right Dashboard Preview */}


        <motion.div

          initial={{
            opacity:0,
            x:50
          }}

          animate={{
            opacity:1,
            x:0
          }}

          transition={{
            duration:0.8
          }}

          className="relative"

        >



          {/* Floating Card 1 */}

          <motion.div

            animate={{
              y:[0,-15,0]
            }}

            transition={{
              duration:4,
              repeat:Infinity
            }}

            className="absolute -left-5 top-20 z-10 rounded-2xl bg-white p-4 shadow-xl"

          >

            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-green-100 p-2">

                <CheckCircle
                  className="text-green-600"
                  size={20}
                />

              </div>


              <div>

                <p className="text-sm font-semibold">
                  Course Completed
                </p>

                <p className="text-xs text-slate-500">
                  React Masterclass
                </p>

              </div>

            </div>

          </motion.div>






          {/* Main Dashboard */}

          <motion.div

            animate={{
              y:[0,10,0]
            }}

            transition={{
              duration:5,
              repeat:Infinity
            }}

            className="rounded-3xl border bg-white p-6 shadow-2xl"

          >


            <div className="flex items-center justify-between">

              <h3 className="font-bold text-slate-900">

                Student Dashboard

              </h3>


              <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">

                Active

              </span>


            </div>




            <div className="mt-6 rounded-2xl bg-slate-50 p-5">


              <p className="text-sm text-slate-500">

                Full Stack Development

              </p>


              <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">


                <motion.div

                  initial={{
                    width:0
                  }}

                  animate={{
                    width:"70%"
                  }}

                  transition={{
                    duration:1.5
                  }}

                  className="h-full rounded-full bg-blue-600"

                />


              </div>


              <p className="mt-2 text-sm font-medium">

                70% Complete

              </p>


            </div>





            <div className="mt-5 grid grid-cols-2 gap-4">


              <div className="rounded-xl bg-blue-50 p-4">

                <p className="text-sm text-slate-500">
                  Lessons
                </p>

                <p className="text-2xl font-bold">
                  24
                </p>

              </div>


              <div className="rounded-xl bg-purple-50 p-4">

                <p className="text-sm text-slate-500">
                  Projects
                </p>

                <p className="text-2xl font-bold">
                  8
                </p>

              </div>


            </div>



          </motion.div>





          {/* Floating Card 2 */}


          <motion.div

            animate={{
              y:[0,15,0]
            }}

            transition={{
              duration:3,
              repeat:Infinity
            }}

            className="absolute -right-5 bottom-16 rounded-2xl bg-white p-4 shadow-xl"

          >

            <div className="flex items-center gap-3">

              <BookOpen
                className="text-blue-600"
              />

              <div>

                <p className="text-sm font-semibold">
                  New Course Added
                </p>

                <p className="text-xs text-slate-500">
                  AI & Web Development
                </p>

              </div>


            </div>


          </motion.div>



        </motion.div>


      </div>


    </section>

  );

};


export default HeroSection;