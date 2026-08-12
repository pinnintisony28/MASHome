import { useEffect, useRef, useState } from "react";
import * as $3Dmol from "3dmol";

import {
  getMoleculeInfo,
  type MoleculeInfo,
} from "../../../services/moleculeService";

type Props = {
  bioactiveId: number;
};

export default function Molecule3D({ bioactiveId }: Props) {
  const [molecule, setMolecule] = useState<MoleculeInfo | null>(null);
  const [loading, setLoading] = useState(true);

  const viewerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  // -------------------------
  // Load Molecule Information
  // -------------------------
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    async function loadMolecule() {
      try {
        const data = await getMoleculeInfo(bioactiveId);
        console.log("API Response:", data);
        setMolecule(data);
      } catch (error) {
        console.error("Failed to load molecule:", error);
      } finally {
        setLoading(false);
      }
    }

    loadMolecule();
  }, [bioactiveId]);

  // -------------------------
  // Render 3D Molecule
  // -------------------------
  useEffect(() => {
    if (!molecule || !viewerRef.current) return;
    const moleculeData=molecule
    async function renderMolecule() {
      try {
        console.log("3D URL:", moleculeData.structure_3d);

        const response = await fetch(moleculeData.structure_3d);

        console.log("Status:", response.status);
        console.log(
          "Content-Type:",
          response.headers.get("content-type")
        );

        const sdf = await response.text();

        console.log("SDF Preview:", sdf.substring(0, 300));

        // Clear previous viewer
        viewerRef.current!.innerHTML = "";

        console.log("Creating viewer...");

        const viewer = $3Dmol.createViewer(viewerRef.current!, {
          backgroundColor: "white",
        });

        console.log("Viewer created");

        viewer.addModel(sdf, "sdf");

        viewer.setStyle(
          {},
          {
            stick: {},
            sphere: {
              radius: 0.3,
            },
          }
        );

        viewer.zoomTo();
        viewer.resize();
        viewer.render();

        // Re-render after layout settles
        setTimeout(() => {
          viewer.resize();
          viewer.zoomTo();
          viewer.render();
          viewer.spin(true);
        }, 100);

        console.log("Finished!");
      } catch (error) {
        console.error("Failed to render molecule:", error);
      }
    }

    renderMolecule();
  }, [molecule]);

  // -------------------------
  // Loading
  // -------------------------
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        Loading 3D Molecule...
      </div>
    );
  }

  if (!molecule) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        Unable to load molecule.
      </div>
    );
  }

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h3
        className="mb-4 text-lg font-semibold"
        style={{ fontFamily: "Roboto Slab" }}
      >
        3D Molecular Structure
      </h3>

      <div className="mb-4">
        <p>
          <strong>Compound:</strong> {molecule.compound_name}
        </p>

        <p>
          <strong>CID:</strong> {molecule.cid}
        </p>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          background: "#ffffff",
        }}
      >
        <div
          ref={viewerRef}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
}