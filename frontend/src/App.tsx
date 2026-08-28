import { Route, Routes } from "react-router-dom";
import InitialLoader from "./components/common/InitialLoader";
import { useState } from "react";
import Drugs from "./pages/Drugs/Drugs";
import Patents from "./pages/Patents/Patents";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Targets from "./pages/Targets/Targets";
import Genes from "./pages/Genes/Genes";
import Biomarkers from "./pages/Biomarkers/Biomarkers";
import Bioactives from "./pages/Bioactives/Bioactives";
import ClinicalTrials from "./pages/ClinicalTrials/ClinicalTrials";
import BioactiveDetailsPage from "./pages/Bioactives/BioactiveDetailsPage";
import TerminatedTrials from "./pages/ClinicalTrials/TerminatedTrials";
import WithdrawnTrials from "./pages/ClinicalTrials/WithdrawnTrials";
import PatentDetailsPage from "./pages/Patents/PatentDetailsPage";
import MedicalDevices from "./pages/MedicalDevices/MedicalDevices";
import MedicalDeviceDetailsPage from "./pages/MedicalDevices/MedicalDeviceDetailsPage";
import AssociatedDiseases from "./pages/AssociatedDiseases/AssociatedDiseases";
import AssociatedDiseaseDetailsPage from "./pages/AssociatedDiseases/AssociatedDiseaseDetailsPage";
import OtherTherapies from "./pages/OtherTherapies";
import OtherTherapyDetailsPage from "./pages/OtherTherapyDetails";
import Pathways from "./pages/Pathways/Pathways";

function App() {
   const [appReady, setAppReady] = useState(false);

  if (!appReady) {
    return (
      <InitialLoader
        onComplete={() => setAppReady(true)}
      />
    );
  }
  return (
    

      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/targets" element={<Targets />} />
          <Route path="/genes" element={<Genes />} />
          <Route path="/biomarkers" element={<Biomarkers />} />
          <Route path="/bioactives" element={<Bioactives />} />
          <Route path="/clinical-trials" element={<ClinicalTrials />} />

          <Route
            path="/bioactives/:bioactiveId"
            element={<BioactiveDetailsPage />}
          />

          <Route path="/drugs" element={<Drugs />} />

          <Route
            path="/clinical-trials/terminated"
            element={<TerminatedTrials />}
          />

          <Route
            path="/clinical-trials/withdrawn"
            element={<WithdrawnTrials />}
          />

          <Route path="/patents" element={<Patents />} />

          <Route
            path="/patents/:patentId"
            element={<PatentDetailsPage />}
          />

          <Route
            path="/medical-devices"
            element={<MedicalDevices />}
          />

          <Route
            path="/medical-devices/:deviceId"
            element={<MedicalDeviceDetailsPage />}
          />

          <Route
            path="/associated-diseases"
            element={<AssociatedDiseases />}
          />

          <Route
            path="/associated-diseases/:diseaseId"
            element={<AssociatedDiseaseDetailsPage />}
          />

          <Route
            path="/other-therapies"
            element={<OtherTherapies />}
          />

          <Route
            path="/other-therapies/:id"
            element={<OtherTherapyDetailsPage />}
          />

          <Route
            path="/pathways"
            element={<Pathways />}
          />

          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    
  );
}

export default App;