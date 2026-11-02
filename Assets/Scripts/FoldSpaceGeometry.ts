/** Exact paper facets and immutable stage snapshots. Owns geometry only; no UI or scene access. */
export type P = {x:number,y:number,z:number};
export type Face = {p:P[], side:number};
export type Hinge = {a:P,b:P,sign:number,angle:number,side?:number};
export const point=(x:number,z:number,y=0):P=>({x,y,z});
const clone=(p:P):P=>({...p});
const sub=(a:P,b:P):P=>({x:a.x-b.x,y:a.y-b.y,z:a.z-b.z});
const cross=(a:P,b:P):P=>({x:a.y*b.z-a.z*b.y,y:a.z*b.x-a.x*b.z,z:a.x*b.y-a.y*b.x});
const dot=(a:P,b:P)=>a.x*b.x+a.y*b.y+a.z*b.z;
export function rotate(p:P,h:Hinge,t:number):P {
  const d=sub(h.b,h.a), l=Math.sqrt(dot(d,d)); const u={x:d.x/l,y:d.y/l,z:d.z/l};
  const q=sub(p,h.a), c=Math.cos(h.angle*t),s=Math.sin(h.angle*t),v=cross(u,q),k=dot(u,q)*(1-c);
  return {x:h.a.x+q.x*c+v.x*s+u.x*k,y:h.a.y+q.y*c+v.y*s+u.y*k,z:h.a.z+q.z*c+v.z*s+u.z*k};
}
function distance(p:P,h:Hinge):number {return ((h.b.z-h.a.z)*(p.x-h.a.x)-(h.b.x-h.a.x)*(p.z-h.a.z))*h.sign;}
function clip(poly:P[],h:Hinge,keep:number):P[] {
  const result:P[]=[];
  for(let i=0;i<poly.length;i++) {const a=poly[i],b=poly[(i+1)%poly.length],da=distance(a,h)*keep,db=distance(b,h)*keep;
    if(da>=-1e-7) result.push(clone(a));
    if((da>1e-7&&db< -1e-7)||(da< -1e-7&&db>1e-7)) {const t=da/(da-db);result.push({x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t,z:a.z+(b.z-a.z)*t});}
  }
  return result.filter((p,i)=>i===0||Math.hypot(p.x-result[i-1].x,p.y-result[i-1].y,p.z-result[i-1].z)>1e-7);
}
export function fold(faces:Face[],h:Hinge,t:number):Face[] {
  const out:Face[]=[];
  for(const f of faces){if(h.side!==undefined&&f.side!==h.side){out.push(f);continue;}
    const stay=clip(f.p,h,-1),move=clip(f.p,h,1);
    if(stay.length>=3)out.push({p:stay,side:f.side});
    if(move.length>=3)out.push({p:move.map(p=>rotate(p,h,t)),side:f.side});
  }return out;
}
export function area(faces:Face[]):number {let sum=0;for(const f of faces)for(let i=1;i<f.p.length-1;i++){const c=cross(sub(f.p[i],f.p[0]),sub(f.p[i+1],f.p[0]));sum+=Math.sqrt(dot(c,c))/2;}return sum;}
const N=point(0,-14.85),tail=point(0,14.85), k=Math.SQRT2-1;
const H=(x:number,z:number,sign:number,angle:number,side?:number):Hinge=>({a:N,b:point(x,z),sign,angle,side});
export const stageHinges:Hinge[][]=[
  [H(0,14.85,1,-Math.PI)],
  [H(-10.5,-4.35,-1,Math.PI),H(10.5,-4.35,1,-Math.PI)],
  [H(-10.5,10.5/k-14.85,-1,Math.PI),H(10.5,10.5/k-14.85,1,-Math.PI)],
  [H(0,14.85,1,Math.PI)],
  [H(-2,14.85,-1,Math.PI, -1),H(-2,14.85,-1,-Math.PI,1)]
];
export const flat:Face[]=[{side:-1,p:[point(-10.5,-14.85),point(0,-14.85),point(0,14.85),point(-10.5,14.85)]},{side:1,p:[point(0,-14.85),point(10.5,-14.85),point(10.5,14.85),point(0,14.85)]}];
export const snapshots:Face[][]=[flat,flat];
for(let s=1;s<5;s++){let f=snapshots[s];for(const h of stageHinges[s])f=fold(f,h,s===4?0.5:1);snapshots.push(f);}
function ease(t:number):number {t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);}
export function frame(stage:number,t:number):Face[] {
  if(stage===0)return fold(flat,stageHinges[0][0],t<0.5?ease(t*2):1-ease((t-0.5)*2));
  let f=snapshots[stage];const hs=stageHinges[stage];
  for(let i=0;i<hs.length;i++){let q=ease(t*hs.length-i);if(stage===4)q=q<0.7?q/0.7:1-(q-0.7)/0.3*0.5;f=fold(f,hs[i],q);}
  return f;
}
export function fingerprint(faces:Face[]):string {return faces.map(f=>f.p.map(p=>[p.x,p.y,p.z].map(n=>n.toFixed(4)).join(',')).join(';')).join('|');}
