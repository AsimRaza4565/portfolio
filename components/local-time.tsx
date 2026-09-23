"use client";

import { useEffect, useState } from "react";

/** Live local time (PKT) — renders after mount to stay hydration-safe. */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Karachi",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-xs text-muted-foreground" suppressHydrationWarning>
      {time ?? "--:--"} pkt · haripur, pk
    </span>
  );
}
