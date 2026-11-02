/** Criterion5: guarded completion, one flourish, clean restart via real buttons. */
import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario';
import {expect} from 'Leaf.lspkg/Utils/common/Expect';
import {sleep} from 'Leaf.lspkg/Utils/common/Utils';
import {FoldSpaceLeafActions,lesson} from './FoldSpaceLeafActions';
@component
export class FoldSpaceLeafFinish extends Scenario {
  async run(){await sleep(1800);const a=new FoldSpaceLeafActions(),m=lesson();await a.tap('Confirm');await a.settle();for(let n=0;n<4;n++){await a.tap('Next');expect(m.state.flight).toBe(false);await a.settle();}expect(m.state.stage).toBe(4);await a.tap('Next');expect(m.state.completed).toBe(true);expect(m.state.flight).toBe(true);await sleep(2000);const revision=m.state.revision;await a.tap('Next');expect(m.state.revision).toBe(revision);await a.tap('Reset');expect(m.state.completed).toBe(false);expect(m.state.flight).toBe(false);expect(m.state.stage).toBe(0);expect(m.state.pose<0.25).toBe(true);expect(m.state.busy).toBe(true);await a.settle();expect(m.state.pose).toBe(1);expect(m.state.stage).toBe(0);}
}
