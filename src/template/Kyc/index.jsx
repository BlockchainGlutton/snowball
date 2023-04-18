import React, { useState, useMemo, useEffect, useRef } from "react";
import { useMoralis } from "react-moralis";
import { ProgressBar } from "react-bootstrap";
import countryList from "react-select-country-list";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

import IDCARD from "../../assets/img/idcard2.png";
import { isBrowser, isMobile } from "react-device-detect";

const FILE_TYPE = "image/jpeg, image/png";

function Kyc() {
  const { isAuthenticated, account, Moralis } = useMoralis();
  const navigate = useNavigate();
  const inputFileRef = useRef();

  useEffect(() => {
    if (!isAuthenticated && !account) {
      navigate("/");
    }
  }, []);
  const [currentStep, setCurrentStep] = useState(1);
  const [curStateText, setCurStateText] = useState("Personal Information");
  const [curStateHeading, setCurStateHeading] = useState("Tell us about you");
  // Step One State Variables
  const [curLocation, setCurrentLocation] = useState("");
  const [curAddress, setCurAddress] = useState("");
  const [curName, setCurName] = useState("");
  const [curType, setCurType] = useState("");
  const [curDocs, setCurDocs] = useState(null);
  const [curPreview, setCurPreview] = useState(null);

  // Step Two State Variables
  const [birthDay, setBirthDay] = useState(new Date());
  const options = useMemo(() => countryList().getData(), []);
  const changeHandler = (value) => {
    setCurrentLocation(value);
  };
  const checkInfo = () => {
    if (currentStep === 1) {
      if (curName && curLocation && curAddress && birthDay) {
        setCurrentStep((prev) => prev + 1);
        setCurStateText("Identify Verification");
        setCurStateHeading("Verify Yourself");
      } else {
        notify("error", "Please input your information correctly!");
      }
    } else if (currentStep === 2) {
      if (curType && curDocs) {
        setCurrentStep((prev) => prev + 1);
        setCurStateText(`${curType} Verification`);
        setCurStateHeading("Verify Yourself");
      } else {
        notify("error", "Please upload your Document correctly!");
      }
    }
  };

  // Notification using React-toastify.
  const notify = (_type, _text) =>
    toast(_text, {
      position: "top-right",
      type: _type,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });

  const changeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurDocs(file);
      const imageReader = new FileReader();
      imageReader.readAsDataURL(file);
      imageReader.onloadend = () => {
        setCurPreview(imageReader.result);
      };
    }
  };

  const triggerInput = () => {
    inputFileRef.current.click();
  };

  const uploadDocs = async (_type) => {
    setCurType(_type);
    triggerInput();
  };

  const imageLoaded = (image) => {
    console.log(image, "image-->");
  };

  return (
    <>
      <div className="py-5">
        <div className="container">
          <h4 style={{ color: '#FFFFFF' }}>{curStateHeading}</h4>
          <div className="px-10 py-2">
            {" "}
            <h6 className="success-font">{curStateText}</h6>
            <ProgressBar variant="success" now={10 * currentStep} />
          </div>
          {currentStep === 1 && (
            <div className="step-one">
              <div className="d-flex justify-content-center py-3">
                <div className="legal-name">
                  <h5 className="kyc-input-color">Full Name</h5>
                  <input
                    type="text"
                    className="kyc-input"
                    onChange={(e) => setCurName(e.target.value)}
                    value={curName}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center py-3">
                <div className="country-select">
                  <h5 className="kyc-input-color">Country</h5>
                  <Select
                    options={options}
                    value={curLocation}
                    onChange={changeHandler}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center py-3">
                <div className="legal-name">
                  <h5 className="kyc-input-color">Birthday</h5>
                  <DatePicker
                    selected={birthDay}
                    onChange={(date) => setBirthDay(date)}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center py-3">
                <div className="current-address">
                  <h5 className="kyc-input-color">Current Address</h5>
                  <input
                    type="text"
                    className="kyc-input"
                    onChange={(e) => setCurAddress(e.target.value)}
                    value={curAddress}
                  />
                </div>
              </div>
              <hr />
            </div>
          )}
          {currentStep === 2 && (
            <div className="step-two">
              <div className="d-flex justify-content-center py-5">
                <div className="description">
                  <h4 className="kyc-input-color text-center">
                    Select the type of document
                  </h4>
                </div>
              </div>
              <div className="d-flex justify-content-center py-3">
                <div className="description">
                  <button
                    className="kyc-btn"
                    onClick={() => uploadDocs("passport")}
                  >
                    Passport
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-center py-3">
                <div className="description">
                  <button
                    className="kyc-btn"
                    onClick={() => uploadDocs("idcard")}
                  >
                    Identify Card
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-center py-3">
                <div className="description">
                  <button
                    className="kyc-btn"
                    onClick={() => uploadDocs("license")}
                  >
                    License
                  </button>
                </div>
              </div>
              {isBrowser && (
                <>
                  <div className="d-flex justify-content-center py-1">
                    <div className="col-6">
                      <h5 className="success-font">
                        {curType ? curType.toUpperCase() : "Document Type"}
                      </h5>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center py-2">
                    <div className="col-6">
                      <img
                        className="verification-card-image"
                        src={curPreview !== null ? curPreview : IDCARD}
                      />
                    </div>
                  </div>

                  <hr />
                </>
              )}
              {isMobile && (
                <>
                  <div className="d-flex justify-content-center py-1">
                    <h5 className="success-font">
                      {curType ? curType.toUpperCase() : "Document Type"}
                    </h5>
                  </div>
                  <div className="d-flex justify-content-center py-2">
                    <img
                      className="verification-card-image"
                      src={curPreview !== null ? curPreview : IDCARD}
                    />
                  </div>
                  <hr />
                </>
              )}
              <input
                type="file"
                onChange={changeFile}
                ref={inputFileRef}
                style={{ display: "none" }}
                accept={FILE_TYPE}
              />
            </div>
          )}
          {currentStep === 3 && (
            <div className="step-three">
              <div className="d-flex justify-content-center"></div>
            </div>
          )}
          <div className="row py-5">
            <div className="col-6">
              {currentStep > 1 && (
                <div className="d-flex justify-content-start">
                  <button
                    className="kyc-next-btn"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                  >
                    BACK
                  </button>
                </div>
              )}
            </div>
            <div className="col-6">
              <div className="d-flex justify-content-end">
                <button className="kyc-next-btn" onClick={() => checkInfo()}>
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Kyc;
