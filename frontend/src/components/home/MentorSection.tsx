import {
  GraduationCap,
  Building2,
  Quote,
  Mail,
  Award,
  FlaskConical,
} from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { motion, type Variants } from "framer-motion";

type MentorSectionProps = {
  mentorName: string;
  designation: string;
  department: string;
  institution: string;
  photo: string;
};

export default function MentorSection({
  mentorName,
  designation,
  department,
  institution,
  photo,
}: MentorSectionProps) {
  const dummyPhoto = "/assets/mam.jpeg";
  const email = "satyavani.ocf@gmail.com";
  const linkedInUrl = "https://www.linkedin.com/in/satyavani-meesala-4305b417b?utm_source=share_via&utm_content=profile&utm_medium=member_android";

  const handleEmailClick = () => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`,
      "_blank"
    );
  };

  const handleLinkedInClick = () => {
    window.open(linkedInUrl, "_blank");
  };

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const leftVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const rightVariants: Variants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-100px" }}
      variants={containerVariants}
      className="ms-root mt-16 px-4"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@300..800&family=Dancing+Script:wght@500;600&display=swap');
        .ms-root, .ms-root * { font-family: 'Roboto Slab', Georgia, serif; }
        /* Cursive half of the heading (higher specificity than the rule above) */
        .ms-root .ms-cursive {
          font-family: 'Dancing Script', cursive;
          font-weight: 600;
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left Column */}
          <motion.div variants={leftVariants}>
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5"
            >
              <GraduationCap size={16} className="text-emerald-600" aria-hidden="true" />
              <span className="text-sm font-normal tracking-wide text-slate-600">
                Academic Supervision
              </span>
            </motion.div>

            {/* Heading: Roboto Slab + cursive */}
            <motion.div variants={itemVariants} className="mb-6">
              <h2 className="text-3xl font-normal leading-tight tracking-tight text-slate-700 sm:text-4xl lg:text-[2.75rem]">
                Guided by Academic{" "}
                <span className="ms-cursive text-[1.15em] text-emerald-600">
                  Excellence
                </span>
                <span aria-hidden="true" className="mt-3 flex items-center gap-2">
                  <span className="h-1 w-20 rounded-full bg-emerald-600" />
                  <span className="h-1 w-5 rounded-full bg-emerald-300" />
                  <span className="h-1 w-1.5 rounded-full bg-emerald-200" />
                </span>
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-xl text-base font-normal leading-8 text-slate-600"
            >
              MASHome is developed under the academic supervision of experienced researchers
              dedicated to advancing MASLD research through integrated biomedical knowledge discovery.
            </motion.p>

            {/* Mentor Card */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="relative mb-7 max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7"
            >
              {/* Accent bar */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-6 h-14 w-1 rounded-r-full bg-emerald-500"
              />

              <h3 className="text-2xl font-medium tracking-tight text-slate-700">
                {mentorName}
              </h3>

              <div className="mt-4 space-y-2.5">
                <p className="flex items-start gap-2.5 font-medium text-emerald-700">
                  <Award size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <span>{designation}</span>
                </p>
                <p className="flex items-start gap-2.5 text-sm text-slate-500">
                  <GraduationCap size={18} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                  <span>{department}</span>
                </p>
                <p className="flex items-start gap-2.5 text-sm text-slate-500">
                  <Building2 size={18} className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true" />
                  <span>{institution}</span>
                </p>
              </div>

              <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <FlaskConical size={20} aria-hidden="true" />
                </span>
                <div>
                  <div className="text-lg font-medium leading-tight text-slate-700">10+</div>
                  <div className="text-xs text-slate-500">Research Projects</div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleEmailClick}
                className="flex items-center gap-2.5 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                <Mail size={18} color="white" />
                <span>Email</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLinkedInClick}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-600 transition-colors hover:border-emerald-500 hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
              >
                <FaLinkedin size={18} className="text-[#0A66C2]" />
                <span>LinkedIn</span>
              </motion.button>
            </motion.div>

            {/* Quote */}
            <motion.div variants={itemVariants} className="mt-8 flex max-w-xl gap-3">
              <Quote size={26} className="mt-0.5 shrink-0 text-emerald-300" aria-hidden="true" />
              <div>
                <p className="text-sm font-light italic leading-7 text-slate-600">
                  "Data architecture and knowledge integration are fundamental to advancing biomedical research."
                </p>
                <p className="mt-1.5 text-xs text-slate-400">— {mentorName}</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div variants={rightVariants} className="flex justify-center">
            <motion.div
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              className="relative"
            >
              {/* Offset frame behind the photo */}
              <div
                aria-hidden="true"
                className="absolute -right-4 -top-4 h-full w-full rounded-3xl border-2 border-emerald-200"
              />
              <img
                src={dummyPhoto}
                alt={mentorName}
                className="relative z-10 h-[22rem] w-72 rounded-3xl object-cover shadow-lg sm:h-96 sm:w-80"
              />
              <div className="absolute -bottom-3 -left-3 z-20 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 shadow-md">
                <Award size={16} className="text-emerald-600" aria-hidden="true" />
                <span className="text-sm font-medium text-slate-600">Research Lead</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}