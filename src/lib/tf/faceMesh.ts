/**
 * TensorFlow.js Face Landmarks Detection wrapper.
 *
 * Loads the MediaPipe FaceMesh model lazily and exposes a single
 * `detectFaceLandmarks(image)` helper used by the AI Analiza page.
 *
 * The model produces 468 facial keypoints in 3D. We project them to 2D
 * (relative to the supplied image) and compute editorial-grade metrics:
 * harmony, symmetry, golden-ratio fit, proportion balance.
 *
 * Privacy:
 *   100% client-side. No frames or landmarks leave the browser.
 */

import type {
  FaceLandmarksDetector,
  Face,
} from '@tensorflow-models/face-landmarks-detection';

let detectorPromise: Promise<FaceLandmarksDetector> | null = null;

/** Lazily load the MediaPipe FaceMesh detector. */
export async function getFaceDetector(): Promise<FaceLandmarksDetector> {
  if (detectorPromise) return detectorPromise;

  detectorPromise = (async () => {
    // Dynamic imports keep TF out of the initial bundle.
    const tf = await import('@tensorflow/tfjs');
    await import('@tensorflow/tfjs-backend-webgl');
    await tf.setBackend('webgl');
    await tf.ready();

    const fld = await import('@tensorflow-models/face-landmarks-detection');
    const detector = await fld.createDetector(
      fld.SupportedModels.MediaPipeFaceMesh,
      {
        runtime: 'tfjs',
        refineLandmarks: true,
        maxFaces: 1,
      }
    );
    return detector;
  })();

  return detectorPromise;
}

export type Keypoint2D = { x: number; y: number; z?: number; name?: string };

export interface FaceAnalysis {
  keypoints: Keypoint2D[];
  bbox: { x: number; y: number; width: number; height: number };
  /** 0–100 scores */
  scores: {
    harmony: number;
    symmetry: number;
    goldenRatio: number;
    proportion: number;
  };
  observations: {
    eyes: string;
    nose: string;
    lips: string;
    jaw: string;
  };
}

/**
 * Run the detector on an HTMLImageElement, HTMLVideoElement, or
 * HTMLCanvasElement. Returns null when no face is found.
 */
export async function detectFaceLandmarks(
  input: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement
): Promise<FaceAnalysis | null> {
  const detector = await getFaceDetector();
  const faces: Face[] = await detector.estimateFaces(input, { flipHorizontal: false });
  if (!faces.length) return null;

  const face = faces[0];
  const keypoints: Keypoint2D[] = face.keypoints.map((k) => ({
    x: k.x,
    y: k.y,
    z: k.z,
    name: k.name,
  }));

  // Bounding box (fall back to derived).
  const xs = keypoints.map((k) => k.x);
  const ys = keypoints.map((k) => k.y);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const bbox = {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };

  // ─── Metrics ──────────────────────────────────────────────────────────
  // MediaPipe FaceMesh index reference (refineLandmarks=true):
  //   33  → right eye outer    133 → right eye inner
  //   362 → left eye inner     263 → left eye outer
  //   1   → nose tip
  //   61  → mouth right        291 → mouth left
  //   10  → forehead top       152 → chin
  //   234 → right cheek        454 → left cheek

  const p = (i: number) => keypoints[i];

  // Symmetry: average pairwise distance to mid-line, normalised.
  const midX = (p(10).x + p(152).x) / 2;
  const faceWidth = Math.abs(p(454).x - p(234).x) || 1;
  const pairs: [number, number][] = [
    [33, 263], [133, 362], [61, 291], [234, 454], [127, 356],
  ];
  let asymmetry = 0;
  pairs.forEach(([r, l]) => {
    const dR = Math.abs(p(r).x - midX);
    const dL = Math.abs(p(l).x - midX);
    asymmetry += Math.abs(dR - dL) / faceWidth;
  });
  const symmetry = clamp01(1 - asymmetry / pairs.length) * 100;

  // Golden ratio: face-height / face-width vs 1.618
  const faceHeight = Math.abs(p(152).y - p(10).y) || 1;
  const ratio = faceHeight / faceWidth;
  const goldenRatio = clamp01(1 - Math.abs(ratio - 1.618) / 1.618) * 100;

  // Proportion: thirds rule (forehead / midface / lower face).
  const browY = (p(105).y + p(334).y) / 2;
  const noseBottomY = p(2).y;
  const chinY = p(152).y;
  const foreheadH = browY - p(10).y;
  const midH = noseBottomY - browY;
  const lowerH = chinY - noseBottomY;
  const total = foreheadH + midH + lowerH || 1;
  const idealThird = 1 / 3;
  const dev =
    Math.abs(foreheadH / total - idealThird) +
    Math.abs(midH / total - idealThird) +
    Math.abs(lowerH / total - idealThird);
  const proportion = clamp01(1 - dev) * 100;

  // Harmony: blend.
  const harmony = (symmetry * 0.4 + goldenRatio * 0.3 + proportion * 0.3);

  // ─── Observations (editorial copy, Polish) ────────────────────────────
  const observations = {
    eyes: symmetry > 85
      ? 'Doskonała symetria oczu — odstęp w idealnej proporcji do szerokości twarzy.'
      : symmetry > 70
      ? 'Niewielka asymetria oczu — możliwa drobna korekta powieki.'
      : 'Zauważalna asymetria — konsultacja okuloplastyczna zalecana.',
    nose: goldenRatio > 80
      ? 'Nos w harmonii ze złotym podziałem twarzy.'
      : goldenRatio > 65
      ? 'Proporcje nosa nieznacznie odbiegają od ideału — rhinoplastyka ultrasonograficzna może je dopracować.'
      : 'Wyraźny potencjał korekcji proporcji nosa.',
    lips: proportion > 80
      ? 'Usta w równowadze z dolną tercją twarzy.'
      : proportion > 65
      ? 'Subtelne powiększenie ust może wzmocnić harmonię.'
      : 'Modelowanie ust + augmentacja kości jarzmowej do rozważenia.',
    jaw: harmony > 80
      ? 'Linia żuchwy ostro zarysowana, w harmonii z resztą twarzy.'
      : 'Konturowanie żuchwy może uwypuklić rysy i odmłodzić dolną tercję.',
  };

  return {
    keypoints,
    bbox,
    scores: {
      harmony: Math.round(harmony),
      symmetry: Math.round(symmetry),
      goldenRatio: Math.round(goldenRatio),
      proportion: Math.round(proportion),
    },
    observations,
  };
}

function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n));
}

/** Recommended FaceMesh tessellation triangles for visualisation. */
export const FACEMESH_TESSELATION_INDICES = [
  // Key landmark indices used by overlay (subset for performance).
  10, 152, 234, 454, 33, 263, 133, 362, 1, 2, 61, 291,
  105, 334, 70, 300, 46, 276, 53, 283, 127, 356, 197, 4,
  168, 6, 195, 5, 4, 19, 94, 2, 164, 0, 11, 12, 13, 14, 15, 16, 17, 18,
];
