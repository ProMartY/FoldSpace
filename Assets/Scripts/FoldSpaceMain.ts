/** Coordinates the state, authored roots, view and SFX. No UI creation or folding math here. */
import {FoldSpaceState} from './FoldSpaceState';
import {FoldSpaceLessonUI} from './FoldSpaceLessonUI';
import {FoldSpacePaperMesh} from './FoldSpacePaperMesh';
const CLICK=requireAsset('../GeneratedSFX/FoldSpaceClick.wav') as AudioTrackAsset;
const PAPER=requireAsset('../GeneratedSFX/FoldSpacePaper.wav') as AudioTrackAsset;
const FLIGHT=requireAsset('../GeneratedSFX/FoldSpaceFlight.wav') as AudioTrackAsset;
const INSTRUCTIONS=['Fold lengthwise in half, then open the sheet.','Fold both top corners into the center crease.','Fold the sloping edges inward to narrow the nose.','Fold the model in half along the center crease.','Fold each wing down, then open both wings.'];
@component
export class FoldSpaceMain extends BaseScriptComponent {
  @ui.label('FoldSpace · lesson controller')
  @input @hint('Passive UIKit lesson view') ui:FoldSpaceLessonUI;
  @input @hint('Articulated paper mesh') paper:FoldSpacePaperMesh;
  @input @hint('Authored visual leaf for flight animation') paperRoot:SceneObject;
  @input @hint('Fold demonstration duration in seconds') @widget(new SliderWidget(1.5,5,0.1)) foldDuration:number=2.6;
  @input @hint('Input and paper cue volume') @widget(new SliderWidget(0,1,0.05)) sfxVolume:number=0.32;
  @input @hint('Draw all collider hit areas after initialization') debugColliders:boolean=false;
  @input @hint('Closest placement distance from the initial room origin, cm') @widget(new SliderWidget(85,110,1)) placementNear:number=95;
  @input @hint('Farthest placement distance from the initial room origin, cm') @widget(new SliderWidget(110,160,1)) placementFar:number=130;
  @input @hint('Highest workspace position below the initial eye origin, cm') @widget(new SliderWidget(-40,-5,1)) placementTop:number=-10;
  public state=new FoldSpaceState();private audio:AudioComponent[]=[];private lastRevision=-1;private ready=false;
  onAwake(){this.createEvent('OnStartEvent').bind(()=>this.start());this.createEvent('UpdateEvent').bind(()=>this.update());}
  private start(){if(!this.ui||!this.paper||!this.paperRoot){console.warn('FoldSpaceMain: Phase B references pending');return;}
    for(const track of [CLICK,PAPER,FLIGHT]){const o=global.scene.createSceneObject('FoldSpaceAudio');o.setParent(this.sceneObject);const a=o.createComponent('Component.AudioComponent') as AudioComponent;a.audioTrack=track;a.volume=this.sfxVolume;a.playbackMode=Audio.PlaybackMode.LowLatency;this.audio.push(a);}
    this.ui.onConfirm.add(()=>this.confirm());this.ui.onNext.add(()=>this.next());this.ui.onReplay.add(()=>this.replay());this.ui.onBack.add(()=>this.back());this.ui.onReset.add(()=>this.reset());this.ready=true;this.ui.setPlacement();this.paper.render(0,0,false);
    if(this.debugColliders)this.colliderDebug(this.sceneObject.getParent(),true);console.log('FoldSpace ready · manual placement · A4 21×29.7cm');
  }
  private cue(i:number){if(this.audio[i]){this.audio[i].stop(false);this.audio[i].play(1);}}
  confirm(){this.constrainPlacement();if(this.state.confirm()){this.cue(1);this.sync();}}
  next(){if(this.state.next()){this.cue(this.state.flight?2:1);this.sync();}}
  replay(){if(this.state.replay()){this.cue(1);this.sync();}}
  back(){if(this.state.back()){this.cue(0);this.sync();}}
  reset(){this.state.reset();this.paperRoot.getTransform().setLocalPosition(vec3.zero());this.paperRoot.getTransform().setLocalRotation(quat.quatIdentity());this.cue(1);this.sync();}
  private sync(){if(!this.ready)return;const s=this.state;if(!s.placed)this.ui.setPlacement();else this.ui.setLesson(s.stage,s.busy,s.completed,s.completed?'Complete · ready to make another':INSTRUCTIONS[s.stage],s.completed?'Five folds learned. Reset for a fresh sheet.':s.busy?'Watch the amber edge · cyan marks the hinge':s.stage===4?'Finish when your plane is ready.':'Your turn · Next means you choose to continue');this.lastRevision=s.revision;}
  private update(){if(!this.ready)return;const s=this.state;if(!s.placed)this.constrainPlacement();s.update(getDeltaTime(),this.foldDuration);if(s.flight){this.paper.render(4,1,true);this.paper.showFlight(s.pose);}else this.paper.render(s.stage,s.pose,s.placed);if(s.revision!==this.lastRevision)this.sync();}
  private constrainPlacement(){if(this.state.placed)return;const t=this.paperRoot.getParent().getTransform(),p=t.getWorldPosition();const y=Math.max(-90,Math.min(this.placementTop,p.y)),z=Math.max(-this.placementFar,Math.min(-this.placementNear,p.z));if(y!==p.y||z!==p.z)t.setWorldPosition(new vec3(p.x,y,z));}
  private colliderDebug(o:SceneObject,on:boolean){if(!o)return;for(const c of o.getComponents('Physics.ColliderComponent') as ColliderComponent[])c.debugDrawEnabled=on;for(let i=0;i<o.getChildrenCount();i++)this.colliderDebug(o.getChild(i),on);}
}
