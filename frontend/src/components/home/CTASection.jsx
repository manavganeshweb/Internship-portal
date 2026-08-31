import { motion } from "framer-motion";
import {
  ArrowRight,
  Rocket,
  Sparkles,
} from "lucide-react";

import { Link } from "react-router-dom";


const CTASection = () => {


  return (

    <section className="relative overflow-hidden py-24">


      {/* Background */}

      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />



      {/* Floating Shapes */}


      <motion.div

        animate={{
          y:[0,-20,0]
        }}

        transition={{
          duration:4,
          repeat:Infinity
        }}

        className="absolute left-10 top-20 h-24 w-24 rounded-full bg-white/10 blur-xl"

      />



      <motion.div

        animate={{
          y:[0,20,0]
        }}

        transition={{
          duration:5,
          repeat:Infinity
        }}

        className="absolute right-20 bottom-20 h-32 w-32 rounded-full bg-white/10 blur-xl"

      />





      <div className="mx-auto max-w-5xl px-6 text-center text-white">


        {/* Badge */}


        <motion.div

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

          className="mx-auto flex w-fit items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm backdrop-blur"

        >

          <Sparkles size={16}/>

          Start your career journey today

        </motion.div>





        {/* Heading */}


        <motion.h2

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

          className="mt-8 text-4xl font-bold leading-tight md:text-6xl"

        >

          Ready to build your

          <span className="block text-blue-200">

            future in technology?

          </span>


        </motion.h2>





        {/* Description */}


        <motion.p

          initial={{
            opacity:0,
            y:20
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          transition={{
            delay:0.2
          }}

          className="mx-auto mt-6 max-w-2xl text-lg text-blue-100"

        >

          Join thousands of students learning new skills,
          building projects and getting internship opportunities
          through Nexavision.

        </motion.p>







        {/* Buttons */}


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
            delay:0.3
          }}

          className="mt-10 flex flex-wrap justify-center gap-5"

        >


          <Link

            to="/register"

            className="flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"

          >

            Create Free Account

            <ArrowRight size={18}/>

          </Link>





          <Link

            to="/courses"

            className="flex items-center gap-2 rounded-xl border border-white/40 px-7 py-3 font-semibold text-white transition hover:bg-white/10"

          >

            <Rocket size={18}/>

            Explore Courses

          </Link>



        </motion.div>





        {/* Bottom Stats */}


        <motion.div

          initial={{
            opacity:0
          }}

          whileInView={{
            opacity:1
          }}

          viewport={{
            once:true
          }}

          transition={{
            delay:0.5
          }}

          className="mt-14 grid gap-6 border-t border-white/20 pt-8 md:grid-cols-3"

        >


          <div>

            <h3 className="text-3xl font-bold">
              10K+
            </h3>

            <p className="text-blue-200">
              Active Learners
            </p>

          </div>



          <div>

            <h3 className="text-3xl font-bold">
              100+
            </h3>

            <p className="text-blue-200">
              Career Courses
            </p>

          </div>




          <div>

            <h3 className="text-3xl font-bold">
              500+
            </h3>

            <p className="text-blue-200">
              Internship Opportunities
            </p>

          </div>



        </motion.div>



      </div>


    </section>

  );

};


export default CTASection;