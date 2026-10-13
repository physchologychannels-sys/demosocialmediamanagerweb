import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox } from "@react-three/drei";
import { Group, Shape, Color } from "three";

type Palette = { coral: string; paper: string; charcoal: string };

function Floating({ children, x, y, tilt = 0, reduced, pulse = 0 }: { children: ReactNode; x:number; y:number; tilt?:number; reduced:boolean; pulse?:number }) {
  const group = useRef<Group>(null);
  const time = useRef(0);
  const { viewport } = useThree();
  useFrame(({ pointer }, delta) => {
    const object = group.current;
    if (!object) return;
    const dt = Math.min(delta, .05);
    time.current += reduced ? 0 : dt;
    object.position.set(viewport.width*x, viewport.height*y + Math.sin(time.current*1.1+x*4)*.07, 0);
    object.rotation.set(reduced ? 0 : pointer.y*.12, reduced ? .12 : pointer.x*.22+.12, tilt + (reduced ? 0 : Math.sin(time.current*.6)*.035));
    const desired = pulse ? 1.18 : 1;
    object.scale.setScalar(object.scale.x + (desired-object.scale.x)*(1-Math.exp(-9*dt)));
  });
  return <group ref={group}>{children}</group>;
}

function Objects({ palette, reduced, pulse, onLike }: { palette:Palette; reduced:boolean; pulse:number; onLike:()=>void }) {
  const heart = useMemo(() => {
    const s = new Shape();
    s.moveTo(0,-.43); s.bezierCurveTo(-.12,-.3,-.65,.06,-.49,.35); s.bezierCurveTo(-.36,.58,-.08,.49,0,.29); s.bezierCurveTo(.08,.49,.36,.58,.49,.35); s.bezierCurveTo(.65,.06,.12,-.3,0,-.43);
    return s;
  },[]);
  return <>
    <Floating x={.30} y={.28} tilt={-.2} reduced={reduced} pulse={pulse}><mesh onClick={event => { event.stopPropagation(); onLike(); }}><extrudeGeometry args={[heart,{ depth:.2, bevelEnabled:true,bevelSegments:5, steps:1, bevelSize:.09,bevelThickness:.09,curveSegments:24 }]} /><meshStandardMaterial color={palette.coral} metalness={.25} roughness={.22} /></mesh></Floating>
    <Floating x={-.32} y={-.24} tilt={.18} reduced={reduced}><group scale={.84}><RoundedBox args={[1.33,.95,.27]} radius={.22} smoothness={4}><meshStandardMaterial color={palette.paper} roughness={.2} metalness={.15} /></RoundedBox><mesh position={[-.35,-.43,0]} rotation-z={-.3}><coneGeometry args={[.20,.36,3]} /><meshStandardMaterial color={palette.paper} roughness={.2} metalness={.15} /></mesh>{[-.32,0,.32].map(x => <mesh key={x} position={[x,.02,.17]}><sphereGeometry args={[.075,16,16]} /><meshStandardMaterial color={palette.charcoal} /></mesh>)}</group></Floating>
    <Floating x={-.32} y={.29} tilt={-.22} reduced={reduced}><group scale={.68}><RoundedBox args={[1.06,1.06,.24]} radius={.24} smoothness={4}><meshStandardMaterial color={palette.coral} roughness={.25} metalness={.15} /></RoundedBox><mesh position={[0,0,.16]}><torusGeometry args={[.26,.065,12,40]} /><meshStandardMaterial color={palette.paper} roughness={.3} /></mesh><mesh position={[.3,.3,.17]}><sphereGeometry args={[.062,16,16]} /><meshStandardMaterial color={palette.paper} /></mesh></group></Floating>
  </>;
}

export default function SocialScene({ onReady }: { onReady:()=>void }) {
  const [palette,setPalette] = useState<Palette | null>(null);
  const [reduced,setReduced] = useState(false);
  const [pulse,setPulse] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const container = useRef<HTMLDivElement>(null);
  const [active,setActive] = useState(true);
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const color = (name:string) => { const el=document.createElement("span"); el.style.color=styles.getPropertyValue(name); document.body.append(el); const resolved=getComputedStyle(el).color; el.remove(); return new Color(resolved).getStyle(); };
    setPalette({coral:color("--primary"),paper:color("--hero-foreground"),charcoal:color("--hero")});
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const change = () => setReduced(media.matches); media.addEventListener("change",change);
    const observer = new IntersectionObserver(entries => setActive(entries.some(entry => entry.isIntersecting)));
    if(container.current) observer.observe(container.current);
    return () => { media.removeEventListener("change",change); observer.disconnect(); if(timer.current) clearTimeout(timer.current); };
  },[]);
  function like() { setPulse(value => value+1); if(timer.current) clearTimeout(timer.current); timer.current=setTimeout(() => setPulse(0),650); }
  return <div ref={container} className="h-full w-full" data-scene-active={active} data-heart-pulse={pulse}>
    {palette && <Canvas orthographic camera={{position:[0,0,8],zoom:85}} dpr={1.5} gl={{alpha:true,antialias:true}} frameloop={active ? "always" : "never"} onCreated={onReady} aria-label="Interactive floating 3D social objects">
      <ambientLight intensity={1} /><directionalLight position={[3,5,6]} intensity={3} />
      <Environment resolution={128}><Lightformer intensity={3} position={[0,4,3]} scale={[5,5,1]} /><Lightformer intensity={2} position={[-4,1,2]} rotation-y={Math.PI/2} scale={[4,4,1]} /></Environment>
      <Objects palette={palette} reduced={reduced} pulse={pulse} onLike={like} />
    </Canvas>}
  </div>;
}