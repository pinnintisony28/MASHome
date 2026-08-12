export interface BioactiveToxicity {
  id: number;
  bioactive_id: number;

  category: string;
  endpoint: string;

  prediction?: string;
  probability?: number;

  predicted_ld50?: string;
  predicted_toxicity_class?: string;

  average_similarity?: number;
  prediction_accuracy?: number;
}