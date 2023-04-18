import Globe from "react-globe.gl";
import { FooterLogo } from "../../utils/allImgs";
import { useState, useEffect, useMemo } from "react";
import SecWelcomeContent from "./SecWelcomeContent";
import { BrowserView, MobileView } from "react-device-detect";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const DIV = () => <div className="dream-blip blip1"></div>;

const SecWelcomeArea = (props) => {
  const [rise, setRise] = useState(false);
  const { tradeData, pvData, updatePriceHistory } = props;
  const [isCopied, setIsCopied] = useState(false);
  const [chart, setChart] = useState(0);
  const [index, setIndex] = useState(0);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 992px)").matches
  );
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  useEffect(() => {
    window
      .matchMedia("(min-width: 992px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  useEffect(() => {
    setTimeout(() => setRise(true), 6000);
  }, []);

  // Gen random paths
  const N_PATHS = 15;
  const MAX_POINTS_PER_LINE = 1000;
  const MAX_STEP_DEG = 1;
  const MAX_STEP_ALT = 0.015;
  const gData = useMemo(
    () =>
      [...Array(N_PATHS).keys()].map(() => {
        let lat = (Math.random() - 0.5) * 90;
        let lng = (Math.random() - 0.5) * 360;
        let alt = 0;

        return [
          [lat, lng, alt],
          ...[
            ...Array(Math.round(Math.random() * MAX_POINTS_PER_LINE)).keys(),
          ].map(() => {
            lat += (Math.random() * 2 - 1) * MAX_STEP_DEG;
            lng += (Math.random() * 2 - 1) * MAX_STEP_DEG;
            alt += (Math.random() * 2 - 1) * MAX_STEP_ALT;
            alt = Math.max(0, alt);

            return [lat, lng, alt];
          }),
        ];
      }),
    []
  );

  return (
    <section
      className="welcome_area dark-blue clearfix dzsparallaxer auto-init ico fullwidth"
      data-options={{ direction: "normal" }}
      id="home"
    >
      <div className="divimage dzsparallaxer--target Home1WelcomeAreaIMG"></div>
      <div className="hero-content">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            {/* <div className="col-12">
              <div className="d-flex justify-content-center">
                <div className="col-10">
                  <div className="slider-alert">
                    <AutoplaySlider
                      play={true}
                      cancelOnInteraction={false} // should stop playing on user interaction
                      interval={4000}
                    >
                      <div>1</div>
                      <div>2</div>
                    </AutoplaySlider>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="slider-letter col-lg-6 col-md-6 col-sm-8">
              <SecWelcomeContent
                img={FooterLogo}
                setChart={setChart}
                chart={chart}
                {...props}
              />
            </div>
            <div className="slider-globe col-lg-6 col-md-6 col-sm-4">
              <div
                className="globe d-flex justify-content-center align-items-center"
                style={{ opacity: 0.8 }}
              >
                <BrowserView>
                  <Globe
                    backgroundColor="rgb(5,0,10)"
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    pathsData={gData}
                    pathColor={() => ["rgba(0,0,255,0.6)", "rgba(255,0,0,0.6)"]}
                    pathDashLength={0.001}
                    pathDashGap={0.002}
                    pathDashAnimateTime={200000}
                    pathPointAlt={rise ? (pnt) => pnt[2] : undefined}
                    pathTransitionDuration={rise ? 4000 : undefined}
                  />
                </BrowserView>
                <MobileView>
                  <Globe
                    width={280}
                    height={280}
                    backgroundColor="rgb(5,0,10)"
                    globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                    bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                    pathsData={gData}
                    pathColor={() => ["rgba(0,0,255,0.6)", "rgba(255,0,0,0.6)"]}
                    pathDashLength={0.0005}
                    pathDashGap={0.003}
                    pathDashAnimateTime={200000}
                    pathPointAlt={rise ? (pnt) => pnt[2] : undefined}
                    pathTransitionDuration={rise ? 4000 : undefined}
                  />
                </MobileView>
              </div>
              <div className="globe stack d-flex justify-content-center align-items-center"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecWelcomeArea;
