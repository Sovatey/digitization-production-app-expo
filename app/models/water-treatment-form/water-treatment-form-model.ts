import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "../helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const WaterTreatmentFormModel = types
  .model("WaterTreatmentForm")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface WaterTreatmentForm extends Instance<typeof WaterTreatmentFormModel> {}
export interface WaterTreatmentFormSnapshotOut extends SnapshotOut<typeof WaterTreatmentFormModel> {}
export interface WaterTreatmentFormSnapshotIn extends SnapshotIn<typeof WaterTreatmentFormModel> {}
export const createWaterTreatmentFormDefaultModel = () => types.optional(WaterTreatmentFormModel, {})
