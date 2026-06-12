export type EcosystemState = "healthy" | "stressed" | "collapsed";

export type PollutionObjectType = "bottle" | "bag" | "net" | "tire" | "packaging";

export type PollutionObject = {
  id: string;
  type: PollutionObjectType;
  x: number;
  y: number;
};

export type PollutionObjectDetails = {
  id: PollutionObjectType;
  name: string;
  decomposition: string;
  microplastics: string;
  affected: string[];
  impact: string;
  solutions: string[];
};

export type QuizQuestion = {
  question: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
  pollutionImpact: number;
};
