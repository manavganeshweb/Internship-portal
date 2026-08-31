import { motion } from "framer-motion";

import {
  UserPlus,
  BookOpen,
  Code2,
  Rocket,
  Briefcase,
  TrendingUp,
} from "lucide-react";


const journeySteps = [

  {
    step: "01",
    title: "Create Account",
    description:
      "Register on Nexavision and create your personalized learning profile.",
    icon: UserPlus,
  },


  {
    step: "02",
    title: "Choose Course",
    description:
      "Explore industry-focused courses and select the skills you want to master.",
    icon: BookOpen,
  },


  {
    step: "03",
    title: "Learn Skills",
    description:
      "Complete structured lessons, assignments and practical exercises.",
    icon: Code2,
  },


  {
    step: "04",
    title: "Build Projects",
    description:
      "Apply your knowledge by building real-world portfolio projects.",
    icon: Rocket,
  },


  {
    step: "05",
    title: "Get Internship",
    description:
      "Apply for internships and gain professional industry experience.",
    icon: Briefcase,
  },


  {
    step: "06",
    title: "Career Growth",
    description:
      "Earn certificates and move towards your dream career.",
    icon: TrendingUp,
  },

];



const LearningJourney = () => {


  return (

    <section className="py-20">


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

          className="mx-auto mb-16 max-w-3xl text-center"

        >

          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">

            Learning Journey

          </p>


          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">

            Your path from student to professional

          </h2>


          <p className="mt-4 text-slate-600">

            Follow a structured roadmap designed to help you
            learn, practice and build your career.

          </p>


        </motion.div>





        {/* Timeline */}

        <div className="relative">


          {/* Desktop Line */}

          <div className="absolute left-1/2 hidden h-full w-1 -translate-x-1/2 bg-slate-200 md:block" />


          <motion.div

            initial={{
              height:0
            }}

            whileInView={{
              height:"100%"
            }}

            viewport={{
              once:true
            }}

            transition={{
              duration:1.5
            }}

            className="absolute left-1/2 hidden w-1 -translate-x-1/2 bg-blue-600 md:block"

          />




          <div className="space-y-10">


            {
              journeySteps.map((item,index)=>{


                const Icon = item.icon;


                return (

                  <motion.div


                    key={item.step}


                    initial={{
                      opacity:0,
                      x:index % 2 === 0 ? -50 : 50
                    }}


                    whileInView={{
                      opacity:1,
                      x:0
                    }}


                    viewport={{
                      once:true
                    }}


                    transition={{
                      duration:0.6,
                      delay:index * 0.1
                    }}


                    className={`relative flex md:w-1/2 ${
                      index % 2 === 0
                        ? "md:pr-12"
                        : "md:ml-auto md:pl-12"
                    }`}


                  >



                    {/* Step Card */}


                    <motion.div

                      whileHover={{
                        y:-8
                      }}

                      className="w-full rounded-3xl border bg-white p-6 shadow-sm hover:shadow-xl"

                    >


                      <div className="flex items-start gap-5">


                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50">

                          <Icon
                            size={28}
                            className="text-blue-600"
                          />

                        </div>




                        <div>


                          <span className="text-sm font-bold text-blue-600">

                            STEP {item.step}

                          </span>


                          <h3 className="mt-1 text-xl font-bold text-slate-900">

                            {item.title}

                          </h3>


                          <p className="mt-3 text-sm leading-6 text-slate-600">

                            {item.description}

                          </p>


                        </div>


                      </div>


                    </motion.div>





                    {/* Timeline Dot */}

                    <div className="absolute top-8 hidden h-5 w-5 rounded-full border-4 border-white bg-blue-600 shadow md:block

                    left-auto right-[-10px]

                    md:left-auto

                    " />



                  </motion.div>


                );


              })
            }


          </div>


        </div>


      </div>


    </section>

  );

};


export default LearningJourney;