/** First-fold Preview gate: uses real UIKit buttons, immutable geometry and replay state. */
import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario';
import {expect} from 'Leaf.lspkg/Utils/common/Expect';
import {sleep,findSceneObjectByName} from 'Leaf.lspkg/Utils/common/Utils';
import {DefaultLeafInteractor} from 'Leaf.lspkg/Interactors/interactor/DefaultLeafInteractor';
import {findInteractableByName} from 'Leaf.lspkg/Interactors/InteractableUtils';
import {FoldSpaceMain} from './FoldSpaceMain';
import {area,frame,fingerprint} from './FoldSpaceGeometry';
@component
export class FoldSpaceLeafProof extends Scenario {
  async run():Promise<void>{
    await sleep(1800);const m=findSceneObjectByName('FoldSpaceMain').getComponent(FoldSpaceMain.getTypeName()) as FoldSpaceMain;
    const i=new DefaultLeafInteractor();expect(m.state.placed).toBe(false);
    await i.trigger(findInteractableByName('FS_Confirm'));await sleep(450);
    expect(m.state.placed).toBe(true);expect(m.state.busy).toBe(true);expect(m.state.pose>0&&m.state.pose<1).toBe(true);
    console.log('FOLDSPACE_PROOF midpoint pose='+m.state.pose+' area='+area(frame(0,m.state.pose)));
    await sleep(3000);const step=m.state.stage,signature=fingerprint(frame(step,m.state.pose));
    expect(m.state.busy).toBe(false);expect(Math.abs(area(frame(0,0.45))-623.7)<0.0001).toBe(true);
    await i.trigger(findInteractableByName('FS_Replay'));expect(m.state.stage).toBe(step);await sleep(3200);
    expect(fingerprint(frame(m.state.stage,m.state.pose))).toBe(signature);expect(m.state.stage).toBe(step);
    console.log('FOLDSPACE_PROOF first fold and Replay identical; material area623.7cm²');
  }
}
