/** Single lesson-state owner; deterministic update clock cancels on Reset without timers. */
export class FoldSpaceState {
  stage=0; placed=false; busy=false; completed=false; flight=false; time=0; pose=0; revision=0;
  confirm():boolean {if(this.placed)return false;this.placed=true;this.play();return true;}
  play():void {this.busy=true;this.time=0;this.pose=0;this.completed=false;this.flight=false;this.revision++;}
  next():boolean {if(!this.placed||this.busy||this.completed)return false;if(this.stage===4){this.flight=true;this.completed=true;this.busy=true;this.time=0;this.revision++;return true;}this.stage++;this.play();return true;}
  replay():boolean {if(!this.placed||this.completed)return false;this.play();return true;}
  back():boolean {if(!this.placed||this.stage===0||this.completed)return false;this.stage--;this.busy=false;this.time=0;this.pose=0;this.flight=false;this.revision++;return true;}
  reset():void {this.stage=0;this.busy=this.placed;this.completed=false;this.flight=false;this.time=0;this.pose=0;this.revision++;}
  update(dt:number,duration:number):void {if(!this.busy)return;this.time+=dt;this.pose=Math.min(1,this.time/(this.flight?1.8:duration));if(this.pose>=1){this.busy=false;this.revision++;}}
}
