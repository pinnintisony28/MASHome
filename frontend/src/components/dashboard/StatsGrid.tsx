import StatsCard from "./StatsCard";
import type { DashboardStats } from "../../types/dashboard";
import { motion } from "framer-motion";

type Props = {
  stats: DashboardStats;
};

export default function StatsGrid({ stats }: Props) {
  const cards = [
    { title: "Targets", value: stats.targets },
    { title: "Genes", value: stats.genes },
    { title: "Gene Properties", value: stats.gene_properties },
    { title: "Drugs", value: stats.drugs },
    { title: "Biomarkers", value: stats.biomarkers },
    { title: "Bioactives", value: stats.bioactives },
    { title: "Clinical Trials", value: stats.clinical_trials },
    { title: "Target Drugs", value: stats.target_drugs },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {cards.map((card, index) => (
        <StatsCard
          key={card.title}
          title={card.title}
          value={card.value}
          // index={index}
        />
      ))}
    </motion.div>
  );
}