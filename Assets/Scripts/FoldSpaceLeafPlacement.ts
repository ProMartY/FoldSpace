/** Criterion1: SIK drag, confirmation and world-root lock. Camera walk is separately captured. */
import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario';
import {expect} from 'Leaf.lspkg/Utils/common/Expect';
import {sleep,findSceneObjectByName} from 'Leaf.lspkg/Utils/common/Utils';
import {findInteractableByName} from 'Leaf.lspkg/Interactors/InteractableUtils';
import {FoldSpaceLeafActions,lesson} from './FoldSpaceLeafActions';
@component
export class FoldSpaceLeafPlacement extends Scenario {
  async run(){await sleep(1800);const a=new FoldSpaceLeafActions(),m=lesson(),w=findSceneObjectByName('FoldSpaceWorkspace');const before=w.getTransform().getWorldPosition();
    await a.drag(findInteractableByName('FS_Move'),new vec3(0.3,0.05,0),500);const moved=w.getTransform().getWorldPosition();expect(moved.sub(before).length>0.5).toBe(true);
    await a.tap('Confirm');expect(m.state.placed).toBe(true);expect(findSceneObjectByName('FS_Move').enabled).toBe(false);const locked=w.getTransform().getWorldPosition();expect(locked.z<=-m.placementNear&&locked.z>=-m.placementFar).toBe(true);expect(locked.y<=m.placementTop).toBe(true);await a.settle();
    expect(w.getTransform().getWorldPosition().sub(locked).length<0.001).toBe(true);expect(w.getParent()===null).toBe(true);console.log('FOLDSPACE_PLACEMENT locked world='+locked.toString());
  }
}
