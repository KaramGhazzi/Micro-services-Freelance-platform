import { ExpertiseType } from '@/graphql/types';

export interface ExpertiseArea {
  label: string;
  expertises: ExpertiseType[];
}

const expertiseOptions: ExpertiseArea[] = [
  {
    label: ExpertiseType.ManagementAndOrganization,
    expertises: [
      ExpertiseType.InterimManagement,
      ExpertiseType.Strategy,
      ExpertiseType.Finance,
      ExpertiseType.Procurement,
      ExpertiseType.LogisticsAndSupplyChainManagement,
      ExpertiseType.MarketingAndSales,
      ExpertiseType.QualityAndOperations,
      ExpertiseType.HumanResources,
      ExpertiseType.TrainingAndEducation,
      ExpertiseType.LegalAndTax,
      ExpertiseType.FacilitiesManagement,
      ExpertiseType.SupportAndProjectAssistance,
      ExpertiseType.Research,
      ExpertiseType.ProjectManagement,
      ExpertiseType.ComplianceAndRegulatoryEnforcement,
      ExpertiseType.Administration,
    ],
  },
  {
    label: ExpertiseType.Ict,
    expertises: [
      ExpertiseType.StrategyAndArchitecture,
      ExpertiseType.UserInteractionAndUx,
      ExpertiseType.DevelopmentAndImplementation,
      ExpertiseType.SystemIntegration,
      ExpertiseType.DeploymentAndOperations,
      ExpertiseType.Testing,
      ExpertiseType.AnalyticsBiBigData,
    ],
  },
  {
    label: ExpertiseType.CommunicationAndMedia,
    expertises: [
      ExpertiseType.VisualDesignAndPhotography,
      ExpertiseType.TextAndTranslation,
      ExpertiseType.AudioAndVideo,
      ExpertiseType.Communication,
    ],
  },
  {
    label: ExpertiseType.Technology,
    expertises: [
      ExpertiseType.DesignOfPhysicalObjects,
      ExpertiseType.ConstructionAndManufacturingConsulting,
      ExpertiseType.ConstructionAndManufacturingExecution,
      ExpertiseType.CivilEngineering,
    ],
  },
  {
    label: ExpertiseType.Other,
    expertises: [
      ExpertiseType.Healthcare,
      ExpertiseType.SocialWork,
      ExpertiseType.SportHospitalityAndRecreation,
      ExpertiseType.GovernmentPolicyFormulationAndExecution,
    ],
  },
];

export default expertiseOptions;
