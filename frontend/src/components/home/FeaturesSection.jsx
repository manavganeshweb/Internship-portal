import { motion } from "framer-motion";

import {
  Users,
  Code2,
  Briefcase,
  TrendingUp,
  Award,
  Sparkles,
} from "lucide-react";


const features = [

  {
    title: "Expert Mentors",

    description:
      "Learn from experienced developers and industry professionals who guide you throughout your journey.",

    icon: Users,

  },


  {
    title: "Practical Projects",

    description:
      "Build real-world applications and strengthen your portfolio with hands-on experience.",

    icon: Code2,

  },


  {
    title: "Internship Opportunities",

    description:
      "Get access to internship programs and gain professional work experience.",

    icon: Briefcase,

  },


  {
    title: "Track Your Progress",

    description:
      "Monitor your learning progress, completed lessons and achievements from your dashboard.",

    icon: TrendingUp,

  },


  {
    title: "Certificates",

    description:
      "Earn verified certificates after completing courses and internship programs.",

    icon: Award,

  },


  {
    title: "AI Learning Support",

    description:
      "Get smarter recommendations and personalized learning assistance.",

    icon: Sparkles,

  },

];



const FeaturesSection = () => {


  return (

    <section className="bg-slate-50 py-20">


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

          className="mx-auto mb-14 max-w-3xl text-center"

        >

          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">

            Why Choose Nexavision

          </p>


          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">

            Everything you need to build your career

          </h2>


          <p className="mt-4 text-slate-600">

            A complete learning ecosystem combining courses,
            projects, internships and career growth.

          </p>


        </motion.div>





        {/* Features Grid */}


        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">


          {
            features.map((feature,index)=>{


              const Icon = feature.icon;


              return (

                <motion.div


                  key={feature.title}


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
                    delay:index * 0.1
                  }}


                  whileHover={{
                    y:-8
                  }}


                  className="group rounded-3xl border bg-white p-7 shadow-sm transition hover:shadow-xl"

                >


                  {/* Icon */}


                  <motion.div

                    whileHover={{
                      rotate:8,
                      scale:1.1
                    }}

                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50"

                  >

                    <Icon

                      size={28}

                      className="text-blue-600"

                    />

                  </motion.div>





                  <h3 className="mt-6 text-xl font-bold text-slate-900">

                    {feature.title}

                  </h3>


                  <p className="mt-3 leading-6 text-slate-600">

                    {feature.description}

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


export default FeaturesSection;