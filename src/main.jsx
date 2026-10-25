import "./research-article.jsx";
import faviconUrl from "./favicon.jpg";

const favicon = document.querySelector('link[rel="icon"]') || document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/jpeg";
favicon.href = faviconUrl;
if (!favicon.isConnected) document.head.appendChild(favicon);
