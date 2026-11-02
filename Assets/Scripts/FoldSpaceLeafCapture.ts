/** Short real-control scene setup for transient animation captures. */
import {Scenario} from 'Leaf.lspkg/Scenarios/scenario/Scenario';
import {sleep} from 'Leaf.lspkg/Utils/common/Utils';
import {FoldSpaceLeafActions,lesson} from './FoldSpaceLeafActions';
@component
export class FoldSpaceLeafCapture extends Scenario {
  async run(){await sleep(1800);lesson().foldDuration=5;await new FoldSpaceLeafActions().tap('Confirm');}
}
