import { 
  GraduationCap, 
  Quote, 
  Mail, 
  BookOpen, 
  ExternalLink, 
  Award, 
  Users, 
  Star, 
  FileText, 
  Calendar, 
  X, 
  Search, 
  Download,
  TrendingUp,
  BookMarked
} from "lucide-react";
import { useState } from "react";
import { FaLinkedin } from "react-icons/fa";
import { motion, type Variants } from "framer-motion";

type MentorSectionProps = {
  mentorName: string;
  designation: string;
  department: string;
  institution: string;
  photo: string;
};

// Sample publications data
const publications = [
  {
    id: 1,
    title: "Advancements in MASLD Biomarker Discovery: A Comprehensive Review",
    authors: "S. Pinninti, R. Kumar, A. Sharma",
    journal: "Journal of Hepatology Research",
    year: "2024",
    volume: "45(3)",
    pages: "234-251",
    doi: "10.1016/j.jhep.2024.01.015",
    abstract: "This comprehensive review explores recent advancements in biomarker discovery for Metabolic Dysfunction-Associated Steatotic Liver Disease (MASLD), highlighting novel diagnostic and prognostic markers.",
    citations: 42,
    type: "Review Article",
    impactFactor: 4.8,
  },
  {
    id: 2,
    title: "Integrated Multi-Omics Approaches for Understanding MASLD Pathogenesis",
    authors: "S. Pinninti, M. Reddy, P. Rao",
    journal: "Genomics & Bioinformatics",
    year: "2023",
    volume: "38(2)",
    pages: "112-128",
    doi: "10.1016/j.gbio.2023.06.003",
    abstract: "This study presents integrated multi-omics approaches combining genomics, transcriptomics, and metabolomics to understand the molecular mechanisms underlying MASLD pathogenesis.",
    citations: 28,
    type: "Research Article",
    impactFactor: 3.2,
  },
  {
    id: 3,
    title: "Drug Repurposing Strategies for MASLD: Current Status and Future Directions",
    authors: "S. Pinninti, K. Patel, L. Wang",
    journal: "Drug Discovery Today",
    year: "2023",
    volume: "42(4)",
    pages: "567-582",
    doi: "10.1016/j.drudis.2023.09.008",
    abstract: "A systematic analysis of drug repurposing approaches for MASLD treatment, evaluating the potential of existing drugs for new therapeutic applications.",
    citations: 15,
    type: "Review Article",
    impactFactor: 5.1,
  },
  {
    id: 4,
    title: "Machine Learning Applications in MASLD Clinical Trial Design",
    authors: "S. Pinninti, T. Johnson, R. Gupta",
    journal: "Nature Digital Medicine",
    year: "2024",
    volume: "12(1)",
    pages: "45-62",
    doi: "10.1038/s41746-024-01052-3",
    abstract: "This paper presents novel machine learning approaches to optimize clinical trial design and patient selection for MASLD therapeutic studies.",
    citations: 8,
    type: "Research Article",
    impactFactor: 6.7,
  },
  {
    id: 5,
    title: "Biomarkers for MASLD: From Discovery to Clinical Application",
    authors: "S. Pinninti, H. Kim, S. Ahmed",
    journal: "Clinical Chemistry",
    year: "2023",
    volume: "39(5)",
    pages: "789-804",
    doi: "10.1016/j.clinchem.2023.07.012",
    abstract: "A comprehensive analysis of biomarker discovery pipelines and their clinical translation for MASLD diagnosis and monitoring.",
    citations: 34,
    type: "Review Article",
    impactFactor: 4.2,
  },
];

export default function MentorSection({
  mentorName,
  designation,
  department,
  institution,
  photo,
}: MentorSectionProps) {
  const [showPublications, setShowPublications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dummyPhoto = "/src/assets/mam.jpeg";
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

  const filteredPublications = publications.filter(pub => 
    pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pub.journal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCitations = publications.reduce((sum, pub) => sum + pub.citations, 0);

  // Animation Variants
  const containerVariants :Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const leftVariants :Variants = {
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

  const rightVariants :Variants = {
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

  const itemVariants :Variants= {
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
    <>
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-100px" }}
        variants={containerVariants}
        className="mt-16 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <motion.div variants={leftVariants}>
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 mb-4">
                <span>Academic Supervision</span>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-4">
                <h2 className="text-3xl font-light text-slate-900 relative inline-block" style={{ fontFamily: "Roboto Slab" }}>
                  Guided by Academic Excellence
                  <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-emerald-500 rounded-full" />
                  <span className="absolute -bottom-2 left-14 w-2 h-0.5 bg-emerald-300 rounded-full" />
                </h2>
              </motion.div>

              <motion.p variants={itemVariants} className="text-slate-600 leading-relaxed mb-6" style={{ fontFamily: "Roboto Slab" }}>
                MASHome is developed under the academic supervision of experienced researchers 
                dedicated to advancing MASLD research through integrated biomedical knowledge discovery.
              </motion.p>

              {/* Mentor Card */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
                className="border border-slate-200 rounded-xl p-6 mb-6"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-1" style={{ fontFamily: "Roboto Slab" }}>
                  {mentorName}
                </h3>
                <p className="text-emerald-600 font-medium" style={{ fontFamily: "Roboto Slab" }}>{designation}</p>
                <p className="text-sm text-slate-500" style={{ fontFamily: "Roboto Slab" }}>{department}</p>
                <p className="text-sm text-slate-500" style={{ fontFamily: "Roboto Slab" }}>{institution}</p>

                <div className="flex gap-4 mt-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">5+</div>
                    <div className="text-xs text-slate-500">Publications</div>
                  </div>
                  <div className="w-px bg-slate-200" />
                  <div>
                    <div className="text-sm font-semibold text-slate-900">10+</div>
                    <div className="text-xs text-slate-500">Research Projects</div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLinkedInClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <FaLinkedin size={18} className="text-[#0A66C2]" />
                  <span>LinkedIn</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleEmailClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <Mail size={20} color="red" />
                  <span>Email</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPublications(true)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <BookOpen size={20} color="white" />
                  <span>Publications</span>
                </motion.button>
              </motion.div>

              {/* Quote */}
              <motion.div variants={itemVariants} className="mt-6 border-l-4 border-emerald-400 pl-4">
                <p className="text-sm text-slate-600 italic">
                  "Data architecture and knowledge integration are fundamental to advancing biomedical research."
                </p>
                <p className="text-xs text-slate-400 mt-1">— {mentorName}</p>
              </motion.div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div 
              variants={rightVariants}
              className="flex justify-center"
            >
              <motion.div 
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="relative"
              >
                <img
                  src={dummyPhoto}
                  alt={mentorName}
                  className="w-80 h-96 object-cover rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-white px-3 py-1.5 rounded-lg shadow-md border border-slate-200">
                  <span className="text-xs font-medium text-slate-700">Research Lead</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Publications Modal - Clean Version */}
      {showPublications && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <BookMarked size={20} className="text-emerald-600" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900" style={{ fontFamily: "Roboto Slab" }}>
                    Publications
                  </h3>
                  <p className="text-xs text-slate-500" style={{ fontFamily: "Roboto Slab" }}>
                    {publications.length} publications • {totalCitations} citations
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPublications(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b border-slate-200">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search publications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400/20 focus:border-emerald-400 transition-colors"
                  style={{ fontFamily: "Roboto Slab" }}
                />
              </div>
            </div>

            {/* Publications List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredPublications.length > 0 ? (
                filteredPublications.map((pub) => (
                  <div key={pub.id} className="border border-slate-200 rounded-lg p-4 hover:border-emerald-200 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-xs font-bold text-emerald-600">
                        {String(pub.id).padStart(2, '0')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-slate-900" style={{ fontFamily: "Roboto Slab" }}>
                          {pub.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5">{pub.authors}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                          <span>{pub.journal}</span>
                          <span>•</span>
                          <span>{pub.year}</span>
                          <span>•</span>
                          <span>Vol. {pub.volume}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <TrendingUp size={12} />
                            {pub.citations} citations
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-2 line-clamp-2">{pub.abstract}</p>
                        <div className="mt-2 flex items-center gap-3 text-xs">
                          <span className="text-slate-400">DOI: {pub.doi}</span>
                          <span className="text-emerald-600 font-medium">IF: {pub.impactFactor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-slate-500">No publications found</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t border-slate-200">
              <span className="text-xs text-slate-500">
                {filteredPublications.length} of {publications.length} publications
              </span>
              <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <Download size={14} />
                Export
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}