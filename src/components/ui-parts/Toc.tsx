"use client";

import { useEffect } from "react";
import tocbot from "tocbot";

export const Toc: React.VFC = () => {
  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: "*", // 目次を抽出したい要素のクラス名
      headingSelector: "h2, h3",
      scrollSmoothOffset: -80,
      headingsOffset: 80,
      scrollSmoothDuration: 300,
    });

    return () => tocbot.destroy();
  }, []);

  return (
    <nav className="lg:fixed">
      <div className="font-bold text-xl">目次</div>
      <div className="toc" />
    </nav>
  );
};
