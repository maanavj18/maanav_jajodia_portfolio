import type { Metadata } from "next";
import Link from "next/link";
import { MapCanvas } from "@/components/map-canvas";
import { Sheet } from "@/components/sheet";
import { SHEET_LAT_DMS, SHEET_LON_DMS } from "@/lib/sheet-geo";

export const metadata: Metadata = { title: "Sheet not found" };

export default function NotFound() {
  return (
    <Sheet title="Sheet not found" lede={<p className="headline">This sheet is not in the quadrangle.</p>}>
      <div className="missing">
        <MapCanvas seed={404} size="inset">
          <p className="survey-mark pos-mark">
            <span className="coords">{SHEET_LAT_DMS}</span>
            <span className="coords">{SHEET_LON_DMS}</span>
            <span className="label">Sheet point, Columbus sheet</span>
          </p>
        </MapCanvas>
        <p className="return-link">
          <Link href="/">Columbus sheet</Link>
        </p>
      </div>
    </Sheet>
  );
}