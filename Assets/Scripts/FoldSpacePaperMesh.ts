/** MeshBuilder backend for layered A4 paper and instructional geometry. Expects material; owns no lesson state/UI. */
import {Face, P, frame, flat, stageHinges} from './FoldSpaceGeometry';
@component
export class FoldSpacePaperMesh extends BaseScriptComponent {
  @ui.label('FoldSpace · articulated A4 paper')
  @input @hint('Imported SimpleVertexBaseColor material') material:Material;
  @input('vec4','{0.03,0.9,1,1}') @widget(new ColorWidget()) @hint('Current crease color') creaseColor:vec4;
  @input('vec4','{1,0.63,0.16,1}') @widget(new ColorWidget()) @hint('Moving edge and direction arrow color') edgeColor:vec4;
  private paper:MeshBuilder; private guides:MeshBuilder; private initialized=false;private paperVisual:SceneObject;
  onAwake(){this.createEvent('OnStartEvent').bind(()=>{if(!this.material)return;this.paper=this.mesh('A4Paper');this.guides=this.mesh('FoldGuides');this.initialized=true;this.render(0,0,false);});}
  private mesh(name:string):MeshBuilder {const o=global.scene.createSceneObject(name);o.setParent(this.sceneObject);if(name==='A4Paper')this.paperVisual=o;const v=o.createComponent('Component.RenderMeshVisual') as RenderMeshVisual;const b=new MeshBuilder([{name:'position',components:3},{name:'normal',components:3},{name:'color',components:4}]);b.topology=MeshTopology.Triangles;b.indexType=MeshIndexType.UInt16;v.mesh=b.getMesh();const m=this.material.clone();m.mainPass.twoSided=true;v.mainMaterial=m;return b;}
  private clear(b:MeshBuilder){const indices=b.getIndicesCount(),vertices=b.getVerticesCount();if(indices>0)b.eraseIndices(0,indices);if(vertices>0)b.eraseVertices(0,vertices);}
  private polygon(b:MeshBuilder,points:P[],c:vec4,bias=0){if(points.length<3)return;const a=points[0],d=points[1],e=points[2],ux=d.x-a.x,uy=d.y-a.y,uz=d.z-a.z,vx=e.x-a.x,vy=e.y-a.y,vz=e.z-a.z;let nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;const l=Math.hypot(nx,ny,nz)||1;nx/=l;ny/=l;nz/=l;const start=b.getVerticesCount();const verts:number[]=[];for(const p of points)verts.push(p.x+nx*bias,p.y+ny*bias,p.z+nz*bias,nx,ny,nz,c.x,c.y,c.z,c.w);b.appendVerticesInterleaved(verts);const ids:number[]=[];for(let i=1;i<points.length-1;i++)ids.push(start,start+i,start+i+1);b.appendIndices(ids);}
  private ribbon(a:P,b:P,w:number,c:vec4){const dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz)||1;const x=-dz/l*w/2,z=dx/l*w/2;this.polygon(this.guides,[{x:a.x+x,y:a.y,z:a.z+z},{x:b.x+x,y:b.y,z:b.z+z},{x:b.x-x,y:b.y,z:b.z-z},{x:a.x-x,y:a.y,z:a.z-z}],c);}
  render(stage:number,t:number,placed=true):void {if(!this.initialized)return;this.clear(this.paper);this.clear(this.guides);const faces=placed?frame(stage,t):flat;
    if(placed)faces.forEach((f,i)=>this.polygon(this.paper,f.p,new vec4(f.side<0?0.79:0.96,f.side<0?0.91:0.97,1,1),0.018*i));
    // Runtime-regular wire tabletop stand-in: a measured frame, deliberately no recognition claim.
    const outline=[{x:-14.5,y:-0.65,z:-18.5},{x:14.5,y:-0.65,z:-18.5},{x:14.5,y:-0.65,z:18.5},{x:-14.5,y:-0.65,z:18.5}];
    for(let i=0;i<4;i++)this.ribbon(outline[i],outline[(i+1)%4],0.10,new vec4(0.26,0.57,0.67,1));
    if(!placed){const a=flat[0].p[0],b=flat[1].p[1],c=flat[1].p[2],d=flat[0].p[3];for(const [p,q]of [[a,b],[b,c],[c,d],[d,a]])this.ribbon(p,q,0.12,this.creaseColor);}
    if(placed&&!(stage===4&&t>0.85)){const hs=stageHinges[stage];for(const h of hs){for(let i=0;i<16;i++){const a=i/16,b=(i+0.6)/16;this.ribbon({x:h.a.x+(h.b.x-h.a.x)*a,y:0.35,z:h.a.z+(h.b.z-h.a.z)*a},{x:h.a.x+(h.b.x-h.a.x)*b,y:0.35,z:h.a.z+(h.b.z-h.a.z)*b},0.17,this.creaseColor);}}
      // Amber perimeter on moving facets; a curved 3D arrow rises through the fold direction.
      const hi=Math.min(hs.length-1,Math.floor(t*hs.length)),h=hs[hi];const ax=h.a.x+(h.b.x-h.a.x)*0.6,az=h.a.z+(h.b.z-h.a.z)*0.6,side=h.sign;
      for(let i=0;i<13;i++){const a=i/13*Math.PI,b=(i+1)/13*Math.PI;this.ribbon({x:ax+side*Math.cos(a)*3,y:0.6+Math.sin(a)*3,z:az},{x:ax+side*Math.cos(b)*3,y:0.6+Math.sin(b)*3,z:az+0.01},0.22,this.edgeColor);}
      this.polygon(this.guides,[{x:ax-side*3,y:0.7,z:az},{x:ax-side*2.1,y:2.1,z:az+0.7},{x:ax-side*3.8,y:2.1,z:az-0.7}],this.edgeColor);
      // Mark all current facet boundaries, with the current moving side in amber.
      for(const f of faces)for(let i=0;i<f.p.length;i++){const p=f.p[i],q=f.p[(i+1)%f.p.length];this.ribbon({...p,y:p.y+0.24},{...q,y:q.y+0.24},0.06,this.edgeColor);}
    }
    this.paper.updateMesh();this.guides.updateMesh();const roll=stage===4?Math.max(0,Math.min(1,(t-0.85)/0.15)):0;this.paperVisual.getTransform().setLocalPosition(vec3.zero());this.paperVisual.getTransform().setLocalRotation(quat.fromEulerAngles(0,0,roll*roll*(3-2*roll)*Math.PI/2));
  }
  showFlight(t:number):void {if(!this.paperVisual)return;this.paperVisual.getTransform().setLocalPosition(new vec3(0,Math.sin(t*Math.PI/2)*12,-t*45));this.paperVisual.getTransform().setLocalRotation(quat.fromEulerAngles(0,0,Math.PI/2));}
  signature(stage:number,t:number):string {return JSON.stringify(frame(stage,t));}
}
