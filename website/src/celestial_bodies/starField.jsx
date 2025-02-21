import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { memo } from 'react';

function getPoints({ numStars = 100 } = {}) {
  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);
    const rate = Math.random() * 1;
    const prob = Math.random();
    const light = Math.random();

    function update(t) {
      const lightness = prob > 0.8 ? light + Math.sin(t * rate) * 1 : light;
      return lightness;
    }

    return {
      pos: new THREE.Vector3(x, y, z),
      update,
      minDist: radius,
    };
  }

  const verts = [];
  const colors = [];
  const positions = [];
  let col;
  for (let i = 0; i < numStars; i += 1) {
    let p = randomSpherePoint();
    const { pos, hue } = p;
    positions.push(p);
    col = new THREE.Color().setHSL(hue, 0.9, Math.random()); // Increase brightness
    verts.push(pos.x, pos.y, pos.z);
    colors.push(col.r, col.g, col.b);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(
    "/starTexture.png", // Ensure this path is correct
    () => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
    },
    undefined,
    (err) => {
      console.error('An error occurred loading the texture:', err);
    }
  );

  const mat = new THREE.PointsMaterial({
    size: 0.5, // Adjust size as needed
    vertexColors: true,
    map: texture, // Use circular texture
    blending: THREE.AdditiveBlending, // Use additive blending for brighter effect
    transparent: true,
    opacity: 1,
  });

  const points = new THREE.Points(geo, mat);

  function update(t) {
    let col;
    const colors = [];
    for (let i = 0; i < numStars; i += 1) {
      const p = positions[i];
      const { update } = p;
      let bright = update(t);
      col = new THREE.Color().setHSL(0.6, 0.9, bright); // Increase brightness
      colors.push(col.r, col.g, col.b);
    }
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geo.attributes.color.needsUpdate = true;
  }

  points.userData = { update };
  return points;
}

const StarField = memo(() => {
  const ref = React.useRef();
  const points = getPoints({ numStars: 300 });

  useEffect(() => {
    ref.current = points;
  }, [points]);

  return <primitive object={points} />;
});

export default StarField;
