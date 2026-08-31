import { motion } from "framer-motion";

import {
  Target,
  Laptop,
  Users,
  Trophy,
  ShieldCheck,
  Headphones,
} from "lucide-react";


const reasons = [

  {
    title: "Industry Ready Skills",

    description:
      "Learn technologies and skills that are currently used by companies through practical curriculum.",

    icon: Target,
  },


  {
    title: "Project Based Learning",

    description:
      "Build real-world projects that improve your confidence and strengthen your portfolio.",

    icon: Laptop,
  },


  {
    title: "Expert Guidance",

    description:
      "Get support from mentors and experienced professionals throughout your learning journey.",

    icon: Users,
  },


  {
    title: "Career Opportunities",

    description:
      "Access internship opportunities and prepare yourself for professional growth.",

    icon: Trophy,
  },


  {
    title: "Verified Certificates",

    description:
      "Earn certificates that showcase your skills and completed learning achievements.",

    icon: ShieldCheck,
  },


  {
    title: "Continuous Support",

    description:
      "Get assistance whenever you need help with learning, projects or career preparation.",

    icon: Headphones,
  },

];



const WhyChooseUs = () => {


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

          transition={{
            duration:0.6
          }}

          className="mx-auto mb-14 max-w-3xl text-center"

        >


          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">

            Why Choose Us

          </p>


          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">

            More than just an online learning platform

          </h2>


          <p className="mt-4 text-slate-600">

            Nexavision combines courses, projects, internships
            and career support to help students become job-ready.

          </p>


        </motion.div>





        {/* Cards */}


        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">


          {
            reasons.map((item,index)=>{


              const Icon = item.icon;


              return (

                <motion.div

                  key={item.title}


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
                    delay:index * 0.1
                  }}


                  whileHover={{
                    y:-10
                  }}


                  className="group rounded-3xl border bg-white p-7 shadow-sm transition hover:shadow-xl"

                >


                  <motion.div

                    whileHover={{
                      scale:1.1,
                      rotate:5
                    }}

                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50"

                  >

                    <Icon

                      size={28}

                      className="text-blue-600"

                    />

                  </motion.div>




                  <h3 className="mt-6 text-xl font-bold text-slate-900">

                    {item.title}

                  </h3>




                  <p className="mt-3 leading-7 text-slate-600">

                    {item.description}

                  </p>




                  <div className="mt-6 h-1 w-0 rounded-full bg-blue-600 transition-all duration-500 group-hover:w-full" />


                </motion.div>

              );


            })
          }


        </div>



      </div>


    </section>

  );

};


export default WhyChooseUs;