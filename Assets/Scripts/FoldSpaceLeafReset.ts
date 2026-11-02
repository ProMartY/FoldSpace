/** Criterion4: Reset cancels the active update clock and leaves a usable first stage. */
import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario';
import {expect} from 'Leaf.lspkg/Utils/common/Expect';
import {sleep} from 'Leaf.lspkg/Utils/common/Utils';
import {FoldSpaceLeafActions,lesson} from './FoldSpaceLeafActions';
@component
export class FoldSpaceLeafReset extends Scenario {
  async run(){await sleep(1800);const a=new FoldSpaceLeafActions(),m=lesson();await a.tap('Confirm');await sleep(250);expect(m.state.busy).toBe(true);await a.tap('Reset');expect(m.state.stage).toBe(0);expect(m.state.pose<0.25).toBe(true);expect(m.state.busy).toBe(true);const revision=m.state.revision;await a.tap('Next');expect(m.state.stage).toBe(0);await a.settle();expect(m.state.revision-revision).toBe(1);expect(m.state.pose).toBe(1);expect(m.state.busy).toBe(false);await a.tap('Next');expect(m.state.stage).toBe(1);expect(m.state.busy).toBe(true);await a.tap('Reset');await a.settle();expect(m.state.stage).toBe(0);expect(m.state.pose).toBe(1);}
}
