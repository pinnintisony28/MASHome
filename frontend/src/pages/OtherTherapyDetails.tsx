import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import OtherTherapyService from "../services/otherTherapyService";

import type { OtherTherapy } from "../types/otherTherapy";

import OtherTherapyDetailsComponent from "../components/otherTherapy/OtherTherapyDetails";
import { motion } from "framer-motion";


export default function OtherTherapyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [therapy, setTherapy] =
    useState<OtherTherapy | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    const fetchTherapy = async () => {
      if (!id) {
        setError(
          "Invalid therapy ID."
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data =
          await OtherTherapyService.getById(
            Number(id)
          );

        setTherapy(data);
      } catch (err) {
        console.error(err);

        setError(
          "Failed to load therapy details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTherapy();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />

          <p className="text-sm text-slate-500">
            Loading therapy details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !therapy) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-sm text-red-600">
            {error ||
              "Therapy not found."}
          </p>

          <button
            onClick={() =>
              navigate(
                "/other-therapies"
              )
            }
            className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Back to Other Therapies
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="mx-auto max-w-5xl px-4 py-8"
    >
      <OtherTherapyDetailsComponent
        therapy={therapy}
      />
    </motion.div>
  );
}