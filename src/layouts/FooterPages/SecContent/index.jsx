const SecContent = () => {
  return (
    <div className="col-12 col-md-7">
      {/* Content Info */}
      <div className="contact_info_area d-sm-flex justify-content-between">
        <div
          className="contact_info text-center wow fadeInUp py-2"
          data-wow-delay="0.2s"
        >
          <h5>NAVIGATE</h5>
          <a href="#">
            <p>Home</p>
          </a>
          <a href="#">
            <p>Vault Verification</p>
          </a>
          <a href="https://anonydoxx.io/" target="_blank">
            <p>Website</p>
          </a>
          <a href="#">
            <p>Terms and Conditions</p>
          </a>
          <a href="#">
            <p>Privacy Policy</p>
          </a>
        </div>
        {/* Content Info */}

        {/* Content Info */}
        <div
          className="contact_info text-center wow fadeInUp py-2"
          data-wow-delay="0.4s"
        >
          <h5>Contact</h5>
          <p>security@anonydoxx.io</p>
        </div>
      </div>
    </div>
  );
};

export default SecContent;
