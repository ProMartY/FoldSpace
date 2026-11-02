/** Supplemental fail-fast IK diagnostic; a diagnostic is never presented as a reach pass. */
import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario';
import {expect} from 'Leaf.lspkg/Utils/common/Expect';
import {sleep} from 'Leaf.lspkg/Utils/common/Utils';
import {findInteractableByName} from 'Leaf.lspkg/Interactors/InteractableUtils';
import {createIKInteractor} from 'Leaf.lspkg/Interactors/interactor/ik/visualizer/BitmojiAvatar';
import {lesson} from './FoldSpaceLeafActions';
@component
export class FoldSpaceLeafReach extends Scenario {
  async run(){await sleep(1800);const ik=createIKInteractor();await ik.trigger(findInteractableByName('FS_Confirm'));expect(lesson().state.placed).toBe(true);}
}
