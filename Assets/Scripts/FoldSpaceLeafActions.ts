/** Shared real-button actions for focused LEAF scenarios; no production behavior. */
import {DefaultLeafInteractor} from 'Leaf.lspkg/Interactors/interactor/DefaultLeafInteractor';
import {findInteractableByName} from 'Leaf.lspkg/Interactors/InteractableUtils';
import {findSceneObjectByName,sleep} from 'Leaf.lspkg/Utils/common/Utils';
import {FoldSpaceMain} from './FoldSpaceMain';
export class FoldSpaceLeafActions extends DefaultLeafInteractor {
  async tap(name:string){await this.trigger(findInteractableByName('FS_'+name));await sleep(50);}
  async settle(){await sleep(2900);}
}
export function lesson():FoldSpaceMain{return findSceneObjectByName('FoldSpaceMain').getComponent(FoldSpaceMain.getTypeName()) as FoldSpaceMain;}
