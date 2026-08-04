# Drop your own mesh here

**The figures currently on the page do not live here.** They come from
`files/lowpoly-people/` and are listed in `CFG.MESH_URLS` at the top of
`hero.js` — to change which ones are used, edit the numbers there. Open
`contact-sheet.html` to see all 14 side by side before choosing.

This folder is for a mesh of your own. Save it here, then add its path to
`CFG.MESH_URLS`:

```js
MESH_URLS: ['mesh/my-model.obj', POSES + '07_person.obj'],
```

If none of the listed files load, a procedural placeholder head is built in
code so the page still animates.

## What the loader needs

- **Format:** Wavefront `.obj`, ASCII. Only `v` (vertices) and `f` (faces) lines
  are read — normals, UVs, materials, and groups are ignored, so a stripped
  export is fine. Quads and n-gons are triangulated automatically.
- **Size:** anything up to ~200k triangles parses in well under a second. The
  mesh is sampled down to `CFG.N_CORE` points, so extra density buys nothing
  past a point — 20k–80k triangles is a good target.
- **Scale/position:** irrelevant. The cloud is auto-centred on its bounding box
  and scaled so its largest dimension is 1.

## If it loads sideways or facing away

Both are one-line fixes at the top of `hero.js`:

```js
MESH_ROT   : [0, 0, 0],   // [x, y, z] radians, applied once at load
MESH_FLIP_Z: false,       // true if the head faces away from the camera
```

Common cases: Z-up exports (Blender default) need `MESH_ROT: [-Math.PI/2, 0, 0]`;
a head facing −Z needs `MESH_FLIP_Z: true`.

## Notes on choosing a model

- A **closed head + neck bust** works best. Full bodies get scaled down until
  the head is tiny; crop to the bust before exporting.
- Hair modelled as separate thin shells is fine — surface sampling is
  area-weighted, so dense detail regions naturally get more particles.
- Interior geometry (eyeballs, mouth bag, skull cavity) will be sampled too and
  shows up as stray points inside the silhouette. Delete it if it looks noisy.
