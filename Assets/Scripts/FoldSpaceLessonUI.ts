/** Passive UIKit view built with specs-build-ui. Owns layout/events only; main owns progression. */
import Event from 'SpectaclesInteractionKit.lspkg/Utils/Event';
import {InteractableManipulation} from 'SpectaclesInteractionKit.lspkg/Components/Interaction/InteractableManipulation/InteractableManipulation';
import {FlexLayout} from 'SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexLayout';
import {FlexItem} from 'SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexItem';
import {FlexDirection,FlexAlign,FlexJustify} from 'SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexTypes';
import {BackPlate} from 'SpectaclesUIKit.lspkg/Scripts/BackPlate';
import {Button} from 'SpectaclesUIKit.lspkg/Scripts/Components/Button/Button';
import {ElementContent} from 'SpectaclesUIKit.lspkg/Scripts/Components/Content/ElementContent';
const ICONS={next:requireAsset('../Icons/arrow_forward.png') as Texture,replay:requireAsset('../Icons/replay.png') as Texture,back:requireAsset('../Icons/arrow_back.png') as Texture,reset:requireAsset('../Icons/restart_alt.png') as Texture,confirm:requireAsset('../Icons/check.png') as Texture,move:requireAsset('../Icons/open_with.png') as Texture};
const TYPE_SCALE={Title1:{size:105,weight:700},Headline2:{size:48,weight:700},Body:{size:39,weight:500},Caption:{size:38,weight:500},Button:{size:39,weight:500}};
function applyTextRole(t:Text,role:keyof typeof TYPE_SCALE,scale:number){t.size=TYPE_SCALE[role].size*scale;(t as Text&{weight?:number}).weight=TYPE_SCALE[role].weight;}
@component
export class FoldSpaceLessonUI extends BaseScriptComponent {
  @ui.label('FoldSpace · lesson view')
  @input @hint('Authored workspace root moved by the placement handle') workspace:SceneObject;
  @input @hint('Authored instruction panel anchor') instructionRoot:SceneObject;
  @input @hint('Authored action panel anchor') actionRoot:SceneObject;
  @input @hint('Main panel width in cm') @widget(new SliderWidget(34,48,1)) panelWidth:number=42;
  @input @hint('Global type-scale correction') @widget(new SliderWidget(0.8,1.5,0.05)) textScale:number=1.2;
  public onConfirm=new Event<void>();public onNext=new Event<void>();public onReplay=new Event<void>();public onBack=new Event<void>();public onReset=new Event<void>();
  private status:Text;private instruction:Text;private progress:Text;private nextContent:ElementContent;
  private placementRowRoot:SceneObject;private primaryRowRoot:SceneObject;private secondaryRowRoot:SceneObject;
  private buttons:{[key:string]:{so:SceneObject,button:Button}}={};private move:InteractableManipulation;private latest:any=null;
  onAwake(){this.createEvent('OnStartEvent').bind(()=>this.build());}
  private obj(parent:SceneObject,name:string,position?:vec3):SceneObject {const o=global.scene.createSceneObject(name);o.setParent(parent);if(position)o.getTransform().setLocalPosition(position);return o;}
  private layout(parent:SceneObject,name:string,w:number,h:number,row=false):SceneObject {const o=this.obj(parent,name,new vec3(0,0,0.02));const f=o.createComponent(FlexLayout.getTypeName()) as FlexLayout;f.autoDiscoverItemsOnStart=false;f.onInitialized.add(()=>{f.width=w;f.height=h;f.direction=row?FlexDirection.Row:FlexDirection.Column;f.alignItems=FlexAlign.Center;f.justifyContent=FlexJustify.Center;f.rowGap=0.5;f.columnGap=1.2;});return o;}
  private child(parent:SceneObject,name:string,w:number,h:number):SceneObject {const o=this.obj(parent,name,new vec3(0,0,0.02));const i=o.createComponent(FlexItem.getTypeName()) as FlexItem;i.overrideWidth=w;i.overrideHeight=h;i.flexShrink=0;const f=parent.getComponent(FlexLayout.getTypeName()) as FlexLayout;if(f)f.addItems([i]);return o;}
  private label(parent:SceneObject,name:string,content:string,w:number,h:number,role:keyof typeof TYPE_SCALE):Text {const o=this.child(parent,name,w,h);const t=o.createComponent('Component.Text') as Text;t.text=content;t.depthTest=true;t.horizontalAlignment=HorizontalAlignment.Center;t.verticalAlignment=VerticalAlignment.Center;t.horizontalOverflow=HorizontalOverflow.Wrap;t.verticalOverflow=VerticalOverflow.Overflow;t.layoutRect=Rect.create(-w/2,w/2,-h/2,h/2);applyTextRole(t,role,this.textScale);return t;}
  private panel(root:SceneObject,w:number,h:number):SceneObject {root.createComponent('Component.Canvas');const plate=root.createComponent(BackPlate.getTypeName()) as BackPlate;plate.size=new vec2(w,h);const host=this.obj(root,'Content',new vec3(0,0,0.6));return this.layout(host,'Column',w-2,h-1);}
  private button(parent:SceneObject,key:string,label:string,icon:Texture,width:number,event:Event<void>):ElementContent {const o=this.child(parent,'FS_'+key,width,5.5);const b=o.createComponent(Button.getTypeName()) as Button;b.onInitialized.add(()=>{b.size=new vec3(width,5.5,1);});b.onTriggerUp.add(()=>event.invoke());const ec=o.createComponent(ElementContent.getTypeName()) as ElementContent;ec.text=label;ec.leadingIcon=icon;ec.textSize=39*this.textScale;ec.autoResize=false;ec.contentAlignment='center';ec.spacing=0.4;this.buttons[key]={so:o,button:b};return ec;}
  private build(){if(!this.workspace||!this.instructionRoot||!this.actionRoot){console.warn('FoldSpaceUI: Phase B references pending');return;}
    const head=this.panel(this.instructionRoot,this.panelWidth,12);
    this.label(head,'Title','FOLDSPACE',this.panelWidth-3,2.6,'Title1');
    this.progress=this.label(head,'Progress','VIRTUAL WORKSPACE · A4 21 × 29.7 cm',this.panelWidth-3,1.5,'Caption');
    this.instruction=this.label(head,'Instruction','Drag the workspace beside your paper.',this.panelWidth-3,2.5,'Headline2');
    this.status=this.label(head,'Status','Manual alignment · no paper recognition',this.panelWidth-3,1.5,'Caption');
    const col=this.panel(this.actionRoot,38,14);
    const placement=this.child(col,'PlacementRow',35,5.5);this.placementRowRoot=placement;const placementRow=this.layout(placement,'Placement',35,5.5,true);
    this.button(placementRow,'Confirm','Confirm placement',ICONS.confirm,20,this.onConfirm);
    this.button(placementRow,'Move','Drag',ICONS.move,10,new Event<void>());
    const r1=this.child(col,'PrimaryRow',35,5.5),row1=this.layout(r1,'Primary',35,5.5,true);this.primaryRowRoot=r1;
    this.nextContent=this.button(row1,'Next','Next',ICONS.next,16,this.onNext);this.button(row1,'Replay','Replay',ICONS.replay,16,this.onReplay);
    const r2=this.child(col,'SecondaryRow',35,5.5),row2=this.layout(r2,'Secondary',35,5.5,true);this.secondaryRowRoot=r2;
    this.button(row2,'Back','Back',ICONS.back,16,this.onBack);this.button(row2,'Reset','Reset',ICONS.reset,16,this.onReset);
    const handle=this.buttons.Move.so;this.move=handle.createComponent(InteractableManipulation.getTypeName()) as InteractableManipulation;this.move.setManipulateRoot(this.workspace.getTransform());this.move.setCanRotate(false);this.move.setCanScale(false);
    if(this.latest)this.applyView(this.latest);else this.setPlacement();
  }
  setPlacement(){this.applyView({placed:false,stage:0,busy:false,completed:false,instruction:'Drag the workspace beside your paper.',status:'Manual alignment · no paper recognition'});}
  setLesson(stage:number,busy:boolean,completed:boolean,instruction:string,status:string){this.applyView({placed:true,stage,busy,completed,instruction,status});}
  private applyView(v:any){this.latest=v;if(!this.status)return;this.progress.text=v.placed?`Step ${v.stage+1} / 5 · ${['Center crease','Top corners','Narrow nose','Body fold','Wings'][v.stage]}`:'VIRTUAL WORKSPACE · A4 21 × 29.7 cm';this.instruction.text=v.instruction;this.status.text=v.status;
    this.placementRowRoot.enabled=!v.placed;this.primaryRowRoot.enabled=v.placed;this.secondaryRowRoot.enabled=v.placed;
    this.buttons.Confirm.so.enabled=!v.placed;this.buttons.Move.so.enabled=!v.placed;
    for(const k of ['Next','Replay','Back','Reset'])this.buttons[k].so.enabled=v.placed;
    this.nextContent.text=v.stage===4?'Finish':'Next';
    this.buttons.Next.button.opacity=v.busy||v.completed?0.35:1;this.buttons.Replay.button.opacity=v.completed?0.35:1;this.buttons.Back.button.opacity=v.stage===0||v.completed?0.35:1;
    if(this.move)this.move.enabled=!v.placed;
  }
}
