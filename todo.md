- Memória (láncolt listával)
  - GC (kiláncoljuk ahol RC = 0)
  - Emiatt kell ID, nem elég lista n-edik eleme alapján keresni
    - globálisan inkrementált számláló az egyszerűség kedvéért
  - Beágyazott tömböt hogyan?
    - Esetleg egy enum ami megmondja az érték sima-e vagy ID-re mutat?