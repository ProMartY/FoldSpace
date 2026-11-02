/** Criterion2: all stages, busy guard, exact material area at intermediate poses. */
import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario';
import {expect} from 'Leaf.lspkg/Utils/common/Expect';
import {sleep,findSceneObjectByName} from 'Leaf.lspkg/Utils/common/Utils';
import {FoldSpaceLeafActions,lesson} from './FoldSpaceLeafActions';
import {frame,area} from './FoldSpaceGeometry';
@component
export class FoldSpaceLeafProgression extends Scenario {
  async run(){await sleep(1800);const a=new FoldSpaceLeafActions(),m=lesson();await a.tap('Confirm');await a.settle();
    const visual=findSceneObjectByName('A4Paper').getComponent('Component.RenderMeshVisual') as RenderMeshVisual;const flatSize=visual.worldAabbMax().sub(visual.worldAabbMin());expect(Math.abs(flatSize.x-21)<0.05).toBe(true);expect(Math.abs(flatSize.z-29.7)<0.05).toBe(true);console.log('FOLDSPACE_RUNTIME_A4_BOUNDS '+flatSize.toString());
    for(let s=1;s<5;s++){const previous=m.state.stage;await a.tap('Next');await a.tap('Next');expect(m.state.stage-previous).toBe(1);expect(m.state.busy).toBe(true);await a.settle();expect(m.state.stage).toBe(s);expect(m.state.pose).toBe(1);for(const t of [0,0.25,0.5,0.75,1])expect(Math.abs(area(frame(s,t))-623.7)<0.001).toBe(true);console.log('FOLDSPACE_STAGE '+(s+1)+' final area='+area(frame(s,1)));}
    expect(m.state.completed).toBe(false);expect(m.state.flight).toBe(false);console.log('FOLDSPACE_RUNTIME_PLANE_BOUNDS '+visual.worldAabbMax().sub(visual.worldAabbMin()).toString());
  }
}
