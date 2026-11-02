/** Criterion3: Replay terminal equality, Back to prior start and first-stage guard. */
import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario';
import {expect} from 'Leaf.lspkg/Utils/common/Expect';
import {sleep} from 'Leaf.lspkg/Utils/common/Utils';
import {FoldSpaceLeafActions,lesson} from './FoldSpaceLeafActions';
import {frame,fingerprint} from './FoldSpaceGeometry';
@component
export class FoldSpaceLeafReplayBack extends Scenario {
  async run(){await sleep(1800);const a=new FoldSpaceLeafActions(),m=lesson();await a.tap('Confirm');await a.settle();await a.tap('Next');await a.settle();const stage=m.state.stage,sig=fingerprint(frame(stage,m.state.pose));await a.tap('Replay');expect(m.state.stage).toBe(stage);await a.settle();expect(fingerprint(frame(m.state.stage,m.state.pose))).toBe(sig);await a.tap('Back');expect(m.state.stage-stage).toBe(-1);expect(m.state.pose).toBe(0);expect(m.state.busy).toBe(false);await a.tap('Back');expect(m.state.stage).toBe(0);}
}
