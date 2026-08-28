from fastapi import FastAPI
from app.database import engine, Base
from app.models.drug import Drug
from app.models.disease import Disease
from app.models.gene import Gene
from app.models.gene_properties import GeneProperties
from app.models.drug import Drug
from app.models.biomarker import Biomarker
from app.models.protein import Protein
from app.models.target import Target
from app.models.clinical_trial import ClinicalTrial
from app.models.bioactive import Bioactive
from app.models.patent import Patent
from app.models.medical_device import MedicalDevice
from app.models.therapy import Therapy
from app.routers.drugs import router as drug_router
from app.routers.genes import router as gene_router
from app.models.biomarker import Biomarker
from app.routers.biomarkers import router as biomarker_router
from app.models.clinical_trial import ClinicalTrial
from app.models.bioactive import Bioactive
from app.routers.clinical_trials import router as clinical_trial_router
from app.routers.bioactives import router as bioactive_router
from app.models.target import Target
from app.models.target_drug import TargetDrug
from app.routers import targets
from app.routers import dashboard
from app.routers import search
from app.routers import knowledge
from app.routers import graph
from fastapi.middleware.cors import CORSMiddleware
from app.models.bioactive import Bioactive
from app.models.bioactive_adme import BioactiveADME
from app.models.bioactive_toxicity import BioactiveToxicity
from app.routers import bioactive_toxicity
from app.routers import bioactive_adme
from app.routers import clinical_trials
from app.routers import terminated_trials
from app.models.bioactive_plant import BioactivePlant
from app.routers.patents import router as patents_router
from app.routers.medical_devices import router as medical_devices_router
from app.routers.associated_diseases import router as associated_diseases_router
from app.routers import other_therapies
from app.models.pathway import Pathway
from app.routers.pathways import router as pathways_router
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://frontend-zeta-lemon-31.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(drug_router)
app.include_router(gene_router)
app.include_router(biomarker_router)
app.include_router(clinical_trial_router)
app.include_router(bioactive_router)
app.include_router(targets.router)
app.include_router(dashboard.router)
app.include_router(search.router)
app.include_router(knowledge.router)
app.include_router(graph.router)
app.include_router(bioactive_toxicity.router)
app.include_router(bioactive_adme.router)
app.include_router(clinical_trials.router)
app.include_router(terminated_trials.router)
app.include_router(patents_router)
app.include_router(medical_devices_router)
app.include_router(associated_diseases_router)
app.include_router(other_therapies.router)
app.include_router(pathways_router)
Base.metadata.create_all(bind=engine)
@app.get("/")
def home():
    return {"message": "MASHome API is running"}