/** Registers explicit Preview QA scenarios. No production lesson behavior is changed. */
import {scenariosIndex} from 'Leaf.lspkg/Scenarios/decorator/ScenarioIndexDecorator';
import {ScenarioMetadata} from 'Leaf.lspkg/Scenarios/scenario/ScenarioMetadata';
import {FoldSpaceLeafProof} from './FoldSpaceLeafProof';
import {FoldSpaceLeafPlacement} from './FoldSpaceLeafPlacement';
import {FoldSpaceLeafProgression} from './FoldSpaceLeafProgression';
import {FoldSpaceLeafReplayBack} from './FoldSpaceLeafReplayBack';
import {FoldSpaceLeafReset} from './FoldSpaceLeafReset';
import {FoldSpaceLeafFinish} from './FoldSpaceLeafFinish';
import {FoldSpaceLeafReach} from './FoldSpaceLeafReach';
import {FoldSpaceLeafDemo} from './FoldSpaceLeafDemo';
import {FoldSpaceLeafCapture} from './FoldSpaceLeafCapture';
@component
export class FoldSpaceLeafIndex extends BaseScriptComponent {
  @scenariosIndex static scenariosIndex:ScenarioMetadata[]=[
    {id:'foldspace-first-fold-proof',typename:FoldSpaceLeafProof.getTypeName()},
    {id:'foldspace-placement-lock',typename:FoldSpaceLeafPlacement.getTypeName()},
    {id:'foldspace-five-stage-order',typename:FoldSpaceLeafProgression.getTypeName()},
    {id:'foldspace-replay-back',typename:FoldSpaceLeafReplayBack.getTypeName()},
    {id:'foldspace-reset-during-fold',typename:FoldSpaceLeafReset.getTypeName()},
    {id:'foldspace-finish-restart',typename:FoldSpaceLeafFinish.getTypeName()},
    {id:'foldspace-ik-reach',typename:FoldSpaceLeafReach.getTypeName()},
    {id:'foldspace-demo-tour',typename:FoldSpaceLeafDemo.getTypeName()},
    {id:'foldspace-capture-start',typename:FoldSpaceLeafCapture.getTypeName()}
  ];
}
