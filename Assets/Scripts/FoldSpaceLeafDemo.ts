/** Serial demonstration through real UIKit controls. Optional video helper; no assertions substitute for interactions. */
import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario';
import {sleep} from 'Leaf.lspkg/Utils/common/Utils';
import {FoldSpaceLeafActions} from './FoldSpaceLeafActions';
@component
export class FoldSpaceLeafDemo extends Scenario {
  async run(){await sleep(5000);const a=new FoldSpaceLeafActions();await a.tap('Confirm');await sleep(8000);await a.tap('Replay');await sleep(8000);for(let s=1;s<5;s++){await a.tap('Next');await sleep(8000);}await a.tap('Back');await sleep(5000);await a.tap('Next');await sleep(7000);await a.tap('Next');await sleep(6000);await a.tap('Reset');await sleep(5000);}
}
