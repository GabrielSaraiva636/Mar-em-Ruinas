import { create } from "zustand";
import type { EcosystemState, PollutionObject, PollutionObjectType } from "@/types/simulation";

type SimulationState = {
  pollutionLevel: number;
  waterQuality: number;
  fishHealth: number;
  microplasticAmount: number;
  ecosystemState: EcosystemState;
  selectedObject: PollutionObjectType | null;
  pollutionObjects: PollutionObject[];
  addPollutionObject: (type: PollutionObjectType, x: number, y: number) => void;
  setPollution: (value: number) => void;
  applyQuizImpact: (correct: boolean, impact: number) => number;
  selectObject: (id: PollutionObjectType | null) => void;
  reset: () => void;
};

const clamp = (value: number) => Math.max(0, Math.min(1, value));

const deriveEcosystem = (pollutionLevel: number) => ({
  pollutionLevel,
  waterQuality: 1 - pollutionLevel,
  fishHealth: clamp(1 - pollutionLevel * 0.75),
  microplasticAmount: pollutionLevel * 0.85,
  ecosystemState: (
    pollutionLevel < 0.3 ? "healthy" : pollutionLevel < 0.7 ? "stressed" : "collapsed"
  ) as EcosystemState,
});

const initialState = {
  ...deriveEcosystem(0),
  selectedObject: null,
  pollutionObjects: [] as PollutionObject[],
};

export const useSimulationStore = create<SimulationState>((set, get) => ({
  ...initialState,
  addPollutionObject(type, x, y) {
    const object: PollutionObject = {
      id: crypto.randomUUID(),
      type,
      x: clamp(x),
      y: clamp(y),
    };

    set((state) => ({
      ...deriveEcosystem(clamp(state.pollutionLevel + 0.06)),
      pollutionObjects: [...state.pollutionObjects, object],
      selectedObject: type,
    }));
  },
  setPollution(value) {
    set(deriveEcosystem(clamp(value)));
  },
  applyQuizImpact(correct, impact) {
    const currentPollution = get().pollutionLevel;
    const recovery = Math.min(0.025, impact * 0.35);
    const change = correct ? -recovery : impact;
    const nextPollution = clamp(currentPollution + change);
    get().setPollution(nextPollution);
    return nextPollution - currentPollution;
  },
  selectObject(selectedObject) {
    set({ selectedObject });
  },
  reset() {
    set(initialState);
  },
}));
