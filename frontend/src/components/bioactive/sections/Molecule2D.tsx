import { useEffect, useRef } from "react";
import SmilesDrawer from "smiles-drawer";

type Props = {
  smiles?: string;
};

export default function Molecule2D({ smiles }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!smiles || !canvasRef.current) return;

    const drawer = new SmilesDrawer.Drawer({
      width: 400,
      height: 300,
    });

    SmilesDrawer.parse(
      smiles,
      (tree) => {
        drawer.draw(tree, canvasRef.current!, "light", false);
      },
      (err) => {
        console.error("SMILES Parse Error:", err);
      }
    );
  }, [smiles]);

  if (!smiles) {
    return (
      <div className="rounded-lg border p-4 text-center text-slate-500">
        No SMILES available
      </div>
    );
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3
        className="mb-4 text-sm font-semibold text-slate-700"
        style={{ fontFamily: "Roboto Slab" }}
      >
        2D Molecular Structure
      </h3>

      <div className="flex justify-center">
        <canvas ref={canvasRef} />
      </div>
    </section>
  );
}